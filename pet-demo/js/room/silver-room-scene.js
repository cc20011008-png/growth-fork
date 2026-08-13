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
    color,
    map: map || null,
    metalness: 0.96,
    roughness: 0.16,
    envMapIntensity: 1.55,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    reflectivity: 1,
  });
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = timeUniform;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nuniform float uTime;")
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
        float ripple = sin(transformed.x * 1.7 + uTime * 0.32) * 0.055
          + sin(transformed.y * 2.2 - uTime * 0.21) * 0.048
          + sin(transformed.z * 1.5 + uTime * 0.17) * 0.04;
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
    this.petMesh = null;
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
    this.renderer.toneMappingExposure = 1.02;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.append(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xc5c9d0);
    this.scene.fog = new THREE.Fog(0xc5c9d0, 12, 22);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    this.camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 60);
    this.camera.position.set(5.4, 2.55, 7.1);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.target.set(0.45, 0.92, 0.15);
    this.controls.minDistance = 3.4;
    this.controls.maxDistance = 11;
    this.controls.minPolarAngle = 0.38;
    this.controls.maxPolarAngle = Math.PI / 2.08;
    this.controls.maxAzimuthAngle = Math.PI / 1.55;
    this.controls.minAzimuthAngle = -0.2;
    this.controls.autoRotate = !this.reducedMotion;
    this.controls.autoRotateSpeed = 0.35;
    this.controls.addEventListener("start", () => {
      this.controls.autoRotate = false;
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
    const hemi = new THREE.HemisphereLight(0xf4f5f7, 0x8a909a, 0.7);
    this.scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffffff, 1.15);
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

    const pinkFill = new THREE.PointLight(0xff4f9a, 2.4, 14, 1.6);
    pinkFill.position.set(-1.2, 2.8, -2.4);
    this.scene.add(pinkFill);

    const rim = new THREE.DirectionalLight(0xffc1dc, 0.55);
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

    this.liquid = liquidMaterial(0xd5d8de, this.timeUniform, silver);
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
    this.#shelf(room);
    this.#rug(room, rug);
    this.#sofa(room);
    this.#ottoman(room);
    this.#bed(room);
    this.#pedestal(room);
    this.#lamp(room);
    await this.#pet(room);
  }

  #window(room, map) {
    const frame = new THREE.Mesh(
      new THREE.TorusGeometry(1.28, 0.07, 16, 80),
      new THREE.MeshPhysicalMaterial({
        color: 0xff4f9a,
        emissive: 0xff4f9a,
        emissiveIntensity: 0.55,
        roughness: 0.28,
        metalness: 0.2,
      }),
    );
    frame.position.set(0.55, 2.55, -4.08);
    frame.scale.set(1.55, 1, 1);
    room.add(frame);

    const glass = new THREE.Mesh(
      new THREE.CircleGeometry(1.22, 64),
      new THREE.MeshBasicMaterial({
        map: map || null,
        color: map ? 0xffe8f2 : 0xe8eaee,
      }),
    );
    glass.position.set(0.55, 2.55, -4.12);
    glass.scale.set(1.55, 1, 1);
    room.add(glass);

    const glow = new THREE.PointLight(0xff4f9a, 1.8, 8, 2);
    glow.position.set(0.55, 2.55, -3.4);
    room.add(glow);
  }

  #blobs(room) {
    const spots = [
      [-3.7, 0.55, -3.5, 1.15, 0.55, 1.05],
      [3.6, 0.4, -3.6, 1.3, 0.42, 1.1],
      [-3.9, 3.6, -1.2, 0.9, 0.55, 0.8],
      [3.2, 4.3, -3.2, 1.1, 0.45, 0.9],
    ];
    spots.forEach(([x, y, z, sx, sy, sz]) => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), this.liquid);
      mesh.position.set(x, y, z);
      mesh.scale.set(sx, sy, sz);
      room.add(mesh);
    });
  }

  #shelf(room) {
    const niche = new THREE.Mesh(
      new RoundedBoxGeometry(2.4, 1.35, 0.42, 4, 0.08),
      this.chrome,
    );
    niche.position.set(-2.35, 2.85, -3.92);
    room.add(niche);

    const colors = [0xff4f9a, 0xff7ab3, 0xf4f5f7, 0xff4f9a, 0xe83384, 0xffc1dc];
    colors.forEach((hex, i) => {
      const book = new THREE.Mesh(
        new RoundedBoxGeometry(0.12, 0.62, 0.28, 2, 0.02),
        new THREE.MeshPhysicalMaterial({ color: hex, roughness: 0.55, metalness: 0.08 }),
      );
      book.position.set(-3.15 + i * 0.22, 2.62, -3.78);
      book.castShadow = true;
      room.add(book);
    });

    const jar = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 24, 16),
      this.chrome,
    );
    jar.position.set(-1.55, 3.28, -3.78);
    room.add(jar);
  }

  #rug(room, map) {
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xff6aa8,
      map: map || null,
      roughness: 0.9,
      metalness: 0,
    });
    const rug = new THREE.Mesh(new RoundedBoxGeometry(4.4, 0.05, 3.1, 3, 0.12), mat);
    rug.position.set(0.35, 0.03, 0.55);
    rug.receiveShadow = true;
    room.add(rug);
  }

  #sofa(room) {
    const group = new THREE.Group();
    group.position.set(-1.85, 0, 0.15);
    group.rotation.y = 0.42;

    const seat = new THREE.Mesh(new RoundedBoxGeometry(2.35, 0.42, 1.15, 6, 0.16), this.pink);
    seat.position.y = 0.42;
    seat.castShadow = true;
    seat.receiveShadow = true;
    group.add(seat);

    const back = new THREE.Mesh(new RoundedBoxGeometry(2.35, 0.92, 0.34, 6, 0.14), this.pink);
    back.position.set(0, 0.92, -0.42);
    back.castShadow = true;
    group.add(back);

    [-1.08, 1.08].forEach((x) => {
      const arm = new THREE.Mesh(new RoundedBoxGeometry(0.3, 0.58, 1.12, 5, 0.12), this.pink);
      arm.position.set(x, 0.62, 0);
      arm.castShadow = true;
      group.add(arm);
    });

    const heart = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 16), this.chrome);
    heart.position.set(0.15, 0.78, 0.18);
    heart.scale.set(1.15, 0.72, 1);
    group.add(heart);

    const shadow = contactShadow(2.4, 1.2);
    shadow.position.set(-1.85, 0.012, 0.2);
    room.add(shadow);
    room.add(group);
  }

  #ottoman(room) {
    const ott = new THREE.Mesh(new RoundedBoxGeometry(1.05, 0.42, 1.05, 8, 0.2), this.pink);
    ott.position.set(2.35, 0.22, 1.15);
    ott.castShadow = true;
    ott.receiveShadow = true;
    room.add(ott);
    const tuft = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), this.chrome);
    tuft.position.set(2.35, 0.46, 1.15);
    room.add(tuft);
    const shadow = contactShadow(1.1, 1.1);
    shadow.position.set(2.35, 0.012, 1.15);
    room.add(shadow);
  }

  #bed(room) {
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.09, 12, 48), this.chrome);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(2.55, 0.18, -0.55);
    room.add(rim);
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.12, 48), this.pink);
    pad.position.set(2.55, 0.12, -0.55);
    pad.castShadow = true;
    pad.receiveShadow = true;
    room.add(pad);
    const shadow = contactShadow(1.3, 1.3);
    shadow.position.set(2.55, 0.012, -0.55);
    room.add(shadow);
  }

  #pedestal(room) {
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 0.16, 48), this.chrome);
    base.position.set(0.48, 0.09, 0.55);
    base.castShadow = true;
    room.add(base);

    const cushion = new THREE.Mesh(new THREE.SphereGeometry(0.62, 48, 32), this.pink);
    cushion.position.set(0.48, 0.42, 0.55);
    cushion.scale.set(1.05, 0.42, 1.05);
    cushion.castShadow = true;
    cushion.receiveShadow = true;
    room.add(cushion);

    const shadow = contactShadow(1.4, 1.4);
    shadow.position.set(0.48, 0.012, 0.55);
    room.add(shadow);
  }

  #lamp(room) {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.7, 16), this.chrome);
    stem.position.set(-3.15, 0.95, -1.55);
    stem.castShadow = true;
    room.add(stem);
    const shade = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 32, 20, 0, Math.PI * 2, 0, Math.PI / 1.7),
      new THREE.MeshPhysicalMaterial({
        color: 0xff7ab3,
        roughness: 0.4,
        metalness: 0.08,
        emissive: 0xff4f9a,
        emissiveIntensity: 0.18,
      }),
    );
    shade.position.set(-3.15, 1.78, -1.55);
    room.add(shade);
    const bulb = new THREE.PointLight(0xffd0e4, 1.3, 5, 2);
    bulb.position.set(-3.15, 1.55, -1.55);
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
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.72, 1.72), mat);
    mesh.position.set(0.48, 1.18, 0.62);
    mesh.castShadow = false;
    this.petMesh = mesh;
    room.add(mesh);
  }

  #tick = () => {
    this.raf = requestAnimationFrame(this.#tick);
    const t = this.clock.getElapsedTime();
    if (!this.reducedMotion) this.timeUniform.value = t;
    if (this.petMesh && !this.reducedMotion) {
      this.petMesh.position.y = 1.18 + Math.sin(t * 1.5) * 0.028;
      this.petMesh.rotation.y = Math.sin(t * 0.6) * 0.06;
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}
