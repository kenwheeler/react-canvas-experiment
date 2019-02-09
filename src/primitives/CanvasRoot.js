import React, { useRef, useEffect } from 'react';
import CanvasContext from './Context';
import yoga, { Node } from 'yoga-layout';
import { applyStyles } from './style-utils';

const { Provider } = CanvasContext;

export default function CanvasRoot(props) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const treeRef = useRef({ children: {}, props: null });

  const redraw = (parent, id, props) => {
    const paths = parent.split('|');
    let target = treeRef.current;
    paths.forEach((path, i, arr) => {
      if (path !== 'CanvasRoot') {
        target = target.children[path];
      }
    });
    const node = target.children[id];
    requestAnimationFrame(() => drawChild(node, target.offset));
  };

  const drawChild = (child, offset = { x: 0, y: 0 }) => {
    const ctx = canvasRef.current.getContext('2d');

    let { left, top, width, height } = child.node.getComputedLayout();
    let offsetLeft = offset.x + left;
    let offsetTop = offset.y + top;

    const props = child.getProps();

    if (child.type === 'View') {
      ctx.fillStyle = props.style.backgroundColor || 'transparent';
      ctx.fillRect(offsetLeft, offsetTop, width, height);

      if (Object.keys(child.children).length) {
        child.offset = { x: offsetLeft, y: offsetTop };
        drawChildren(child.children, child.offset);
      }
    } else {
      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = 'white';
      ctx.textBaseline = 'top';
      ctx.fillText(props.children.toString(), offsetLeft, offsetTop);
    }
  };

  const drawChildren = (children, offset = { x: 0, y: 0 }) => {
    const ctx = canvasRef.current.getContext('2d');
    Object.keys(children).forEach((key, index) => {
      const child = children[key];

      drawChild(child, offset);
    });
  };

  const layoutChildren = (root, children) => {
    const ctx = canvasRef.current.getContext('2d');

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
        const { width } = ctx.measureText(child.props.children);
        node.setWidth(width);
        node.setHeight(14);
        root.insertChild(node, index);
      }
    });
  };

  const getLayout = tree => {
    const root = Node.create();
    root.setWidth(600);
    root.setHeight(600);

    tree.node = root;

    if (tree.children) {
      layoutChildren(root, tree.children);
    }
  };

  const registerNode = (parent, id, props, getProps, type) => {
    const tree = treeRef.current;
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
  };

  const unregisterNode = (parent, id) => {
    const paths = parent.split('|');
    let targetPath = treeRef.current;
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

  useEffect(() => {
    console.log('Root mounted');
    getLayout(treeRef.current);
    treeRef.current.node.calculateLayout(600, 600, yoga.DIRECTION_LTR);
    requestAnimationFrame(() => drawChildren(treeRef.current.children));
    console.log(treeRef.current);
  }, []);

  return (
    <Provider
      value={{
        parent: 'CanvasRoot',
        registerNode: registerNode,
        redraw: redraw,
        unregisterNode: unregisterNode,
      }}
    >
      <div ref={containerRef}>
        <canvas ref={canvasRef} height={600} width={600}>
          {props.children || null}
        </canvas>
      </div>
    </Provider>
  );
}
