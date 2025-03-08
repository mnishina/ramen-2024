import type { App } from "~script/type";

import { Texture } from "three";
import gsap from "gsap";
import { db, noiseImageA, noiseImageB } from "~/db/db";
import loader from "~script/common/loader";
import scroller from "~script/common/scroller";
import cursor from "~script/common/cursor";
import base from "~script/common/base";
import { getPage, clearScene } from "~script/common/util";

import list from "~script/scene/list/list";
import detail from "~script/scene/detail/detail";

export const app: App = {
  imageStore: new Map(),
  noiseImageTextureA: new Texture(),
  noiseImageTextureB: new Texture(),
};

document.addEventListener("astro:before-preparation", (event) => {
  const originalLoader = event.loader;
  event.loader = async () => {
    await leaveTransition();
    await originalLoader();
  };
});

document.addEventListener("astro:before-swap", () => {
  const isRoot = getPage().isRoot;

  if (isRoot) {
    clearScene(base.detailScene!);
    detail.meshStore = [];
    detail.$dataImages = null;
    detail.$canvas = null;
  } else {
    clearScene(base.listScene!);
    list.meshStore = [];
    list.$dataImages = null;
    list.$canvas = null;
  }
  // レンダリングループを停止
  if (list.animationFrameId) {
    cancelAnimationFrame(list.animationFrameId);
    list.animationFrameId = null;
  }
  if (detail.animationFrameId) {
    cancelAnimationFrame(detail.animationFrameId);
    detail.animationFrameId = null;
  }

  // Three.jsリソースの適切な破棄
  if (base.renderer) {
    base.renderer.dispose();
    base.renderer.forceContextLoss();
  }

  if (base.geometry) base.geometry.dispose();
  if (base.material) base.material.dispose();

  // コンポーザーの破棄
  if (base.composer) {
    (base.composer as any).dispose();
  }

  base.listScene = null;
  base.detailScene = null;
  base.geometry = null;
  base.material = null;
  base.renderer = null;
  base.camera = null;
  base.composer = null;
});

document.addEventListener("astro:page-load", async () => {
  _init();
});

async function _init() {
  // 画像を読み込んでいるか判定
  if (!loader.isLoaded) await loader.loadImage(db, noiseImageA, noiseImageB);

  await _waitImgElementDrawing();

  // ページの判定
  if (getPage().isRoot) {
    await _isListPage();
  } else {
    await _isDetailPage();
  }

  _showCursor();
}

async function _isListPage() {
  if (!app.noiseImageTextureA || !app.noiseImageTextureB || !app.imageStore)
    return;

  scroller.init();

  list.init();
  base.setupComposition(list.$canvas!, "list");
  list.createMesh({
    imageStore: app.imageStore,
    noiseImageTextureA: app.noiseImageTextureA,
    noiseImageTextureB: app.noiseImageTextureB,
  });
  list.render();
  list.show();
  list.setupEvents();
}

async function _isDetailPage() {
  if (!app.noiseImageTextureA || !app.noiseImageTextureB || !app.imageStore)
    return;

  detail.init();
  base.setupComposition(detail.$canvas!, "detail");
  detail.createMesh({
    imageStore: app.imageStore,
    noiseImageTextureA: app.noiseImageTextureA,
    noiseImageTextureB: app.noiseImageTextureB,
  });
  detail.setupEvents();
  detail.render();
  detail.show();
}

async function _waitImgElementDrawing() {
  let img_elements = document.querySelectorAll("img");
  // 各画像ごとにPromiseを生成
  const loadPromises = Array.from(img_elements).map((img: HTMLImageElement) => {
    return new Promise((resolve) => {
      // すでに読み込み済みの場合はそのまま解決
      if (img.complete) {
        resolve(img);
      } else {
        img.addEventListener(
          "load",
          () => {
            // console.log("ロード完了:", img);
            resolve(img);
          },
          { once: true },
        );

        // エラーになった場合も解決して次に進む
        img.addEventListener(
          "error",
          () => {
            // console.error("ロードエラー:", img);
            resolve(img);
          },
          { once: true },
        );
      }
    });
  });

  await Promise.all(loadPromises);
}

function _showCursor() {
  const isRoot = getPage().isRoot;

  cursor.init(isRoot);
}

async function leaveTransition() {
  return new Promise((resolve) => {
    list.hideAwwwardsRibbon();

    const leaveTransitionTL = gsap.timeline();
    leaveTransitionTL.to(document.querySelector("[data-element='main']"), {
      delay: 0.05,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: resolve,
    });
  });
}
