import type { CreateMesh, MeshStore, Detail } from "~script/type";

import { Mesh, Scene, ShaderMaterial } from "three";
import gsap from "gsap";

import { app } from "~script/app";
import base from "~script/common/base";
import list from "~script/scene/list/list";
import events from "~script/common/events";
import { typeText } from "~script/common/util";

import vertexShader from "~script/scene/detail/shader/vertexShader.glsl";
import fragmentShader from "~script/scene/detail/shader/fragmentShader.glsl";

const detail: Detail = {
  init,
  createMesh,
  render,
  setupEvents,
  show,
  $canvas: null,
  $dataImages: null,
  $canvasRect: new DOMRect(),
  meshStore: [],
  $: {
    bg: null,
    siteTitle: null,
    siteSubTitle: null,
    shopName: null,
    date: null,
    address: null,
    enTextParagraph: null,
  },
};

function init() {
  // console.log("init @detail");

  detail.$canvas = document.querySelector("[data-element='detailCanvas']");
  detail.$dataImages = document.querySelectorAll("[data-image='webgl']");

  if (!detail.$canvas || !detail.$dataImages) return;

  detail.$canvasRect = detail.$canvas.getBoundingClientRect();

  _setDOMElement();
}

async function createMesh({
  imageStore,
  noiseImageTextureA,
  noiseImageTextureB,
}: CreateMesh): Promise<(MeshStore | undefined)[]> {
  if (!detail.$dataImages) return [];
  // console.log("create mesh @detail");

  detail.meshStore = base.createMeshFunction({
    imageStore,
    $canvasRect: detail.$canvasRect,
    $images: detail.$dataImages,
    noiseImageTextureA,
    noiseImageTextureB,
    vertexShader,
    fragmentShader,
    scene: base.detailScene!,
  });

  return Promise.resolve(detail.meshStore);
}

function render() {
  if (!base.renderer || !base.camera) return;

  const elapsedTime = list.clock.getElapsedTime();

  detail.meshStore.forEach((object) => {
    if (!object) return;

    object.material.uniforms.uTime.value = elapsedTime;
  });

  base.renderer.render(base.detailScene!, base.camera);

  requestAnimationFrame(render);
}

function setupEvents() {
  // _setupCloseLinkEvents(targetID!);

  let timeoutID: number = 0;

  window.addEventListener("resize", () => {
    if (!detail.$canvas) return;

    events.onResize(
      detail.$canvas,
      detail.meshStore,
      timeoutID,
      ($canvasNewRect) => {
        detail.$canvasRect = $canvasNewRect;
      },
    );
  });
}

function show() {
  // console.log(`show ${targetID}`);

  const showTimeline = gsap.timeline({
    id: "showTimeline",
    onComplete: () => {
      // console.log("showTimeline complete");
    },
  });
  showTimeline
    .set(detail.$.shopName, {
      x: "-40",
    })
    .set([detail.$.siteTitle, detail.$.siteSubTitle], {
      y: "-40",
    })
    .set(detail.$.date, {
      x: "40",
    })
    .set(detail.$.address, {
      y: "40",
    })
    .call(() => {
      detail.meshStore.forEach((object) => {
        if (!object) return;

        gsap.to(object.material.uniforms.uAlpha, {
          delay: 0.1,
          value: 1,
          duration: 1.2,
          ease: "expo.inOut",
        });
      });
    })
    .to([detail.$.shopName, detail.$.date], {
      delay: 0.1,
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: "power2.inOut",
    })
    .to(
      [detail.$.siteTitle, detail.$.siteSubTitle, detail.$.address],
      {
        delay: 0.1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.inOut",
      },
      "<",
    )
    .call(() => {
      _enTextAnimation();
    });
}

function _setDOMElement() {
  detail.$.bg = document.querySelector("#detailBg");
  detail.$.siteTitle = document.querySelector(`#siteTitle_detail`);
  detail.$.siteSubTitle = document.querySelector(`#siteSubTitle_detail`);
  detail.$.shopName = document.querySelector(`#shopName`);
  detail.$.date = document.querySelector(`#date`);
  detail.$.address = document.querySelector(`#address`);
  detail.$.enTextParagraph = document.querySelectorAll(`.enText div div`);
}

async function _enTextAnimation() {
  if (!detail.$.enTextParagraph) return;

  const index = document
    .querySelector(`.dataIndex`)
    ?.getAttribute("data-index");
  const name = document.querySelector(`.dataName`)?.getAttribute("data-name");
  const address = document
    .querySelector(`.dataAddress`)
    ?.getAttribute("data-address");

  await typeText({
    index: 0,
    paragraph: detail.$.enTextParagraph[0] as HTMLElement,
    text: `No. ${index}`,
  });
  await typeText({
    index: 0,
    paragraph: detail.$.enTextParagraph[1] as HTMLElement,
    text: `${name}`,
  });
  await typeText({
    index: 0,
    paragraph: detail.$.enTextParagraph[2] as HTMLElement,
    text: `${address}`,
  });
}

export default detail;
