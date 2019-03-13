import yoga, { Node } from 'yoga-layout';
import { applyStyles } from './style-utils';
import { wrapText } from './text-utils';

let offscreen, ctx;

function checkChildren(layoutTree, yogaTree, width, height) {
  Object.keys(layoutTree.children).forEach(child => {
    let layoutChild = layoutTree.children && layoutTree.children[child];
    let yogaChild = yogaTree.children && yogaTree.children[child];
    if (layoutChild.type === 'Text' && layoutChild && yogaChild) {
      let yogaParent = yogaChild.node.getParent();
      let parentStyles = layoutTree.props.style;
      let { width: parentWidth } = yogaParent.getComputedLayout();
      let fixedParentWidth =
        parentWidth -
        (parentStyles.borderWidth ? parentStyles.borderWidth * 2 : 0);
      fixedParentWidth =
        fixedParentWidth -
        (parentStyles.padding ? parentStyles.padding * 2 : 0);
      const {
        fontFamily,
        fontSize,
        fontStyle,
        color,
      } = layoutChild.props.style;
      ctx.font = `${fontStyle || 'normal'} ${fontSize || 14}px ${fontFamily ||
        'Arial'}`;
      ctx.fillStyle = color || 'black';
      ctx.textBaseline = 'top';

      let lines = wrapText(
        ctx,
        layoutChild.text,
        1,
        1,
        fixedParentWidth || 100,
        layoutChild.props.style.lineHeight ||
          layoutChild.props.style.fontSize ||
          14
      );
      layoutChild.lines = lines;

      let lineWidths = [];

      lines.forEach(line => {
        const { width } = ctx.measureText(line.text);
        lineWidths.push(width);
      });

      const fattestLine = Math.max.apply(Math, lineWidths);
      const totalHeight =
        lines.length *
        (layoutChild.props.style.lineHeight ||
          layoutChild.props.style.fontSize ||
          14);

      yogaChild.node.setWidth(fattestLine);
      yogaChild.node.setHeight(totalHeight);
    } else {
      checkChildren(layoutChild, yogaChild, width, height);
    }
  });
}

function updateTextLayout(layoutTree, yogaTree, width, height) {
  checkChildren(layoutTree, yogaTree, width, height);
}

export const recalcLayout = (layoutTree, yogaTree, { width, height }) => {
  yogaTree.node.calculateLayout(width, height, yoga.DIRECTION_LTR);
  updateTextLayout(layoutTree, yogaTree, width, height);
  yogaTree.node.calculateLayout(width, height, yoga.DIRECTION_LTR);
  const {
    left,
    top,
    width: cwidth,
    height: cheight,
  } = yogaTree.node.getComputedLayout();
  layoutTree.x = left;
  layoutTree.y = top;
  layoutTree.width = cwidth;
  layoutTree.height = cheight;
  layoutTree.depth = 1;
  computeChildren(layoutTree, yogaTree, { x: left, y: top, z: 1 });
  return { yogaTree, layoutTree };
};

export const updateLayout = (
  layoutTree,
  yogaTree,
  { buffer, width, height }
) => {
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
      ctx.font = `${fontStyle || 'normal'} ${fontSize || 14}px ${fontFamily ||
        'Arial'}`;
      ctx.fillStyle = color || 'black';
      ctx.textBaseline = 'top';

      let text = ctx.measureText(child.props.children);
      yogaTarget.node.setWidth(text.width);
      yogaTarget.node.setHeight(14);
    }
  });

  return recalcLayout(layoutTree, yogaTree, { width, height });
};

export const initializeLayout = (
  layoutTree,
  yogaTree,
  { tree, width, height }
) => {
  offscreen = new OffscreenCanvas(width, height);
  ctx = offscreen.getContext('2d', { alpha: false });
  const root = Node.create();
  root.setWidthAuto();
  root.setHeightAuto();

  yogaTree.node = root;

  if (tree.children) {
    layoutChildren({
      layoutRoot: layoutTree,
      yogaRoot: yogaTree,
      root,
      children: tree.children,
      width,
      height,
    });
  }

  yogaTree.node.calculateLayout(width, height, yoga.DIRECTION_LTR);
  const {
    left,
    top,
    width: cwidth,
    height: cheight,
  } = yogaTree.node.getComputedLayout();
  layoutTree.x = left;
  layoutTree.y = top;
  layoutTree.width = cwidth;
  layoutTree.height = cheight;
  layoutTree.depth = 1;
  computeChildren(layoutTree, yogaTree, { x: left, y: top, z: 1 });
  return { yogaTree, layoutTree };
};

const computeChildren = (
  layoutRoot,
  yogaRoot,
  offset = { x: 0, y: 0, z: 1 }
) => {
  layoutRoot.children = layoutRoot.children || {};
  Object.keys(yogaRoot.children).forEach(key => {
    const layoutChild = layoutRoot.children[key];
    let child = yogaRoot.children[key];
    const { left, top, width, height } = child.node.getComputedLayout();
    layoutChild.x = offset.x + left;
    layoutChild.y = offset.y + top;
    layoutChild.width = width;
    layoutChild.height = height;
    layoutChild.depth = offset.z + 1;
    if (child.children) {
      computeChildren(layoutChild, child, {
        x: layoutChild.x,
        y: layoutChild.y,
        z: offset.z + 1,
      });
    }
  });
};

const layoutChildren = ({
  layoutRoot,
  yogaRoot,
  root,
  children,
  width,
  height,
}) => {
  yogaRoot.children = yogaRoot.children || {};
  layoutRoot.children = layoutRoot.children || {};
  Object.keys(children).forEach((key, index, arr) => {
    const child = children[key];
    const yogaChild = (yogaRoot.children[key] = {});
    const layoutChild = (layoutRoot.children[key] = {});
    layoutRoot.children[key].props = child.props;
    layoutRoot.children[key].type = child.type;
    layoutRoot.children[key].text = child.text;
    if (child.type === 'View') {
      yogaChild.node = Node.create();
      applyStyles(yogaChild.node, child.props.style || {});
      root.insertChild(yogaChild.node, index);
      if (child.children) {
        layoutChildren({
          layoutRoot: layoutRoot.children[key],
          yogaRoot: yogaChild,
          root: yogaChild.node,
          children: child.children,
          width,
          height,
        });
      } else {
        layoutRoot.children[key].children = {};
      }
    } else if (child.type === 'Text') {
      yogaChild.node = Node.create();

      let offscreen = new OffscreenCanvas(width, height);
      let ctx = offscreen.getContext('2d');

      const {
        fontFamily,
        fontSize,
        fontStyle,
        color,
      } = layoutChild.props.style;
      ctx.font = `${fontStyle || 'normal'} ${fontSize || 14}px ${fontFamily ||
        'Arial'}`;
      ctx.fillStyle = color || 'black';
      ctx.textBaseline = 'top';

      let text = ctx.measureText(layoutChild.text);
      yogaChild.node.setWidth(text.width);
      yogaChild.node.setHeight(14);
      root.insertChild(yogaChild.node, index);
      layoutRoot.children[key].children = {};
    }
  });
};
