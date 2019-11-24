import View from './View';
import Text from './Text';
import React, {
  forwardRef,
  memo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';

const styles = {
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  scrollbar: {
    width: 10,
    top: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: '#00000025',
  },
  puck: {
    width: 10,
    height: 6,
    backgroundColor: '#00000050',
    position: 'absolute',
  },
};

export default memo(
  forwardRef(function ScrollView(props, ref) {
    let [pressed, setPressed] = useState(false);
    let [pressStart, setPressStart] = useState(0);
    let [y, setY] = useState(0);
    let [offset, setOffset] = useState(0);
    let [containerHeight, setContainerHeight] = useState(0);
    let contentRef = useRef();
    let containerRef = useRef();
    let pressedRef = useRef(false);
    let offsetRef = useRef(0);

    const handleMouseDown = e => {
      setPressed(true);
      pressedRef.current = true;
      setPressStart(e.clientY);
    };

    const handleMouseUp = () => {
      pressedRef.current = false;
      setPressed(false);
    };

    const handleMove = e => {
      if (pressedRef.current) {
        setY(y => {
          let newY = y - e.movementY;
          if (newY < offsetRef.current * -1) {
            newY = offsetRef.current * -1;
          }
          if (newY > 0) {
            newY = 0;
          }
          return newY;
        });
      }
    };

    const handleWheel = e => {
      let containerDimensions = containerRef.current.getDimensions();
      let contentDimensions = contentRef.current.getDimensions();
      let heightOffset = 0;
      if (containerDimensions && contentDimensions) {
        let contentHeight = contentDimensions.height;
        let containerHeight = containerDimensions.height;
        setContainerHeight(containerHeight);
        heightOffset = contentHeight - containerHeight;
        setOffset(contentHeight - containerHeight);
        offsetRef.current = heightOffset;
      }

      setY(y => {
        if (heightOffset <= 0) {
          return 0;
        }
        let newY = y + e.deltaY;
        if (newY < heightOffset * -1) {
          newY = heightOffset * -1;
        }
        if (newY > 0) {
          newY = 0;
        }
        return newY;
      });
    };

    const handleResize = size => {
      let containerDimensions = containerRef.current.getDimensions();
      let containerHeight = containerDimensions.height;
      setContainerHeight(containerHeight);
      let contentDimensions = contentRef.current.getDimensions();
      if (containerDimensions && contentDimensions) {
        let contentHeight = contentDimensions.height;
        setOffset(contentHeight - containerHeight);
      }
    };

    useEffect(() => {
      let containerDimensions = containerRef.current.getDimensions();
      let containerHeight = containerDimensions
        ? containerDimensions.height
        : 10;
      setContainerHeight(containerHeight);
    });

    const puckHeight =
      containerHeight - containerHeight * (offset / containerHeight);
    const puckTop = y * -1;

    return (
      <View
        ref={containerRef}
        style={{ ...styles.container, ...(props.style || {}) }}
        onWheel={handleWheel}
        onResize={handleResize}
        onMouseMove={handleMove}
        onMouseUp={handleMouseUp}
      >
        <View
          ref={contentRef}
          style={{
            ...styles.contentContainer,
            ...(props.contentContainerStyle || {}),
            top: y,
          }}
        >
          {props.children}
        </View>

        {/* <View style={styles.scrollbar}>
          <View
            style={{
              ...styles.puck,
              height: puckHeight,
              top: puckTop,
              backgroundColor: pressed ? '#00000075' : '#00000050',
            }}
            onMouseDown={handleMouseDown}
          />
        </View> */}
      </View>
    );
  })
);
