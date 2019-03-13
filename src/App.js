import React, { useState, useRef, useEffect } from 'react';
import { CanvasRoot, View, Text, ScrollView } from './primitives';
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

let text = {
  fontFamily: 'Tahoma',
  fontSize: 16,
  lineHeight: 24,
  fontStyle: 'normal',
  color: 'white',
};

export default function App() {
  return (
    <CanvasRoot style={{ height: '100%', width: '100%' }}>
      <View style={view1}>
        <View style={view2}>
          <ScrollView
            style={{ backgroundColor: 'white' }}
            contentContainerStyle={{ padding: 20 }}
          >
            <Text>
              New Jersey is a state in the Mid-Atlantic region of the
              Northeastern United States. It is a peninsula, bordered on the
              north and east by the state of New York, particularly along the
              extent of the length of New York City on its western edge; on the
              east, southeast, and south by the Atlantic Ocean; on the west by
              the Delaware River and Pennsylvania; and on the southwest by the
              Delaware Bay and Delaware. New Jersey is the fourth-smallest state
              by area but the 11th-most populous, with 9 million residents as of
              2017,[19] and the most densely populated of the 50 U.S. states;
              its biggest city is Newark. New Jersey lies completely within the
              combined statistical areas of New York City and Philadelphia and
              was the second-wealthiest U.S. state by median household income as
              of 2017.[20] New Jersey is a state in the Mid-Atlantic region of
              the Northeastern United States. It is a peninsula, bordered on the
              north and east by the state of New York, particularly along the
              extent of the length of New York City on its western edge; on the
              east, southeast, and south by the Atlantic Ocean; on the west by
              the Delaware River and Pennsylvania; and on the southwest by the
              Delaware Bay and Delaware.
            </Text>
          </ScrollView>
        </View>
      </View>
    </CanvasRoot>
  );
}
