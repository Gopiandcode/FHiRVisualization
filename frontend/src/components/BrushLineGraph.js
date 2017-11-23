import React from 'react';
import { VictoryGraph, } from 'victory';

class BrushLineGraph extends React.Component {
  render() {
    return (
      <VictoryChart
        theme={ VictoryTheme.material }
        containerComponent={
          <VictoryBrushContainer
            brushDimension="x"
            brushDomain={{ x: [0.1, 0.3] }}
          />
        }
      >
      <VictoryLine
      data={[
        { x: 1, y: 5 },
        { x: 2, y: 3 },
        { x: 3, y: 2 },
        { x: 4, y: 4 },
        { x: 5, y: 9 }
      ]}

      />
      </VictoryChart>
    )
  }
}
