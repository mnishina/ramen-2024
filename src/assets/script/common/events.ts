import type { MeshStore, Events } from "~script/type/";

import base from "~script/common/base";
import {
  getCanvasInfo,
  getCameraFOV,
  getWorldPosition,
} from "~script/common/util";

const events: Events = {
  onResize,
};

function onResize(
  $canvas: HTMLCanvasElement,
  meshStore: (MeshStore | undefined)[],
  timeoutID: number,
  callback?: ($canvasNewRect: DOMRect) => void,
) {
  clearTimeout(timeoutID);

  timeoutID = setTimeout(() => {
    const { camera, renderer } = base;
    if (!camera || !renderer) return;

    //再度Canvasから取得する
    const {
      $canvasRect: $canvasNewRect,
      $canvasWidth: $canvasNewWidth,
      $canvasHeight: $canvasNewHeight,
      $canvasAspectRatio: $canvasNewAspectRatio,
    } = getCanvasInfo($canvas);
    const newFOV = getCameraFOV($canvasNewHeight, camera.far);

    renderer.setSize($canvasNewWidth, $canvasNewHeight, false);

    camera.aspect = $canvasNewAspectRatio;
    camera.fov = newFOV;
    camera.updateProjectionMatrix();

    base.cameraInfo.fov = newFOV;

    meshStore.forEach((object) => _resizeMesh(object, $canvasNewRect));

    if (callback) {
      callback($canvasNewRect);
    }
  }, 400);

  return timeoutID;
}

function _resizeMesh(object: MeshStore | undefined, $canvasNewRect: DOMRect) {
  if (!object || !$canvasNewRect) return;

  const $imageNewRect = object?.$image.getBoundingClientRect();
  object.$imageRect = $imageNewRect;
  object.$imageWidth = $imageNewRect.width;
  object.$imageHeight = $imageNewRect.height;
  object.mesh.scale.set(object.$imageWidth, object.$imageHeight, 0);

  const { x, y } = getWorldPosition($canvasNewRect, $imageNewRect);
  object.mesh.position.x = x;
  object.mesh.position.y = y;
}

export default events;
