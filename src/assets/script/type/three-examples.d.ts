declare module "three/examples/jsm/postprocessing/EffectComposer" {
  import { WebGLRenderer, RenderTarget } from "three";

  export class EffectComposer {
    constructor(renderer: WebGLRenderer, renderTarget?: RenderTarget);
    addPass(pass: any): void;
    render(delta?: number): void;
    reset(renderTarget?: RenderTarget): void;
    setSize(width: number, height: number): void;
  }
}

declare module "three/examples/jsm/postprocessing/RenderPass" {
  import { Scene, Camera, WebGLRenderer, WebGLRenderTarget } from "three";
  export class RenderPass {
    constructor(
      scene: Scene,
      camera: Camera,
      overrideMaterial?: any,
      clearColor?: any,
      clearAlpha?: number,
    );
    render(
      renderer: WebGLRenderer,
      writeBuffer: WebGLRenderTarget,
      readBuffer: WebGLRenderTarget,
      deltaTime?: number,
      maskActive?: boolean,
    ): void;
  }
}

declare module "three/examples/jsm/postprocessing/FilmPass" {
  import { WebGLRenderer, WebGLRenderTarget } from "three";

  export class FilmPass {
    constructor(
      noiseIntensity: number,
      scanlinesIntensity: number,
      scanlinesCount: number,
      grayscale: boolean,
    );
    render(
      renderer: WebGLRenderer,
      writeBuffer: WebGLRenderTarget,
      readBuffer: WebGLRenderTarget,
      deltaTime: number,
      maskActive: boolean,
    ): void;
  }
}
