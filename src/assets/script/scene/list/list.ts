import type {
  CreateMesh,
  MeshStore,
  SiteDescription,
  List,
} from "~script/type/";

import { Clock, Scene } from "three";
import gsap from "gsap";
import { meta } from "~/db/db";

import base from "~script/common/base";
import { getWorldPosition, typeText } from "~script/common/util";
import events from "~script/common/events";

import vertexShader from "~script/scene/list/shader/vertexShader.glsl";
import fragmentShader from "~script/scene/list/shader/fragmentShader.glsl";

const list: List = {
  init,
  createMesh,
  render,
  setupEvents,
  show,
  siteDescriptionAnimation,
  $canvas: null,
  $dataImages: null,
  $siteTitle: null,
  $siteSubTitle: null,
  $listText: null,
  $canvasRect: new DOMRect(),
  clock: new Clock(),
  meshStore: [],
};

function init() {
  // console.log("init @list");

  list.$canvas = document.querySelector("#listCanvas");
  list.$dataImages = document.querySelectorAll("[data-image='list']");
  list.$siteTitle = document.querySelector("[data-element='siteTitle']");
  list.$siteSubTitle = document.querySelector("[data-element='siteSubTitle']");
  list.$listText = document.querySelectorAll("[data-element='listText']");

  if (!list.$canvas || !list.$dataImages) return;

  list.$canvasRect = list.$canvas.getBoundingClientRect();
}

async function createMesh({
  imageStore,
  noiseImageTextureA,
  noiseImageTextureB,
}: CreateMesh): Promise<(MeshStore | undefined)[]> {
  if (!list.$dataImages) return [];
  // console.log("create mesh @list");

  list.meshStore = base.createMeshFunction({
    imageStore,
    $canvasRect: list.$canvasRect,
    $images: list.$dataImages,
    noiseImageTextureA,
    noiseImageTextureB,
    vertexShader,
    fragmentShader,
    scene: base.listScene!,
  });

  return Promise.resolve(list.meshStore);
}

function render() {
  if (!base.renderer || !base.camera) return;

  const elapsedTime = list.clock.getElapsedTime();

  list.meshStore.forEach((object) => {
    if (!object) return;

    _scrollMesh(object);

    object.material.uniforms.uTime.value = elapsedTime;
  });

  base.composer?.render();

  requestAnimationFrame(render);
}

function setupEvents() {
  let timeoutID: number = 0;

  window.addEventListener("resize", () => {
    events.onResize(
      list.$canvas!,
      list.meshStore,
      timeoutID,
      ($canvasNewRect) => {
        list.$canvasRect = $canvasNewRect;
      },
    );
  });
}

function _scrollMesh(object: MeshStore | undefined) {
  if (!object) return;

  const $imageNewRect = object.$image.getBoundingClientRect();
  const { x, y } = getWorldPosition(list.$canvasRect, $imageNewRect);

  object.mesh.position.x = x;
  object.mesh.position.y = y;
}

async function show() {
  return new Promise((resolve) => {
    _showHeaderElements();
    _showListText();
    _showListMesh(resolve);
  });
}

function _showHeaderElements() {
  const timeline = gsap.timeline();
  const siteTitleTL = gsap.timeline();
  const siteSubTitleTL = gsap.timeline();

  siteTitleTL
    .set(list.$siteTitle, {
      x: -40,
    })
    .to(list.$siteTitle, {
      delay: 0.5,
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: "power2.inOut",
    });
  siteSubTitleTL
    .set(list.$siteSubTitle, {
      y: -40,
    })
    .to(list.$siteSubTitle, {
      delay: 0.5,
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.inOut",
    });

  timeline
    .add(siteTitleTL)
    .add(siteSubTitleTL, "<")
    .call(() => {
      list.siteDescriptionAnimation(meta.SITE_DESCRIPTION);
    });
}

function _showListText() {
  list.$listText?.forEach((listText) => {
    const listTextTL = gsap.timeline();
    listTextTL
      .set(listText, {
        x: -25,
      })
      .to(listText, {
        delay: 0.5,
        duration: 1.8,
        x: 0,
        opacity: 1,
        ease: "power2.inOut",
      });
  });
}

function _showListMesh(resolve: unknown) {
  list.meshStore.forEach((object) => {
    if (!object) return;

    gsap.to(object.material.uniforms.uAlpha, {
      value: 1,
      delay: 0.5,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        resolve;
      },
    });

    gsap.to(object.material.uniforms.uProgress, {
      value: 1,
      duration: 0.6,
      ease: "expo.out",
    });
  });
}

async function siteDescriptionAnimation(text: SiteDescription) {
  const paragraph = document.querySelectorAll("#siteDescription p");

  await typeText({
    index: 0,
    paragraph: paragraph[0] as HTMLElement,
    text: text.P1,
  });
  await typeText({
    index: 0,
    paragraph: paragraph[1] as HTMLElement,
    text: text.P2,
  });
}

export default list;
