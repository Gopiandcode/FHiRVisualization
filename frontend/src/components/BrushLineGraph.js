import React from 'react';
import { VictoryArea, VictoryGraph, VictoryBrushContainer, VictoryLine, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';

import * as PropTypes from 'prop-types';


export default class BrushLineGraph extends React.Component {
    constructor(props) {
        super();
    }

    /*
     onLoad(endPoint, dataType) {
     this.setState((endPoint, dataType) => {
     return {
     dataType = dataType,
     data = endPoint
     }
     });
     }


     componentDidMount() {
     //Call loading Data function here.
     this.onLoad();
     }
     */

    render() {
      const styles = this.getStyles();
        return (
          <div className="dash__component">
            <VictoryLabel x={5} y={24} style={ styles.title }
              text={ this.props.title }
            />
            <VictoryChart
                style={ styles.axisOne }
                //theme={ VictoryTheme.material }
                /*containerComponent={
                    <VictoryBrushContainer
                        brushDimension="x"
                        brushDomain={{x: [0.1, 0.3]}}
                    />
                }
                */
            >
                <VictoryArea
                    data={ this.props.data }
                    style={ styles.lineOne }
                />
            </VictoryChart>
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
        //marginLeft: "-45%",
        float: "left",
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

BrushLineGraph.propTypes = {
    data: PropTypes.array, // whatever `this.state.videos` is
    title: PropTypes.title
};
