import type { Cursor } from "~script/type";

const cursor: Cursor = {
  init,
  $element: document.querySelector("[data-element='cursor']"),
  $textPath: document.querySelector("[data-element='textPath']"),
  mouseX: 0,
  mouseY: 0,
  animationFrameId: null,
  isRoot: null,
};

function init(isRoot: Boolean) {
  cursor.isRoot = isRoot;

  cursor.$element?.classList.add("show");

  _bindEvents();
}

function _bindEvents() {
  document.addEventListener("mousemove", (e) => _onMouseMove(e));

  _onMouse(cursor.isRoot!);
}

function _onMouseMove(e: MouseEvent) {
  const { clientX: mouseX, clientY: mouseY } = e;

  if (cursor.animationFrameId === null) {
    requestAnimationFrame(() => _updateCursorPosition(mouseX, mouseY));
  }
}
function _updateCursorPosition(mouseX: number, mouseY: number) {
  cursor.$element!.style.transform = `translate(-50%, -50%) translate3d(${mouseX}px, ${mouseY}px, 0)`;

  cursor.animationFrameId = null;
}

function _onMouse(isRoot: Boolean) {
  if (isRoot) {
    const listLinks = document.querySelectorAll("[data-link='list']");
    listLinks.forEach((link) => {
      const { dataCursorText, length } = _getTargetAttributes(link);

      if (!dataCursorText || !length) return;

      _enter(link, dataCursorText, length);
      _leave(link);
    });
  } else {
    const detailLink = document.querySelector("[data-link='detail']");

    if (!detailLink) return;

    const { dataCursorText, length } = _getTargetAttributes(detailLink);

    if (!dataCursorText || !length) return;

    _enter(detailLink, dataCursorText, length);
    _leave(detailLink);
  }
}

function _enter(link: Element, dataCursorText: string, length: string) {
  link.addEventListener("mouseenter", () => {
    if (!cursor.$textPath) return;

    cursor.$textPath.innerHTML = _addCursorText(dataCursorText, length!);
    cursor.$element?.classList.add("active");
  });
}
function _leave(link: Element) {
  link.addEventListener("mouseleave", () => {
    if (!cursor.$textPath) return;

    cursor.$textPath.innerHTML = "";
    cursor.$element?.classList.remove("active");
  });
}

function _addCursorText(dataCursorText: string, length: string) {
  let num = null;

  switch (length) {
    case "s":
      num = 8;
      break;

    case "m":
      num = 5;
      break;

    case "l":
      num = 2;
      break;

    case "back":
      num = 10;
      break;

    default:
      num = 5;
      break;
  }

  return Array(num).fill(dataCursorText).join(" ");
}

function _getTargetAttributes(link: Element) {
  return {
    dataCursorText: link.getAttribute("data-cursorText"),
    length: link.getAttribute("data-cursorTextLength"),
  };
}

export default cursor;
