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
  flex: 1,
  borderColor: '#ffcc00',
  borderWidth: 10,
  padding: 20,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rebeccapurple',
};

let text = {
  fontFamily: 'Tahoma',
  fontSize: 16,
  lineHeight: 24,
  fontStyle: 'normal',
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
            from={{ width: toggled ? 200 : 400 }}
            to={{ width: toggled ? 400 : 200 }}>
            {props => (
              <View style={{ ...view3, width: props.width }}>
                <Text style={text}>The quick brown fox jumped over the log. The quick brown fox jumped over the log.</Text>
              </View>
            )}
          </Spring>
        </View>
        <View style={{ flex: 1, backgroundColor: 'plum' }} />
      </View>
    </CanvasRoot>
  );
}
