import React, { useEffect, useState } from 'react';
import { CanvasRoot, View, Text } from './primitives';
import { Spring } from 'react-spring/renderprops'

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
  padding: 40
}

let view3 = {
  flex: 0,
  borderColor: '#ffcc00',
  borderWidth: 10,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rebeccapurple',
};

let text = {
  fontFamily: 'Tahoma',
  fontSize: 16,
  fontStyle: 'bold',
  color: 'white'
}

export default function App() {
  let [toggled, setToggled] = useState(false);

  const handleClick = () => {
    setToggled(toggled => !toggled);
  }

  return (
    <CanvasRoot style={{ height: '100%', width: '100%' }} onClick={handleClick}>

      <View style={view1}>
        <View style={view2}>
          <Spring
            from={{ height: toggled ? 100 : 500 }}
            to={{ height: toggled ? 500 : 100 }}>
            {props => (
              <View style={{ ...view3, height: props.height }}>
                <Text style={text}>Check me out, test 123</Text>
              </View>
            )}
          </Spring>
        </View>
        <View style={{ flex: 1, backgroundColor: 'plum' }} />
      </View>
    </CanvasRoot>
  );
}
