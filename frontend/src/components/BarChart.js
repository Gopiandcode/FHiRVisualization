import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

class BarChart extends React.Component {
  render () {
    return (
      <div>
        <h3>Click Me</h3>
        <VictoryBar
          style={{
            data: { fill: "#c43a31" }
          }}
          events={[{
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [{
                  target: "data",
                  mutation: (props) => {
                    const fill = props.style && props.style.fill;
                    return fill === "black" ? null : { style: { fill: "black" } };
                  }
                },
                {
                  target: "labels",
                  mutation: (props) => {
                    return props.text ? null : { text: "clicked" };
                  }
                }];
              }
            }
          }]}
        data={sampleData}
        />
      </div>
    )
  }
}
