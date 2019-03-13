import { drawChildTree } from './draw-utils';

let canvas;
let ctx;
let tree;
let sizeBuffer = null;

self.addEventListener('message', handleMessage);

function drawLoop() {
  if (ctx && tree) {
    if (sizeBuffer) {
      canvas.width = sizeBuffer.width * sizeBuffer.dpr;
      canvas.height = sizeBuffer.height * sizeBuffer.dpr;
      ctx.scale(sizeBuffer.dpr, sizeBuffer.dpr);
      sizeBuffer = null;
    }
    drawChildTree({ ctx, children: tree.children });
  }
  requestAnimationFrame(drawLoop);
}

function handleMessage(event) {
  const { operation, args } = event.data;

  if (operation === 'init') {
    canvas = event.data.canvas;
    ctx = canvas.getContext('2d', {
      alpha: false,
    });
  }

  if (operation === 'updateTree') {
    if (!tree) {
      tree = args.tree;
      drawLoop();
    } else {
      tree = args.tree;
    }
  }

  if (operation === 'resizeCanvas') {
    sizeBuffer = args;
  }
}
