import React, { useEffect, useState } from 'react';
import { CanvasRoot, View, Text } from './primitives';

let view1 = {
  flex: 1,
  padding: 50,
  flexDirection: 'row',
  backgroundColor: 'mediumspringgreen',
};

let view3 = {
  flex: 1,
  backgroundColor: 'rebeccapurple',
};

export default function App() {
  let [color, toggleColor] = useState('tomato');
  useEffect(() => {
    let int = setInterval(() => {
      toggleColor(color => (color === 'tomato' ? 'purple' : 'tomato'));
    }, 500);

    return () => {
      clearInterval(int);
    };
  }, []);

  return (
    <CanvasRoot>
      <View style={view1}>
        {color === 'tomato' ? (
          <>
            <View style={view3} />
            <View style={{ flex: 1, backgroundColor: 'red' }} />
          </>
        ) : (
          <>
            <View style={{ flex: 1, backgroundColor: 'red' }} />
            <View style={view3} />
          </>
        )}
      </View>
    </CanvasRoot>
  );
}
