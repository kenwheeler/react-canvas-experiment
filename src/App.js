import React, { useEffect, useState } from 'react';
import { CanvasRoot, View, Text } from './primitives';
import { Spring } from 'react-spring/renderprops'

let view1 = {
  flex: 1,
  padding: 50,
  flexDirection: 'row',
  backgroundColor: 'mediumspringgreen',
};

let view3 = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rebeccapurple',
};

export default function App() {
  let [toggled, setToggled] = useState(false);

  const handleClick = () => {
    setToggled(toggled => !toggled);
  }

  return (
    <CanvasRoot style={{ height: '100%', width: '100%' }} onClick={handleClick}>
      <View style={view1}>
        <Spring
          from={{ height: toggled ? 100 : 500 }}
          to={{ height: toggled ? 500 : 100 }}>
          {props => (
            <View style={{ ...view3, height: props.height }}>
              <Text>Check me out, test 123</Text>
            </View>
          )}
        </Spring>

        <View style={{ flex: 1, backgroundColor: 'yellow' }} />
      </View>
    </CanvasRoot>
  );
}
