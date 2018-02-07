import React from 'react';
import {VictoryBar, VictoryChart, VictoryGroup} from 'victory';
import * as PropTypes from 'prop-types';


export default class GroupBarChart extends React.Component {
    constructor(props) {
        super();
    }

    /*
     componentDidMount() {
     //Call loading Data function here.
     this.onLoad();
     }
     */

    render() {
        return (
            <VictoryChart>
                <VictoryGroup offset={20}
                              colorScale={["tomato", "orange", "gold"]}
                >
                    <VictoryBar
                        data={ this.state.data[0] }
                    />
                    <VictoryBar
                        data={ this.state.data[1] }
                    />
                    <VictoryBar
                        data={ this.state.data[2] }
                    />
                </VictoryGroup>
            </VictoryChart>
        )
    }
}

GroupBarChart.propTypes = {
    data: PropTypes.array // whatever `this.state.videos` is
};
