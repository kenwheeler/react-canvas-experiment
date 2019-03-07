import React, { useRef, useEffect } from 'react';
import yoga from 'yoga-layout';
import useComponentSize from '@rehooks/component-size'

import CanvasContext from './Context';
import { addToTree, removeFromTree } from './tree-utils';
import { initializeLayout } from './layout-utils';
import { drawChildTree, redrawSubtree } from './draw-utils';
import layoutWorker from './layout.worker';

const { Provider } = CanvasContext;

export default function CanvasRoot(props) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const treeRef = useRef({ children: {}, props: null });
  const workerRef = useRef(null);
  let size = useComponentSize(containerRef)

  const redraw = (parent, id, props) => {
    let target = treeRef.current;
    const ctx = canvasRef.current.getContext('2d');
    redrawSubtree({ ctx, target, parent, id, props });
  };

  const drawChildren = (children, offset = { x: 0, y: 0 }) => {
    const ctx = canvasRef.current.getContext('2d');
    drawChildTree({ ctx, children, offset });
  };

  const registerNode = (parent, id, props, getProps, type) => {
    const tree = treeRef.current;
    addToTree({ tree, parent, id, props, getProps, type });
  };

  const unregisterNode = (parent, id) => {
    let targetPath = treeRef.current;
    removeFromTree({ targetPath, parent, id });
  };

  // const handleMessage = (tree) => {
  //   treeRef.current = tree;
  // };

  useEffect(() => {
    const { width, height } = size;

    // workerRef.current = new layoutWorker();
    // const tree = {...treeRef.current};
    // workerRef.current.postMessage({operation: 'initializeLayout', tree, width: width, height: height });
    // workerRef.current.addEventListener('message', this.handleMessage);

    initializeLayout({ tree: treeRef.current, width: width, height: height });
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    requestAnimationFrame(() => drawChildren(treeRef.current.children));

    // return () => {
    //   workerRef.current.removeEventListener('message', this.handleMessage);
    // }
  }, []);

  useEffect(() => {
    const { width, height } = size;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    treeRef.current.node.calculateLayout(width, height, yoga.DIRECTION_LTR);
    requestAnimationFrame(() => drawChildren(treeRef.current.children));
  }, [size]);

  return (
    <Provider
      value={{
        parent: 'CanvasRoot',
        registerNode: registerNode,
        redraw: redraw,
        unregisterNode: unregisterNode,
      }}
    >
      <div ref={containerRef} {...props}>
        <canvas ref={canvasRef} height={600} width={600} style={{ display: 'block' }}>
          {props.children || null}
        </canvas>
      </div>
    </Provider>
  );
}
