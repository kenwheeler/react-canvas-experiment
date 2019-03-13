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
    children: currentPath.children[id] ? currentPath.children[id].children : {},
    props: props,
    type: type,
    getProps: getProps,
  };
};

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
};

export const getChild = ({ layoutTree, parent, id, props }) => {
  const paths = parent.split('|');
  let targetPath = { ...layoutTree };

  paths.forEach(path => {
    if (path !== 'CanvasRoot') {
      targetPath = targetPath.children[path];
    }
  });

  const target = targetPath.children[id];
  if (!target) {
    return null;
  }
  let { style, children } = props;

  target.props.style = style || {};
  if (target.type === 'Text') {
    target.text =
      children && typeof children === 'string' ? children.toString() : null;
  }
  return target;
};

export const buildLayoutTree = ({ tree }) => {
  let layoutTree = {};

  function addChild(root, layoutRoot) {
    if (root.getProps) {
      let { style, children } = root.getProps();
      layoutRoot.props = {};
      layoutRoot.props.style = style || {};
      if (root.type === 'Text') {
        layoutRoot.text =
          children && typeof children === 'string' ? children.toString() : null;
      }
    }
    if (root.type) {
      layoutRoot.type = root.type;
    }
    if (root.children) {
      Object.keys(root.children).forEach(key => {
        if (!layoutRoot.children) {
          layoutRoot.children = [];
        }
        layoutRoot.children[key] = {};
        addChild(root.children[key], layoutRoot.children[key]);
      });
    }
  }

  addChild(tree, layoutTree);

  return layoutTree;
};

export const addEvent = (eventMap, id, props) => {
  Object.keys(props).forEach(p => {
    if (p in eventMap) {
      eventMap[p][id] = props[p];
    }
  });
};

export const removeEvent = (eventMap, id, props) => {
  Object.keys(props).forEach(p => {
    if (p in eventMap) {
      delete eventMap[p][id];
    }
  });
};
