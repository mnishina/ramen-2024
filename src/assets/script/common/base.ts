import type { Base, CreateMeshFunction } from "~script/type/";

import {
  Mesh,
  Scene,
  PerspectiveCamera,
  PlaneGeometry,
  ShaderMaterial,
  WebGLRenderer,
  RepeatWrapping,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";

import {
  getCanvasInfo,
  getCameraFOV,
  getWorldPosition,
} from "~script/common/util";

const base: Base = {
  setupComposition,
  createMeshFunction,
  listScene: new Scene(),
  detailScene: new Scene(),
  geometry: null,
  material: null,
  renderer: null,
  composer: null,
  camera: null,
  cameraInfo: {
    fov: null,
    aspectRatio: null,
    near: 0.1,
    far: 1000,
  },
  geometrySize: 1,
  geometrySegmentAmount: null,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

function setupComposition(
  $canvas: HTMLCanvasElement,
  setupScene: "list" | "detail",
) {
  const { $canvasRect, $canvasWidth, $canvasHeight, $canvasAspectRatio } =
    getCanvasInfo($canvas);
  const geometrySegmentAmount = setupScene === "detail" ? 128 : 64;

  base.listScene = new Scene();
  base.detailScene = new Scene();

  base.cameraInfo.fov = getCameraFOV($canvasHeight, base.cameraInfo.far);
  base.cameraInfo.aspectRatio = $canvasAspectRatio;

  base.camera = new PerspectiveCamera(
    base.cameraInfo.fov,
    base.cameraInfo.aspectRatio,
    base.cameraInfo.near,
    base.cameraInfo.far,
  );
  base.camera.position.z = base.cameraInfo.far;

  // renderer
  base.renderer = new WebGLRenderer({
    canvas: $canvas,
    alpha: true,
    antialias: true,
  });
  base.renderer.setSize($canvasWidth, $canvasHeight, false);
  base.renderer.setPixelRatio(base.pixelRatio);

  base.geometry = new PlaneGeometry(
    base.geometrySize,
    base.geometrySize,
    geometrySegmentAmount,
    geometrySegmentAmount,
  );
  base.material = new ShaderMaterial({
    transparent: true,
    uniforms: {
      uAlpha: { value: 0.0 },
      uProgress: { value: 0.0 },
      uTexture: { value: null },
      uPI: { value: Math.PI },
      uRandom: { value: Math.random() },
      uNoiseTextureA: { value: null },
      uNoiseTextureB: { value: null },
      uTime: { value: 0 },
    },
  });

  base.composer = new EffectComposer(base.renderer);
  if (setupScene === "list") {
    const listRenderPass = new RenderPass(base.listScene, base.camera);
    base.composer.addPass(listRenderPass);
  } else {
    const detailRenderPass = new RenderPass(base.detailScene, base.camera);
    base.composer.addPass(detailRenderPass);
  }
  const filmPass = new FilmPass(0.2, 0.1, 0, false);
  base.composer.addPass(filmPass);
}

function createMeshFunction({
  imageStore,
  $canvasRect,
  $images,
  noiseImageTextureA,
  noiseImageTextureB,
  vertexShader,
  fragmentShader,
  scene,
}: CreateMeshFunction) {
  return [...$images].map(($image) => {
    if (!base.geometry || !base.material) return;

    noiseImageTextureA.wrapS = RepeatWrapping;
    noiseImageTextureA.wrapT = RepeatWrapping;
    noiseImageTextureB.wrapS = RepeatWrapping;
    noiseImageTextureB.wrapT = RepeatWrapping;

    const imagePath = $image.getAttribute("src");
    const texture = imageStore.get(imagePath!);

    const $imageRect = $image.getBoundingClientRect();
    const {
      width: $imageWidth,
      height: $imageHeight,
      x: $imageX,
      y: $imageY,
    } = $imageRect;

    const geometry = base.geometry;
    const material = base.material.clone();
    material.vertexShader = vertexShader;
    material.fragmentShader = fragmentShader;
    material.uniforms.uTexture.value = texture;
    material.uniforms.uNoiseTextureA.value = noiseImageTextureA;
    material.uniforms.uNoiseTextureB.value = noiseImageTextureB;

    const mesh = new Mesh(geometry, material);
    mesh.scale.set($imageWidth, $imageHeight, 0);

    const { x, y } = getWorldPosition($canvasRect, $imageRect);
    mesh.position.x = x;
    mesh.position.y = y;

    scene.add(mesh);

    return {
      $image,
      $imageRect,
      $imageWidth,
      $imageHeight,
      $imageX,
      $imageY,
      geometry,
      material,
      mesh,
    };
  });
}

export default base;
