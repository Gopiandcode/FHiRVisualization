import React from 'react';
import { VictoryArea, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';
import * as PropTypes from 'prop-types';


export default class LineGraph extends React.Component {
    constructor(props) {
        super();
    }

    render() {
      const styles = this.getStyles()
        return (
          <div className="dash__component">
            <VictoryLabel x={5} y={24} style={ styles.title }
              text= { this.props.title }
            />
            <VictoryChart
                theme={ VictoryTheme.material }
            >
                <VictoryArea
                    style={{
                        data: {stroke: "#c43a31"},
                        parent: {border: "1px solid #ccc"}
                    }}
                    data={ this.state.data }
                />
            </VictoryChart>
          </div>
        )
    }
}

LineGraph.propTypes = {
    data: PropTypes.array, // whatever `this.state.videos` is
    title: PropTypes.any
};
