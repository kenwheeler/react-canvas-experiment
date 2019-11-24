import React, { useRef, useEffect } from 'react';
import useComponentSize from '@rehooks/component-size';
import rbush from 'rbush';

import CanvasContext from './Context';
import {
  addToTree,
  removeFromTree,
  getChild,
  buildLayoutTree,
} from './tree-utils';

import layoutWorker from './layout.worker';
import drawWorker from './draw.worker';

const { Provider } = CanvasContext;

export default function CanvasRoot(props) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const treeRef = useRef({ children: {}, props: null });
  const layoutTreeRef = useRef({ children: {}, props: null });
  const bufferRef = useRef([]);
  const layoutWorkerRef = useRef(null);
  const drawWorkerRef = useRef(null);
  const sizeRef = useRef(null);
  const hoverCacheRef = useRef([]);
  const eventMapRef = useRef({
    onClick: {},
    onMouseEnter: {},
    onMouseMove: {},
    onMouseLeave: {},
    onMouseDown: {},
    onMouseUp: {},
    onResize: {},
    onWheel: {},
  });
  const rBushRef = useRef(rbush());

  let size = useComponentSize(containerRef);

  const dispatchEvent = (event, type) => {
    if (type === 'onResize') {
      let resizers = eventMapRef.current['onResize'];

      Object.keys(resizers).forEach(r => {
        eventMapRef.current['onResize'][r](size);
      });
    } else {
      event.persist();
      event.preventDefault();
      let { x, y } = event.nativeEvent;
      let matches = rBushRef.current.search({
        minX: x,
        minY: y,
        maxX: x,
        maxY: y,
      });

      if (matches.length > 0) {
        matches = matches.sort((a, b) => {
          return a.depth > b.depth ? -1 : 1;
        });

        if (type === 'onMouseMove') {
          let hoverCache = hoverCacheRef.current;

          let leaves = [];
          hoverCache.forEach((c, index) => {
            let target = matches.some(m => m.id === c);
            if (!target) {
              leaves.push({ index, id: c });
            }
          });

          leaves.forEach(l => {
            hoverCache.splice(l.index);
            if (eventMapRef.current['onMouseLeave'][l.id]) {
              eventMapRef.current['onMouseLeave'][l.id](event);
            }
          });

          matches.forEach(match => {
            if (!hoverCache.includes(match.id)) {
              hoverCache.push(match.id);
              if (eventMapRef.current['onMouseEnter'][match.id]) {
                eventMapRef.current['onMouseEnter'][match.id](event);
              }
            }
          });
        }

        matches.forEach(m => {
          if (eventMapRef.current[type][m.id]) {
            eventMapRef.current[type][m.id](event);
          }
        });
      }
    }
  };

  const getDimensions = (parent, id) => {
    let layout = layoutTreeRef.current;
    if (Object.keys(layout.children).length > 0) {
      const paths = parent.split('|');
      let targetPath = { ...layout };

      paths.forEach(path => {
        if (path !== 'CanvasRoot') {
          targetPath = targetPath.children[path];
        }
      });

      if (targetPath) {
        const target = targetPath.children[id];
        return {
          x: target.x,
          y: target.y,
          height: target.height,
          width: target.width,
        };
      }
    }
    return null;
  };

  const updateRBush = () => {
    let tree = rBushRef.current;
    let layout = layoutTreeRef.current;
    tree.clear();

    let items = [];

    function addChildren(children) {
      Object.keys(children).forEach(child => {
        let { x, y, width, height, depth } = children[child];
        items.push({
          minX: x,
          minY: y,
          maxX: x + width,
          maxY: y + height,
          id: child,
          depth,
        });
        if (children[child].children) {
          addChildren(children[child].children);
        }
      });
    }

    addChildren(layout.children);

    tree.load(items);
  };

  const redraw = (parent, id, props) => {
    let arr = bufferRef.current;
    let child = getChild({
      layoutTree: layoutTreeRef.current,
      parent,
      id,
      props,
    });
    if (child) {
      arr.push({ parent, id, child });
      bufferRef.current = arr;
    }
  };

  const handleBuffer = () => {
    let { width, height } = sizeRef.current;
    if (bufferRef.current.length > 0) {
      layoutWorkerRef.current.postMessage({
        operation: 'updateLayout',
        args: { buffer: bufferRef.current, width, height },
      });
      bufferRef.current = [];
    }
    requestAnimationFrame(handleBuffer);
  };

  const addEvent = (id, props) => {
    Object.keys(props).forEach(p => {
      if (p in eventMapRef.current) {
        eventMapRef.current[p][id] = props[p];
      }
    });
  };

  const removeEvent = (id, props) => {
    Object.keys(props).forEach(p => {
      if (p in eventMapRef.current) {
        delete eventMapRef.current[p][id];
      }
    });
  };

  const registerNode = (parent, id, props, getProps, type) => {
    const tree = treeRef.current;
    addToTree({ tree, parent, id, props, getProps, type });
    addEvent(id, props);
  };

  const unregisterNode = (parent, id, props) => {
    let targetPath = treeRef.current;
    removeFromTree({ targetPath, parent, id });
    removeEvent(id, props);
  };

  const handleMessage = event => {
    layoutTreeRef.current = event.data;
    updateRBush();
    drawWorkerRef.current.postMessage({
      operation: 'updateTree',
      args: { tree: layoutTreeRef.current },
    });
  };

  useEffect(() => {
    const { width, height } = size;

    layoutTreeRef.current = buildLayoutTree({ tree: treeRef.current });
    layoutWorkerRef.current = new layoutWorker();

    const tree = layoutTreeRef.current;
    layoutWorkerRef.current.addEventListener('message', handleMessage);
    layoutWorkerRef.current.postMessage({
      operation: 'initializeLayout',
      args: { tree, width: width, height: height },
    });

    const offscreen = canvasRef.current.transferControlToOffscreen();

    drawWorkerRef.current = new drawWorker();
    drawWorkerRef.current.postMessage(
      { operation: 'init', canvas: offscreen },
      [offscreen]
    );

    requestAnimationFrame(handleBuffer);
  }, []);

  useEffect(() => {
    const { width, height } = size;
    drawWorkerRef.current.postMessage({
      operation: 'resizeCanvas',
      args: { width, height, dpr: window.devicePixelRatio },
    });
    layoutWorkerRef.current.postMessage({
      operation: 'recalcLayout',
      args: { width: width, height: height },
    });
    sizeRef.current = size;
    dispatchEvent(size, 'onResize');
  }, [size]);

  return (
    <Provider
      value={{
        parent: 'CanvasRoot',
        registerNode: registerNode,
        redraw: redraw,
        unregisterNode: unregisterNode,
        getDimensions: getDimensions,
      }}
    >
      <div ref={containerRef} {...props}>
        <canvas
          ref={canvasRef}
          height={600}
          width={600}
          style={{ display: 'block', height: size.height, width: size.width }}
          onClick={e => {
            dispatchEvent(e, 'onClick');
          }}
          onMouseMove={e => {
            dispatchEvent(e, 'onMouseMove');
          }}
          onMouseDown={e => {
            dispatchEvent(e, 'onMouseDown');
          }}
          onMouseUp={e => {
            dispatchEvent(e, 'onMouseUp');
          }}
          onWheel={e => {
            dispatchEvent(e, 'onWheel');
          }}
        >
          {props.children || null}
        </canvas>
      </div>
    </Provider>
  );
}
