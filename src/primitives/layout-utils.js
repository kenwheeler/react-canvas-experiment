import yoga, { Node } from 'yoga-layout';
import { applyStyles } from './style-utils';

export const recalcLayout = (layoutTree, yogaTree, { width, height }) => {
  yogaTree.node.calculateLayout(width, height, yoga.DIRECTION_LTR);
  layoutTree.computed = yogaTree.node.getComputedLayout();
  computeChildren(layoutTree, yogaTree);
  return { yogaTree, layoutTree };
}

export const updateLayout = (layoutTree, yogaTree, { buffer, width, height }) => {
  buffer.forEach(({ parent, id, child }) => {
    const paths = parent.split('|');
    let targetPath = layoutTree;
    let yogaPath = yogaTree;

    paths.forEach(path => {
      if (path !== 'CanvasRoot') {
        targetPath = targetPath.children[path];
        yogaPath = yogaPath.children[path];
      }
    });

    let yogaTarget = yogaPath.children[id];

    targetPath.children[id] = child;
    if (child.type === 'View') {
      applyStyles(yogaTarget.node, child.props.style || {});
    } else if (child.type === 'Text') {
      let offscreen = new OffscreenCanvas(width, height);
      let ctx = offscreen.getContext('2d');

      const { fontFamily, fontSize, fontStyle, color } = child.props.style;
      ctx.font = `${fontStyle || 'normal'} ${fontSize || 14}px ${fontFamily || 'Arial'}`;
      ctx.fillStyle = color || 'black';
      ctx.textBaseline = 'top';
      let text = ctx.measureText(child.props.children);
      yogaTarget.node.setWidth(text.width);
      yogaTarget.node.setHeight(14);
    }
  })

  return recalcLayout(layoutTree, yogaTree, { width, height });
}

export const initializeLayout = (layoutTree, yogaTree, { tree, width, height }) => {
  const root = Node.create();
  root.setWidthAuto();
  root.setHeightAuto();

  yogaTree.node = root;

  if (tree.children) {
    layoutChildren({ layoutRoot: layoutTree, yogaRoot: yogaTree, root, children: tree.children, width, height });
  }

  yogaTree.node.calculateLayout(width, height, yoga.DIRECTION_LTR);
  layoutTree.computed = yogaTree.node.getComputedLayout();
  computeChildren(layoutTree, yogaTree);
  return { yogaTree, layoutTree };
}

const computeChildren = (layoutRoot, yogaRoot) => {
  layoutRoot.children = layoutRoot.children || {};
  Object.keys(yogaRoot.children).forEach((key) => {
    const layoutChild = layoutRoot.children[key];
    let child = yogaRoot.children[key];
    layoutChild.computed = child.node.getComputedLayout();
    if (child.children) {
      computeChildren(layoutChild, child);
    }
  });
}

const layoutChildren = ({ layoutRoot, yogaRoot, root, children, width, height }) => {
  yogaRoot.children = yogaRoot.children || {};
  layoutRoot.children = layoutRoot.children || {};
  Object.keys(children).forEach((key, index, arr) => {
    const child = children[key];
    const yogaChild = yogaRoot.children[key] = {};
    const layoutChild = layoutRoot.children[key] = {}
    layoutRoot.children[key].props = child.props;
    layoutRoot.children[key].type = child.type;
    layoutRoot.children[key].text = child.text;
    if (child.type === 'View') {
      yogaChild.node = Node.create();
      applyStyles(yogaChild.node, child.props.style || {});
      root.insertChild(yogaChild.node, index);
      if (child.children) {
        layoutChildren({ layoutRoot: layoutRoot.children[key], yogaRoot: yogaChild, root: yogaChild.node, children: child.children, width, height });
      } else {
        layoutRoot.children[key].children = {}
      }
    } else if (child.type === 'Text') {
      yogaChild.node = Node.create();

      let offscreen = new OffscreenCanvas(width, height);
      let ctx = offscreen.getContext('2d');

      const { fontFamily, fontSize, fontStyle, color } = layoutChild.props.style;
      ctx.font = `${fontStyle || 'normal'} ${fontSize || 14}px ${fontFamily || 'Arial'}`;
      ctx.fillStyle = color || 'black';
      ctx.textBaseline = 'top';
      let text = ctx.measureText(layoutChild.text);
      yogaChild.node.setWidth(text.width);
      yogaChild.node.setHeight(14);
      root.insertChild(yogaChild.node, index);
      layoutRoot.children[key].children = {}
    }
  });
}