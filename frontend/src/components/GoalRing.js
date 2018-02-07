import React from 'react';
import { VictoryPie, VictoryLabel } from 'victory';
import * as PropTypes from 'prop-types';


export default class GoalRing extends React.Component {

    /*constructor(props) {
     super();

     this.state = { // Set default state values for the visualisation
     dataType = "Default",
     colour = "red",
     data = []
     }
     }
     */



    render() {
      const styles = this.getStyles()
        return (
          <div className="dash__component">
            <VictoryLabel x={5} y={24} style={ styles.title }
              text={ this.props.title }
            />
            <VictoryPie
                innerRadius={50}
                width={250} height={250}
                style={{ labels: { fontSize: 10} }}
                colorScale={["#4ec244", "#bfbfbf"]}

                events={[{
                    target: "data",
                }]}
                data={ this.props.data }
            />
          </div>
        )
    }

    getStyles() {
      const BLUE_COLOR = "#76bbf1";
      const RED_COLOR = "#ec5229";
      const YELLOW_COLOR = "#fcee5f";
      const GREEN_COLOR = "#69da60";

      return {
        title: {
          //marginLeft: "-50%",
          float: "left" ,
          marginBottom: "-10%",
          fill: "#000000",
          fontFamily: "Avenir",
          fontSize: "18px",
        },
        labelNumber: {
          textAnchor: "middle",
          fill: "#ffffff",
          fontFamily: "inherit",
          fontSize: "14px"
        },

        // INDEPENDENT AXIS
        axisYears: {
          axis: { stroke: "black", strokeWidth: 1},
          ticks: {
            size: (tick) => {
              const tickSize =
              tick.getFullYear() % 5 === 0 ? 10 : 5;
              return tickSize;
            },
            stroke: "black",
            strokeWidth: 1
          },
          tickLabels: {
            fill: "black",
            fontFamily: "inherit",
            fontSize: 16
          }
        },

        // DATA SET ONE
        axisOne: {
          grid: {
            stroke: (tick) =>
            tick === -10 ? "transparent" : "#ffffff",
            strokeWidth: 2
          },
          axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
          ticks: { strokeWidth: 0 },
          tickLabels: {
            fill: BLUE_COLOR,
            fontFamily: "inherit",
            fontSize: 16
          }
        },
        labelOne: {
          fill: BLUE_COLOR,
          fontFamily: "inherit",
          fontSize: 12,
          fontStyle: "italic"
        },
        lineOne: {
          data: { stroke: BLUE_COLOR, strokeWidth: 4.5, fill: BLUE_COLOR }
        },
        axisOneCustomLabel: {
          fill: BLUE_COLOR,
          fontFamily: "inherit",
          fontWeight: 300,
          fontSize: 21
        },
      };
    }
}


GoalRing.propTypes = {
    data: PropTypes.array, // whatever `this.state.videos` is
    title: PropTypes.any
};
