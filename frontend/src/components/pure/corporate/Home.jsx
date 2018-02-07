import React, {Component} from "react";
import {VictoryLine, VictoryChart, VictoryTheme} from 'victory';
import '../styles/Home.scss';
import moment from 'moment';
import * as propTypes from 'prop-types';

const elem = (text) => (
    <div style={{
        backgroundColor: 'red',
        width: 100,
        height: 100
    }}>
        {text}
    </div>
);

export default class Home extends Component {
    componentDidMount() {
        this.props.manualLoadPreferences();
    }
    render() {
        return (
            <div id="home-container">
                <div id="home-content">
                    <h2>Home</h2>
                    <h4>{moment().format("ddd D MMMM")}</h4>
                    {elem()}
                    {elem()}
                    {elem()}
                    {
                        this.props.preferences.map(preference => {
                            return elem(preference.mainDataType + " " + preference.secondaryDataType + " " + preference.colour);
                        })
                    }
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    preferences: propTypes.array,
    data: propTypes.object,
    manualLoadPreferences: propTypes.func,
    manualLoadData: propTypes.func
};

