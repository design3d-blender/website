import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

const MODEL_URL = 'models/scene-opt.glb';
const HDRI_URL = 'hdri/studio_small_08_1k.hdr';

export class ModelViewer {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly controls: OrbitControls;
  private mixer: THREE.AnimationMixer | null = null;
  private clipDuration = 0;
  private action: THREE.AnimationAction | null = null;
  private disposed = false;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.camera.position.set(0, 0, 20);

    // low-intensity rig on top of the HDRI IBL below — just enough to add a
    // directional key/rim without double-lighting what the HDRI already sells.
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(5, 8, 10);
    this.scene.add(key);

    const rim = new THREE.DirectionalLight(0xffffff, 0.9);
    rim.position.set(-3, 6, -10);
    this.scene.add(rim);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  }

  async load(): Promise<void> {
    const gltfLoader = new GLTFLoader();
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);
    const rgbeLoader = new RGBELoader();
    const pmrem = new THREE.PMREMGenerator(this.renderer);

    const [gltf, hdrTexture] = await Promise.all([
      gltfLoader.loadAsync(MODEL_URL),
      rgbeLoader.loadAsync(HDRI_URL),
    ]);
    if (this.disposed) return;

    this.scene.environment = pmrem.fromEquirectangular(hdrTexture).texture;
    hdrTexture.dispose();
    pmrem.dispose();

    this.scene.add(gltf.scene);

    if (gltf.animations.length > 0) {
      this.mixer = new THREE.AnimationMixer(gltf.scene);
      const clip = gltf.animations.find((c) => c.name === 'Animation') ?? gltf.animations[0];
      this.clipDuration = clip.duration;
      this.action = this.mixer.clipAction(clip);
      this.action.play();
      this.action.paused = true;
    }

    this.resize();
    this.renderer.setAnimationLoop(() => {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    });
  }

  /** value in [0, 100], mirrors the old scrub-slider range */
  scrubTo(value: number): void {
    if (!this.mixer || !this.action || this.clipDuration === 0) return;
    this.action.time = (value / 100) * this.clipDuration;
    this.mixer.update(0);
  }

  resize(): void {
    const { clientWidth, clientHeight } = this.canvas;
    if (clientWidth === 0 || clientHeight === 0) return;
    this.camera.aspect = clientWidth / clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(clientWidth, clientHeight, false);
  }

  dispose(): void {
    this.disposed = true;
    this.renderer.setAnimationLoop(null);
    this.renderer.dispose();
  }
}
