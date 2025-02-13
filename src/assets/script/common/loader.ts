import type { DB, Loader } from "~script/type";

import { TextureLoader, LoadingManager, LinearFilter } from "three";
import gsap from "gsap";

import { app } from "~script/app";

const loader: Loader = {
  loadImage,
  loadingDisplay: document.querySelector("[data-element='loadingDisplay']"),
  loadingManager: new LoadingManager(),
  textureLoader: null,
  isLoaded: false,
};
const display = loader.loadingDisplay;

async function loadImage(db: DB[], noiseImageA: string, noiseImageB: string) {
  // console.log("loadImage");

  return new Promise(async (resolve, reject) => {
    _addLoadingDisplayLayer();

    await _manager(resolve, reject);

    db.forEach((d: DB) => {
      const texture = loader.textureLoader?.load(d.imagePath);

      if (!texture) return;
      texture.magFilter = LinearFilter;
      texture.minFilter = LinearFilter;
      texture.needsUpdate = false;
      texture.flipY = false;

      app.imageStore.set(d.imagePath, texture);
    });

    if (loader.textureLoader) {
      app.noiseImageTextureA = loader.textureLoader.load(noiseImageA);
      app.noiseImageTextureB = loader.textureLoader.load(noiseImageB);
    }
  });
}

async function _manager(
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void,
): Promise<void> {
  loader.textureLoader = new TextureLoader(loader.loadingManager);

  await _showLoadingDisplay();

  _onProgress(loader.loadingManager);
  _onLoad(loader.loadingManager, resolve);

  _onError(loader.loadingManager, reject);
}

function _onProgress(manager: LoadingManager) {
  manager.onProgress = (url, loaded, total) => {
    // console.log("progress >>>" + url, loaded, total);
    loader.loadingDisplay!.innerHTML = `${Math.round((loaded / total) * 100)}`;
  };
}

function _onLoad(manager: LoadingManager, resolve: (value: unknown) => void) {
  manager.onLoad = async () => {
    await _hideLoadingDisplay();

    resolve((loader.isLoaded = true));
  };
}

function _onError(manager: LoadingManager, reject: (reason?: any) => void) {
  manager.onError = (url) => {
    reject(new Error(`Failed to load texture: ${url}`));
  };
}

function _addLoadingDisplayLayer() {
  display?.classList.remove("hidden");
  display?.classList.add("fixed");
}

async function _showLoadingDisplay() {
  return new Promise((resolve) => {
    // console.log("_showLoadingDisplay");

    const showTL = gsap.timeline();
    showTL
      .set(display, {
        left: -20,
      })
      .to(display, {
        delay: 0.5,
        duration: 0.8,
        left: 0,
        opacity: 1,
        ease: "power2.out",
      })
      .to(display, {
        delay: 0.4,
        onComplete: () => {
          resolve(showTL);
        },
      });
  });
}

async function _hideLoadingDisplay() {
  return new Promise((resolve) => {
    const hideTL = gsap.timeline();

    hideTL.to(display, {
      delay: 0.6,
      duration: 0.3,
      left: -20,
      opacity: 0,
      ease: "power2.out",
      onComplete: () => {
        display?.classList.add("hidden");
        resolve(hideTL);
      },
    });
  });
}

export default loader;
