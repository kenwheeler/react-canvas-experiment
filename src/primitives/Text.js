import { useContext, useEffect, useRef, memo } from 'react';
import CanvasContext from './Context';

var ID = function () {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

export default memo(function Text(props) {
  const hasDrawn = useRef(false);
  const idRef = useRef(ID());
  const propsCache = useRef(props);
  const context = useContext(CanvasContext);

  if (!context) {
    throw new Error(
      'CanvasRoot not found! View primitives are required to be inside of a CanvasRoot.'
    );
  }

  if (typeof props.children !== 'string') {
    throw new Error('Text primitives require string based children');
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
      'Text'
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
      context.redraw(context.parent, idRef.current, { style: props.style, children: props.children });
    }
  }, [props]);

  return null;
});
