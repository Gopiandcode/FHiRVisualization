import React from 'react';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryLabel } from 'victory';
import * as PropTypes from 'prop-types';


export default class BarChart extends React.Component {
    constructor(props) {
        super();
    }

    render() {
      const styles = this.getStyles()
        return (
            <div className="dash__component">
              <VictoryLabel x={5} y={24} style={ styles.title }
                text={ this.props.title }
              />
                <VictoryBar
                    style={{
                        data: {fill: "#4ec244"}
                    }}
                    barRatio={0.9}
                    cornerRadius={2}
                    events={[{
                        target: "data",
                        /*
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: "data",
                                    mutation: (props) => {
                                        const fill = props.style && props.style.fill;
                                        return fill === "black" ? null : {style: {fill: "#e9602d"}};
                                    }

                                },
                                    {
                                        target: "labels",
                                        mutation: (props) => {
                                            return props.text ? null : {text: "clicked"};
                                        }
                                    }];
                            }
                        }
                        */
                    }]}
                    data={this.props.data}
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
          //textAnchor: "start",
          //marginLeft: "-20px",
          //verticalAnchor: "end",
          //marginLeft: "-70%",
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

        // DATA SET TWO
        axisTwo: {
          axis: { stroke: RED_COLOR, strokeWidth: 0 },
          tickLabels: {
            fill: RED_COLOR,
            fontFamily: "inherit",
            fontSize: 16
          }
        },
        labelTwo: {
          textAnchor: "end",
          fill: RED_COLOR,
          fontFamily: "inherit",
          fontSize: 12,
          fontStyle: "italic"
        },
        lineTwo: {
          data: { stroke: RED_COLOR, strokeWidth: 4.5 }
        },

        // HORIZONTAL LINE
        lineThree: {
          data: { stroke: "#e95f46", strokeWidth: 2 }
        }
      };
    }
}

BarChart.propTypes = {
    data: PropTypes.array, // whatever `this.state.videos` is
    title: PropTypes.any
};
