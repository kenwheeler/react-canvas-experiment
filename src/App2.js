import React, { useEffect, useState } from 'react';
import { CanvasRoot, View, Text } from './primitives';

import data from './data.json';

const table = {
  flex: 0,
  flexDirection: 'column',
  backgroundColor: 'black',
};

const tableRow = {
  flex: 0,
  flexDirection: 'row',
  width: '100%',
  backgroundColor: '#111',
};

const tableHeader = {
  ...tableRow,
  backgroundColor: '#222',
};

const tableColumn = {
  flex: 1,
  padding: 3,
  borderWidth: 0.5,
  borderColor: 'black',
  backgroundColor: '#111',
};

const tableHeaderColumn = {
  ...tableColumn,
  backgroundColor: '#222',
};

const text = {
  fontFamily: 'Tahoma',
  color: 'white',
  fontSize: '12',
};

function HighlightCell(props) {
  let [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    setHighlighted(true);
    setTimeout(() => {
      setHighlighted(false);
    }, 1000);
  }, [props.value]);

  return (
    <View
      style={{
        ...tableColumn,
        backgroundColor: highlighted ? '#aaaa33' : null,
      }}
    >
      <Text style={{ ...text }}>{props.value.toString()}</Text>
    </View>
  );
}

const randomize = data => {
  let newData = { ...data };

  let randomIndex =
    Math.floor(Math.random() * newData.datatable.data.length) + 1;
  let precision = 100;
  newData.datatable.data[randomIndex - 1][3] =
    Math.floor(
      Math.random() * (10 * precision - 1 * precision) + 1 * precision
    ) /
    (1 * precision);

  return newData;
};

export default function App() {
  const [state, setState] = useState(data);

  useEffect(() => {
    let interval = setInterval(() => {
      setState(state => randomize(state));
    }, 600);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function renderHeader() {
    return (
      <View style={tableHeader}>
        {state.datatable.columns.map(c => {
          return (
            <View style={tableHeaderColumn} key={c.name}>
              <Text style={text}>{c.name}</Text>
            </View>
          );
        })}
      </View>
    );
  }

  function renderData() {
    return (
      <>
        {state.datatable.data.map(row => {
          return (
            <View style={tableRow} key={row[0]}>
              {row.map((col, index) => {
                return index === 3 ? (
                  <HighlightCell value={col} />
                ) : (
                  <View
                    style={{
                      ...tableColumn,
                      backgroundColor:
                        index === 4
                          ? col > 0
                            ? 'seagreen'
                            : 'tomato'
                          : undefined,
                    }}
                    key={index}
                  >
                    <Text style={text}>{col.toString()}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
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
