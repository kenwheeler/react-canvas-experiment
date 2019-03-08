import React, { useContext, useEffect, useRef, memo } from 'react';
import CanvasContext from './Context';
const { Provider } = CanvasContext;

var ID = function () {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

export default memo(function View(props) {
  const hasDrawn = useRef(false);
  const idRef = useRef(ID());
  const propsCache = useRef(props);
  const context = useContext(CanvasContext);
  const childContext = {
    parent: context.parent + '|' + idRef.current,
    registerNode: context.registerNode,
    redraw: context.redraw,
    unregisterNode: context.unregisterNode,
  };

  if (!context) {
    throw new Error(
      'CanvasRoot not found! View primitives are required to be inside of a CanvasRoot.'
    );
  }

  const getProps = () => {
    return propsCache.current;
  };

  useEffect(() => {
    context.registerNode(
      context.parent,
      idRef.current,
      props,
      getProps,
      'View'
    );
    setTimeout(() => {
      hasDrawn.current = true;
    }, 0);
    return () => {
      context.unregisterNode(context.parent, idRef.current);
    };
  }, []);

  useEffect(() => {
    propsCache.current = props;
    if (hasDrawn.current === true) {
      context.redraw(context.parent, idRef.current, { style: props.style });
    }
  }, [props.style, props.children]);

  return <Provider value={childContext}>{props.children || null}</Provider>;
});
