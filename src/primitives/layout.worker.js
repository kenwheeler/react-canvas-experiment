// import { addToTree, removeFromTree } from './tree-utils';
import { initializeLayout, recalcLayout, updateLayout } from './layout-utils';

let layoutTree = {};
let yogaTree = {};

self.addEventListener('message', handleMessage);

function handleMessage(event) {
  const { operation, args } = event.data;

  if (operation === 'initializeLayout') {
    let layout = initializeLayout(layoutTree, yogaTree, args);
    layoutTree = layout.layoutTree;
    yogaTree = layout.yogaTree;
    self.postMessage(layoutTree);
  }

  if (operation === 'recalcLayout') {
    let layout = recalcLayout(layoutTree, yogaTree, args);
    layoutTree = layout.layoutTree;
    yogaTree = layout.yogaTree;
    self.postMessage(layoutTree);
  }

  if (operation === 'updateLayout') {
    let layout = updateLayout(layoutTree, yogaTree, args);
    layoutTree = layout.layoutTree;
    yogaTree = layout.yogaTree;
    self.postMessage(layoutTree);
  }
}
