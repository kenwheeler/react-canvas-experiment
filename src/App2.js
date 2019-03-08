import React, { useEffect, useState } from 'react';
import { CanvasRoot, View, Text } from './primitives';

import data from './data.json';

const table = {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: 'black'
};

const tableRow = {
  flex: 0,
  flexDirection: 'row',
  width: '100%',
  backgroundColor: '#222',
};

const tableColumn = {
  flex: 1,
  height: 20,
  padding: 5,
  backgroundColor: '#333'
};

const randomize = (data) => {
  let newData = { ...data };

  newData.datatable.data.forEach(d => {
    let precision = 100;
    d[3] = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);
    d[4] = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);
  });

  return newData;
}

export default function App() {
  const [state, setState] = useState(data);

  useEffect(() => {
    let interval = setInterval(() => {
      setState(state => randomize(state))
    }, 50);

    return () => {
      clearInterval(interval);
    }
  }, [])

  function renderHeader() {
    return (
      <View style={tableRow}>
        {state.datatable.columns.map(c => {
          return (
            <View style={tableColumn} key={c.name}>
              <Text>{c.name}</Text>
            </View>
          )
        })
        }
      </View>
    );
  }

  function renderData() {
    return (
      <>
        {state.datatable.data.map(row => {
          return (<View style={tableRow} key={row[0]}>
            {row.map((col, index) => {
              return (
                <View style={tableColumn} key={index}>
                  <Text>{col.toString()}</Text>
                </View>
              )
            })}
          </View>);
        })
        }
      </>
    );
  }
  return (
    <CanvasRoot style={{ height: '100%', width: '100%' }}>
      <View style={table}>
        {renderHeader()}
        {renderData()}
      </View>
    </CanvasRoot>
  );
}
