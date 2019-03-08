import { drawChildTree, redrawSubtree } from './draw-utils';

let canvas;
let ctx;
let tree;

self.addEventListener("message", handleMessage);

function drawLoop() {
  if (ctx && tree) {
    drawChildTree({ ctx, children: tree.children })
  }
  requestAnimationFrame(drawLoop);
}

function handleMessage(event) {
  const { operation, args } = event.data;

  if (operation === 'init') {
    canvas = event.data.canvas;
    ctx = canvas.getContext('2d');
  }

  if (operation === 'updateTree') {
    if (!tree) {
      tree = args.tree;
      drawLoop()
    } else {
      tree = args.tree;
    }
  }

  if (operation === 'resizeCanvas') {
    canvas.width = args.width;
    canvas.height = args.height;
  }
}