import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

const MODEL_URL = 'models/scene-opt.glb';

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
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.camera.position.set(0, 0, 20);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  }

  async load(): Promise<void> {
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    const gltf = await loader.loadAsync(MODEL_URL);
    if (this.disposed) return;
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
