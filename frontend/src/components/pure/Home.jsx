import React, { Component } from "react";
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory';
import './styles/Home.scss';
import {Link} from "react-router";

export default class Home extends Component {
    render() {
        return (
            <div id="home-container">
                <div id="home-content">
                    <h2>Home</h2>
                    <p>FHiR Visualization Home Page</p>
                    <p>Here are your activity logs for today</p>
                    <h3>Steps Overview</h3>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine
                            style={{
                                padding: "0px"
                            }}
                            data={[
                                { x: 1, y: 2 },
                                { x: 2, y: 3 },
                                { x: 3, y: 5 },
                                { x: 4, y: 4 },
                                { x: 5, y: 7 }
                            ]}>
                        </VictoryLine>
                    </VictoryChart>
                </div>
            </div>
        );
    }
}