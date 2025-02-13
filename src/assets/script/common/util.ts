import type { TypeTextParams } from "~script/type";
import { Mesh, Scene, ShaderMaterial } from "three";

function getPage() {
  const path = window.location.pathname;
  return {
    isRoot: path === "/",
    path,
  };
}

function getCanvasInfo($canvas: HTMLCanvasElement) {
  const $canvasRect = $canvas.getBoundingClientRect();

  const { width: $canvasWidth, height: $canvasHeight } = $canvasRect;
  const $canvasAspectRatio = $canvasWidth / $canvasHeight;

  return { $canvasRect, $canvasWidth, $canvasHeight, $canvasAspectRatio };
}

function getCameraFOV($canvasHeight: number, cameraFar: number) {
  const radian = 2 * Math.atan($canvasHeight / 2 / cameraFar);
  const fov = (180 / Math.PI) * radian;

  return fov;
}

function getWorldPosition($canvasRect: DOMRect, $imageRect: DOMRect) {
  const x = $imageRect.left + $imageRect.width / 2 - $canvasRect.width / 2;
  const y = -$imageRect.top - $imageRect.height / 2 + $canvasRect.height / 2;

  return { x, y };
}

function typeText({ index, paragraph, text }: TypeTextParams): Promise<void> {
  return new Promise((resolve) => {
    let timeoutID: number;

    function run() {
      if (index < text.length) {
        if (text.slice(index, index + 4) === "<br>") {
          paragraph.innerHTML += "<br>";
          index += 4;
        } else {
          paragraph.innerHTML += text.charAt(index);
          index++;
        }
        timeoutID = setTimeout(run, 30);
      } else {
        clearTimeout(timeoutID);
        resolve();
      }
    }
    run();
  });
}

function replaceBR(text: string) {
  return text.replace(/\ /g, "<br>");
}

function stripBR(text: string) {
  return text.replace(/<br\s*\/?>/gi, " ");
}

function clearScene(scene: Scene) {
  while (scene.children.length > 0) {
    const object = scene.children[0];
    if (object instanceof Mesh) {
      object.geometry.dispose();
      if (object.material instanceof ShaderMaterial) {
        object.material.dispose();
      }
    }
    scene.remove(object);
  }
}

export {
  getPage,
  getCanvasInfo,
  getCameraFOV,
  getWorldPosition,
  typeText,
  replaceBR,
  stripBR,
  clearScene,
};
