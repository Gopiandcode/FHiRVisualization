import React from 'react';
import { VictoryPie } from 'victory';

/*
<div>
  <Donut/>
</div>
*/

class Donut extends React.Component {

  const sampleData = [{ x: "Cats", y: 35 },
      { x: "Dogs", y: 40 },
      { x: "Birds", y: 55 }];

  componentDidMount() {
    console.log('hey');
  }

  render() {
    return (
      <VictoryPie
      innerRadius={90}
      colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}

      events={[{
          target: "data",
          eventHandlers: {
            onClick: () => {
              return [
                {
                  target: "data",
                  mutation: (props) => {
                    const fill = props.style && props.style.fill;
                    return fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
                  }
                }, {
                  target: "labels",
                  mutation: (props) => {
                    return props.text === "clicked" ? null : { text: "clicked" };
                  }
                }
              ];
            }
          }
        }]}
      data={sampleData}
    />
    )
  }
}
