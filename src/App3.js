import React, { useEffect, useState } from 'react';
import { CanvasRoot, View, Text } from './primitives';

let view1 = {
  flex: 0,
  padding: 50,
  width: 800,
  flexDirection: 'row',
  flexWrap: 'wrap',
  backgroundColor: 'mediumspringgreen',
};

let items = Array.from(new Array(1000));

items = items.map(i => ({
  color: getRandomColor()
}))

const randomizeColors = (a) => {
  return a.map(i => ({
    color: getRandomColor()
  }));
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function App() {
  let [state, setState] = useState(items);

  useEffect(() => {
    let interval = setInterval(() => {
      setState(state => randomizeColors(state));
    }, 100);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <CanvasRoot style={{ height: '100%', width: '100%' }}>
      <View style={view1}>
        {state.map((i, index) => {
          return <View key={index} style={{ flex: 0, flexWrap: 'wrap', height: 20, width: 20, backgroundColor: i.color }} />
        })}
      </View>
    </CanvasRoot>
  );
}
