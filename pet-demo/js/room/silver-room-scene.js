import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const BAKE = "../assets/pet-room-bake";

function loadMap(loader, url, { repeat = 1 } = {}) {
  return new Promise((resolve) => {
    loader.load(
      url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.anisotropy = 8;
        tex.repeat.set(repeat, repeat);
        resolve(tex);
      },
      undefined,
      () => resolve(null),
    );
  });
}

function liquidMaterial(color, timeUniform, map) {
    const mat = new THREE.MeshPhysicalMaterial({
    color: 0xeef0f4,
    metalness: 0.92,
    roughness: 0.18,
    envMapIntensity: 1.85,
    clearcoat: 1,
    clearcoatRoughness: 0.14,
    reflectivity: 1,
    iridescence: 0.12,
    iridescenceIOR: 1.3,
  });
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = timeUniform;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nuniform float uTime;")
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
        float ripple = sin(transformed.x * 1.4 + uTime * 0.28) * 0.035
          + sin(transformed.y * 1.8 - uTime * 0.18) * 0.03
          + sin(transformed.z * 1.2 + uTime * 0.14) * 0.025;
        transformed += normalize(normal) * ripple;`,
      );
  };
  mat.customProgramCacheKey = () => "liquid-silver-v1";
  return mat;
}

function contactShadow(w, d) {
  const geo = new THREE.CircleGeometry(Math.max(w, d) * 0.55, 48);
  const mat = new THREE.MeshBasicMaterial({
    color: 0x141416,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.012;
  return mesh;
}

export class SilverPetRoomScene {
  #onResize;

  constructor(container, { petImage, reducedMotion = false } = {}) {
    this.container = container;
    this.petImage = petImage;
    this.reducedMotion = reducedMotion;
    this.timeUniform = { value: 0 };
    this.clock = new THREE.Clock();
    this.raf = 0;
    this.userMoved = false;
    this.#onResize = () => this.resize();
  }

  async start() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(width, height);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.append(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xe6e8ed);
    this.scene.fog = new THREE.Fog(0xe6e8ed, 16, 28);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    this.camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 60);
    this.camera.position.set(-0.35, 2.48, 7.55);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.target.set(-0.05, 1.05, 0.25);
    this.controls.minDistance = 3.4;
    this.controls.maxDistance = 11;
    this.controls.minPolarAngle = 0.38;
    this.controls.maxPolarAngle = Math.PI / 2.08;
    this.controls.maxAzimuthAngle = 0.85;
    this.controls.minAzimuthAngle = -1.15;
    this.controls.autoRotate = !this.reducedMotion;
    this.controls.autoRotateSpeed = 0.35;
    this.controls.addEventListener("start", () => {
      this.controls.autoRotate = false;
      this.userMoved = true;
    });

    this.#lights();
    await this.#buildRoom();
    window.addEventListener("resize", this.#onResize);
    this.resize();
    this.#tick();
  }

  setPetImage(url) {
    this.petImage = url;
    if (!this.petMesh || !this.renderer) return;
    const loader = new THREE.TextureLoader();
    loader.load(url, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      const prev = this.petMesh.material.map;
      this.petMesh.material.map = tex;
      this.petMesh.material.needsUpdate = true;
      prev?.dispose();
    });
  }

  resize() {
    if (!this.renderer) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    if (!this.userMoved) {
      if (width < 860) {
        this.camera.position.set(0.6, 2.7, 6.5);
        this.controls.target.set(0.9, 1.5, 0.25);
      } else {
        this.camera.position.set(-0.35, 2.48, 7.55);
        this.controls.target.set(-0.05, 1.05, 0.25);
      }
    }
  }

  stop() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.#onResize);
    this.controls?.dispose();
    this.renderer?.dispose();
    this.renderer?.domElement.remove();
  }

  dispose() {
    this.stop();
    this.scene?.traverse((obj) => {
      obj.geometry?.dispose?.();
      const mat = obj.material;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose?.());
      else mat?.dispose?.();
    });
  }

  #lights() {
    const hemi = new THREE.HemisphereLight(0xffffff, 0xb8bcc4, 1.05);
    this.scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(4.2, 7.2, 5.5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 22;
    key.shadow.camera.left = -8;
    key.shadow.camera.right = 8;
    key.shadow.camera.top = 8;
    key.shadow.camera.bottom = -8;
    key.shadow.bias = -0.0004;
    this.scene.add(key);

    const camFill = new THREE.DirectionalLight(0xf7f8fa, 0.55);
    camFill.position.set(2.2, 3.4, 6.4);
    this.scene.add(camFill);

    const pinkFill = new THREE.PointLight(0xff4f9a, 1.6, 14, 1.6);
    pinkFill.position.set(-1.2, 2.8, -2.4);
    this.scene.add(pinkFill);

    const rim = new THREE.DirectionalLight(0xffd0e4, 0.45);
    rim.position.set(-6, 3.2, -2);
    this.scene.add(rim);
  }

  async #buildRoom() {
    const loader = new THREE.TextureLoader();
    const [velvet, silver, rug, windowMap] = await Promise.all([
      loadMap(loader, `${BAKE}/pink-velvet.png`, { repeat: 2.4 }),
      loadMap(loader, `${BAKE}/silver-flow.png`, { repeat: 1.6 }),
      loadMap(loader, `${BAKE}/pink-rug.png`, { repeat: 1.2 }),
      loadMap(loader, `${BAKE}/window-dusk.png`, { repeat: 1 }),
    ]);
    if (windowMap) {
      windowMap.wrapS = windowMap.wrapT = THREE.ClampToEdgeWrapping;
      windowMap.repeat.set(1, 1);
    }

    this.liquid = liquidMaterial(0xeef0f4, this.timeUniform);
    if (silver) {
      this.liquid.roughnessMap = silver;
      this.liquid.roughness = 0.22;
    }
    this.pink = new THREE.MeshPhysicalMaterial({
      color: 0xff6aa8,
      map: velvet,
      roughness: 0.72,
      metalness: 0.04,
      sheen: 1,
      sheenColor: new THREE.Color(0xff4f9a),
      sheenRoughness: 0.45,
    });
    this.chrome = new THREE.MeshPhysicalMaterial({
      color: 0xc9cdd4,
      metalness: 1,
      roughness: 0.12,
      envMapIntensity: 1.6,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });

    const room = new THREE.Group();
    this.scene.add(room);

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(16, 16, 80, 80), this.liquid);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    room.add(floor);

    const back = new THREE.Mesh(new THREE.PlaneGeometry(12, 5.4, 72, 48), this.liquid);
    back.position.set(0.6, 2.7, -4.15);
    back.receiveShadow = true;
    room.add(back);

    const left = new THREE.Mesh(new THREE.PlaneGeometry(10, 5.4, 64, 48), this.liquid);
    left.rotation.y = Math.PI / 2;
    left.position.set(-4.35, 2.7, 0.4);
    left.receiveShadow = true;
    room.add(left);

    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(14, 12, 40, 40), this.liquid);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0.4, 5.15, -0.2);
    room.add(ceiling);

    const cove = new THREE.Mesh(
      new THREE.BoxGeometry(11.2, 0.06, 0.08),
      new THREE.MeshBasicMaterial({ color: 0xff4f9a }),
    );
    cove.position.set(0.4, 4.72, -4.02);
    room.add(cove);
    const coveLight = new THREE.PointLight(0xff4f9a, 3.2, 11, 1.4);
    coveLight.position.set(0.4, 4.35, -3.2);
    room.add(coveLight);

    this.#window(room, windowMap);
    this.#blobs(room);
    this.#rug(room, rug);
    this.#sofa(room);
    this.#pedestal(room);
    this.#lamp(room);
    await this.#pet(room);
  }

  #window(room, map) {
    const neon = new THREE.MeshPhysicalMaterial({
      color: 0xff4f9a,
      emissive: 0xff4f9a,
      emissiveIntensity: 0.7,
      roughness: 0.22,
      metalness: 0.15,
    });
    const frame = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.055, 18, 96), neon);
    frame.position.set(1.7, 2.72, -4.06);
    frame.scale.set(1.78, 1, 1);
    room.add(frame);
    const inner = new THREE.Mesh(new THREE.TorusGeometry(1.48, 0.016, 12, 96), neon);
    inner.position.set(1.7, 2.72, -4.05);
    inner.scale.set(1.78, 1, 1);
    room.add(inner);

    const glass = new THREE.Mesh(
      new THREE.CircleGeometry(1.48, 72),
      new THREE.MeshBasicMaterial({
        map: map || null,
        color: map ? 0xffe8f2 : 0xe8eaee,
      }),
    );
    glass.position.set(1.7, 2.72, -4.11);
    glass.scale.set(1.78, 1, 1);
    room.add(glass);

    const glow = new THREE.PointLight(0xff4f9a, 2.2, 9, 2);
    glow.position.set(1.7, 2.72, -3.2);
    room.add(glow);
  }

  #blobs(room) {
    const spots = [
      [-3.8, 0.42, -3.6, 1.05, 0.48, 0.95],
      [3.4, 4.15, -3.3, 0.95, 0.4, 0.8],
    ];
    spots.forEach(([x, y, z, sx, sy, sz]) => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), this.liquid);
      mesh.position.set(x, y, z);
      mesh.scale.set(sx, sy, sz);
      room.add(mesh);
    });
  }

  #rug(room, map) {
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xff6aa8,
      map: map || null,
      roughness: 0.92,
      metalness: 0,
    });
    const rug = new THREE.Mesh(new THREE.CylinderGeometry(2.05, 2.05, 0.07, 64), mat);
    rug.position.set(1.7, 0.035, 0.55);
    rug.receiveShadow = true;
    room.add(rug);
  }

  #sofa(room) {
    const group = new THREE.Group();
    group.position.set(-2.05, 0, 0.05);
    group.rotation.y = 0.38;
    const glitter = new THREE.MeshPhysicalMaterial({
      color: 0xff7ab3,
      metalness: 0.45,
      roughness: 0.28,
      sheen: 1,
      sheenColor: new THREE.Color(0xff4f9a),
    });

    for (let i = -2; i <= 2; i += 1) {
      const seat = new THREE.Mesh(new RoundedBoxGeometry(0.58, 0.4, 1.12, 6, 0.16), this.pink);
      seat.position.set(i * 0.48, 0.46, Math.abs(i) * 0.06);
      seat.rotation.y = i * 0.12;
      seat.castShadow = true;
      group.add(seat);
      const back = new THREE.Mesh(new RoundedBoxGeometry(0.58, 0.86, 0.28, 6, 0.12), this.pink);
      back.position.set(i * 0.48, 0.92, -0.4 + Math.abs(i) * 0.05);
      back.rotation.y = i * 0.12;
      back.castShadow = true;
      group.add(back);
    }
    [-1.08, 1.08].forEach((x) => {
      const arm = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 16), this.pink);
      arm.position.set(x, 0.58, 0.05);
      arm.scale.set(0.85, 0.7, 1.35);
      arm.castShadow = true;
      group.add(arm);
    });
    [
      [-0.9, -0.38],
      [0.9, -0.38],
      [-0.9, 0.38],
      [0.9, 0.38],
    ].forEach(([x, z]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.28, 12), this.chrome);
      leg.position.set(x, 0.14, z);
      group.add(leg);
    });

    const lobeA = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 16), glitter);
    lobeA.position.set(0.02, 0.78, 0.22);
    const lobeB = lobeA.clone();
    lobeB.position.x = 0.2;
    group.add(lobeA, lobeB);

    const shadow = contactShadow(2.6, 1.3);
    shadow.position.set(-2.05, 0.012, 0.1);
    room.add(shadow);
    room.add(group);
  }

  #pedestal(room) {
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.76, 0.38, 48), this.chrome);
    drum.position.set(1.8, 0.2, 0.55);
    drum.castShadow = true;
    room.add(drum);

    const cushion = new THREE.Mesh(new THREE.SphereGeometry(0.7, 48, 32), this.pink);
    cushion.position.set(1.8, 0.52, 0.55);
    cushion.scale.set(1.08, 0.38, 1.08);
    cushion.castShadow = true;
    cushion.receiveShadow = true;
    room.add(cushion);

    [
      [0, 0],
      [0.22, 0.12],
      [-0.22, 0.12],
      [0.14, -0.2],
      [-0.14, -0.2],
    ].forEach(([x, z]) => {
      const tuft = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 10), this.chrome);
      tuft.position.set(1.8 + x, 0.72, 0.55 + z);
      room.add(tuft);
    });

    const shadow = contactShadow(1.6, 1.6);
    shadow.position.set(1.8, 0.012, 0.55);
    room.add(shadow);
  }

  #lamp(room) {
    const base = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 16), this.pink);
    base.position.set(-3.15, 0.2, -1.35);
    base.scale.set(1, 0.55, 1);
    base.castShadow = true;
    room.add(base);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 1.35, 16), this.pink);
    stem.position.set(-3.15, 0.95, -1.35);
    room.add(stem);
    const shade = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 32, 20, 0, Math.PI * 2, 0, Math.PI / 1.7),
      this.chrome,
    );
    shade.position.set(-3.15, 1.68, -1.35);
    room.add(shade);
    const bulb = new THREE.PointLight(0xffd0e4, 1.3, 5, 2);
    bulb.position.set(-3.15, 1.48, -1.35);
    room.add(bulb);
  }

  async #pet(room) {
    const loader = new THREE.TextureLoader();
    const tex = await new Promise((resolve) => {
      loader.load(
        this.petImage,
        (t) => {
          t.colorSpace = THREE.SRGBColorSpace;
          resolve(t);
        },
        undefined,
        () => resolve(null),
      );
    });
    if (!tex) return;
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      alphaTest: 0.12,
      side: THREE.DoubleSide,
      depthWrite: true,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 2.7), mat);
    mesh.position.set(1.8, 1.52, 0.62);
    mesh.castShadow = false;
    this.petMesh = mesh;
    room.add(mesh);
  }

  #tick = () => {
    this.raf = requestAnimationFrame(this.#tick);
    const t = this.clock.getElapsedTime();
    if (!this.reducedMotion) this.timeUniform.value = t;
    if (this.petMesh && !this.reducedMotion) {
      this.petMesh.position.x = 1.8;
      this.petMesh.position.y = 1.52 + Math.sin(t * 1.5) * 0.028;
      this.petMesh.rotation.y = Math.sin(t * 0.6) * 0.06;
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}
