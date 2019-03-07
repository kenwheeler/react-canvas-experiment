import yoga, { Node } from 'yoga-layout';
import { applyStyles } from './style-utils';

export const initializeLayout = ({ tree, width, height }) => {
  const root = Node.create();
  root.setWidthAuto();
  root.setHeightAuto();

  tree.node = root;

  if (tree.children) {
    layoutChildren(root, tree.children);
  }

  tree.node.calculateLayout(width, height, yoga.DIRECTION_LTR);
}

const layoutChildren = (root, children) => {
  //const ctx = canvasRef.current.getContext('2d');

  Object.keys(children).forEach((key, index, arr) => {
    const child = children[key];
    if (child.type === 'View') {
      const node = Node.create();
      child.node = node;
      applyStyles(node, child.props.style || {});
      child.node.setFlexWrap(yoga.WRAP_WRAP);
      root.insertChild(node, index);
      if (child.children) {
        layoutChildren(node, child.children);
      }
    } else {
      const node = Node.create();
      child.node = node;
      const { width } = 400 //ctx.measureText(child.props.children);
      node.setWidth(width);
      node.setHeight(14);
      root.insertChild(node, index);
    }
  });
}