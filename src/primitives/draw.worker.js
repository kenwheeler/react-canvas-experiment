import { drawChildTree, redrawSubtree } from './draw-utils';

let canvas;
let ctx;

self.addEventListener("message", handleMessage);

function handleMessage(event) {
  const { operation, args } = event.data;

  if (operation === 'init') {
    canvas = event.data.canvas;
    ctx = canvas.getContext('2d');
  }

  if (operation === 'drawChildTree') {
    args.ctx = ctx;
    drawChildTree(args);
    self.postMessage('update');
  }

  if (operation === 'redrawSubtree') {
    args.ctx = ctx;
    redrawSubtree(args);
    self.postMessage('update');
  }

  if (operation === 'resizeCanvas') {
    canvas.width = args.width;
    canvas.height = args.height;
  }
}