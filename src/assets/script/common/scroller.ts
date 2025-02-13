import type { Scroller } from "~script/type";

import Lenis from "lenis";

const scroller: Scroller = {
  init,
  lenis: null,
};

function init(this: typeof scroller) {
  this.lenis = new Lenis({
    autoRaf: true,
    lerp: 0.065,
  });
}

export default scroller;
