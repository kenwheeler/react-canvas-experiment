export const addToTree = ({ tree, parent, id, props, getProps, type }) => {
  const paths = parent.split('|');
  let currentPath = tree;
  paths.forEach(p => {
    if (p === 'CanvasRoot') {
      currentPath = tree;
    } else {
      if (!currentPath.children[p]) {
        currentPath.children[p] = {
          children: {},
          props: null,
        };
      }
      currentPath = currentPath.children[p];
    }
  });
  currentPath.children[id] = {
    children: currentPath.children[id]
      ? currentPath.children[id].children
      : {},
    props: props,
    type: type,
    getProps: getProps,
  };
}

export const removeFromTree = ({ targetPath, parent, id }) => {
  const paths = parent.split('|');

  paths.forEach(path => {
    if (path !== 'CanvasRoot') {
      targetPath = targetPath.children[path];
    }
  });
  const yogaNode = targetPath[id].node;
  const nodeParent = targetPath[id].node.getParent();
  nodeParent.removeChild(yogaNode);
  delete targetPath[id];
}

export const buildLayoutTree = ({ tree }) => {
  let layoutTree = {};

  function addChild(root, layoutRoot) {
    if (root.getProps) {
      let { style } = root.getProps();
      layoutRoot.style = style;
    }
    if (root.children) {
      Object.keys(root.children).forEach((key) => {
        layoutRoot[key] = {};
        addChild(root.children[key], layoutRoot[key]);
      })
    }
  }

  addChild(tree, layoutTree);

  return layoutTree;
}