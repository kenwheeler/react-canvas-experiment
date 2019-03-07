self.addEventListener("message", handleMessage);

import { addToTree, removeFromTree } from './tree-utils';
import { initializeLayout } from './layout-utils';

const operationMap = {
  addToTree,
  removeFromTree,
  initializeLayout
}

let layoutTree = {}

function handleMessage(event) {
  const { operation, args } = event.data;

  if (operation === 'initializeLayout') {
    layoutTree = initializeLayout(layoutTree, args);
    self.postMessage(layoutTree);
  }
}