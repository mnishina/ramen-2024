import type Lenis from "lenis";
import {
  Texture,
  TextureLoader,
  LoadingManager,
  Scene,
  PerspectiveCamera,
  PlaneGeometry,
  ShaderMaterial,
  WebGLRenderer,
  Mesh,
  Clock,
} from "three";

interface DB {
  date: string;
  name: string;
  address: string;
  imagePath: string;
  ramenImage: {
    aspectRatio: string;
  };
  enText: {
    name: string;
    address: string;
    nameLength: string;
  };
}

interface App {
  imageStore: Map<string, Texture>;
  noiseImageTextureA: null | Texture;
  noiseImageTextureB: null | Texture;
}

interface Loader {
  loadImage: (
    db: DB[],
    noiseImageA: string,
    noiseImageB: string,
  ) => Promise<unknown>;
  loadingDisplay: HTMLElement | null;
  loadingManager: LoadingManager;
  textureLoader: TextureLoader | null;
  isLoaded: Boolean;
}

interface Base {
  setupComposition: (
    $canvas: HTMLCanvasElement,
    setupScene: "list" | "detail",
  ) => void;
  createMeshFunction: (props: CreateMeshFunction) => (MeshStore | undefined)[];
  listScene: Scene | null;
  detailScene: Scene | null;
  geometry: PlaneGeometry | null;
  material: ShaderMaterial | null;
  renderer: WebGLRenderer | null;
  camera: PerspectiveCamera | null;
  cameraInfo: {
    fov: number | null;
    aspectRatio: number | null;
    near: number;
    far: number;
  };
  geometrySize: number;
  geometrySegmentAmount: number | null;
  pixelRatio: number;
}

interface CreateMesh {
  imageStore: Map<string, Texture>;
  noiseImageTextureA: Texture;
  noiseImageTextureB: Texture;
}

interface CreateMeshFunction {
  imageStore: Map<string, Texture>;
  $canvasRect: DOMRect;
  $images: NodeListOf<Element>;
  noiseImageTextureA: Texture;
  noiseImageTextureB: Texture;
  vertexShader: string;
  fragmentShader: string;
  scene: Scene;
}

interface MeshStore {
  $image: Element;
  $imageRect: DOMRect;
  $imageWidth: number;
  $imageHeight: number;
  $imageX: number;
  $imageY: number;
  geometry: PlaneGeometry;
  material: ShaderMaterial;
  mesh: Mesh;
}

interface SiteDescription {
  P1: string;
  P2: string;
}

interface List {
  init: () => void;
  createMesh: (props: CreateMesh) => Promise<(MeshStore | undefined)[]>;
  render: () => void;
  setupEvents: () => void;
  show: () => void;
  siteDescriptionAnimation: (text: SiteDescription) => void;
  $canvas: null | HTMLCanvasElement;
  $dataImages: null | NodeListOf<Element>;
  $siteTitle: null | HTMLElement;
  $siteSubTitle: null | HTMLElement;
  $listText: null | NodeListOf<Element>;
  $canvasRect: DOMRect;
  clock: Clock;
  meshStore: (MeshStore | undefined)[];
}

interface Detail {
  init: () => void;
  createMesh: (props: CreateMesh) => Promise<(MeshStore | undefined)[]>;
  render: () => void;
  setupEvents: () => void;
  show: () => void;
  $canvas: null | HTMLCanvasElement;
  $dataImages: null | NodeListOf<Element>;
  $canvasRect: DOMRect;
  meshStore: (MeshStore | undefined)[];
  $: {
    bg: Element | null;
    siteTitle: Element | null;
    siteSubTitle: Element | null;
    shopName: Element | null;
    date: Element | null;
    address: Element | null;
    enTextParagraph: NodeListOf<Element> | null;
  };
}

interface Scroller {
  init: () => void;
  lenis: null | Lenis;
}

interface Cursor {
  init: (isRoot: Boolean) => void;
  $element: HTMLElement | null;
  $textPath: HTMLElement | null;
  mouseX: number;
  mouseY: number;
  animationFrameId: number | null;
  isRoot: Boolean | null;
}

interface Events {
  onResize: (
    $canvas: HTMLCanvasElement,
    meshStore: (MeshStore | undefined)[],
    timeoutID: number,
    callBack?: ($canvasNewRect: DOMRect) => void,
  ) => void;
}

interface TypeTextParams {
  index: number;
  paragraph: HTMLElement;
  text: string;
}

export type {
  DB,
  Loader,
  App,
  Base,
  CreateMesh,
  CreateMeshFunction,
  MeshStore,
  SiteDescription,
  List,
  Detail,
  Scroller,
  Cursor,
  Events,
  TypeTextParams,
};
