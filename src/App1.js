import React, { useState, useRef, useEffect } from 'react';
import { CanvasRoot, View, Text } from './primitives';
import { Spring } from 'react-spring/renderprops';

let view1 = {
  flex: 1,
  padding: 50,
  flexDirection: 'row',
  backgroundColor: 'mediumspringgreen',
};

let view2 = {
  flex: 1,
  backgroundColor: 'tomato',
  borderColor: '#ffcc00',
  borderWidth: 10,
  padding: 40,
  overflow: 'hidden',
};

let view3 = {
  flex: 1,
  borderColor: '#ffcc00',
  borderWidth: 10,
  padding: 20,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rebeccapurple',
  overflow: 'hidden',
};

let text = {
  fontFamily: 'Tahoma',
  fontSize: 16,
  lineHeight: 24,
  fontStyle: 'normal',
  color: 'white',
};

function Hoverable(props) {
  let viewRef = useRef();
  let [hovered, setHovered] = useState(false);

  useEffect(() => {
    console.log(viewRef.current.getDimensions());
  });

  return (
    <View
      ref={viewRef}
      style={{ flex: 1, backgroundColor: hovered ? 'plum' : 'orange' }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    />
  );
}

export default function App() {
  let [toggled, setToggled] = useState(false);

  const handleClick = () => {
    setToggled(toggled => !toggled);
  };

  return (
    <CanvasRoot style={{ height: '100%', width: '100%' }}>
      <View style={view1}>
        <View style={view2}>
          <Spring
            from={{ width: toggled ? 200 : 400 }}
            to={{ width: toggled ? 400 : 200 }}
          >
            {props => (
              <View
                style={{ ...view3, width: props.width }}
                onClick={handleClick}
              >
                <Text style={text}>
                  The quick brown fox jumped over the log. The quick brown fox
                  jumped over the log.
                </Text>
              </View>
            )}
          </Spring>
        </View>
        <Hoverable />
      </View>
    </CanvasRoot>
  );
}
