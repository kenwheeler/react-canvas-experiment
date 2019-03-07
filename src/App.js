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
  return (
    <CanvasRoot style={{ height: '100%', width: '100%' }}>
      <View style={view1}>
        <View style={view3} />
        <View style={{ flex: 1, backgroundColor: 'red' }} />
      </View>
    </CanvasRoot>
  );
}
