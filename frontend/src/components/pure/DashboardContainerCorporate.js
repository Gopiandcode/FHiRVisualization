import React from 'react';
import ReactDOM from 'react-dom';
import Donut from "../Donut"; //Will change this to a folder of visualisation components
import BarChart from "../BarChart";
import GroupBarChart from "../GroupBarChart";
import LineGraph from "../LineGraph";
import BrushLineGraph from "../BrushLineGraph";

import * as PropTypes from 'prop-types';

const colourMap = {
    red: '#ec5229',
    green: '#69da60',
    blue: '#76bbf1',
    yellow: '#fcee5f'
};


export default class CorporateDashboardGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: {}, colour: {}, loadedValues: 0};
        this.loadData = this.loadData.bind(this);
        this.checkVisType = this.checkVisType.bind(this);
        this.renderVisualization = this.renderVisualization.bind(this);
        this.withDataReady = this.withDataReady.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    /*
     This function tests whether the data for a given data type has loaded
     */
    withDataReady(preference) {
        // first, no matter what, the main dataType must be present.
        return this.state.data[preference.mainDataType] &&
            (
                // if that condition is met, either
                (
                    // the secondary dataType is not present but state.data[mainDataType].self is present
                    (!preference.secondaryDataType && this.state.data[preference.mainDataType]['self']))
                ||
                // or state.data[mainDataType][secondaryDataType] is present
                (this.state.data[preference.mainDataType][preference.secondaryDataType])
            );
    }

    /*
     Iterates over this.props.preferences and loads data for each type - also queues a promise to format and place the data into state
     as soon as the data is loaded.
     */
    loadData() {
        // loop over preferences
        for (let i = 0; i < this.props.preferences.length; i++) {
            let preference = this.props.preferences[i];
            console.log("current preference: " + JSON.stringify(preference));

            if (preference.secondaryDataType) {
                this.props.loadData(preference.mainDataType, preference.secondaryDataType)
                    .then(() => {
                        let formattedData = this.formatDataForTwo(preference.mainDataType, preference.secondaryDataType);

                        // for logging only - the following line could be removed.
                        // console.log("FORMATTED DATA FOR 2 (AFTER RETURN): " + JSON.stringify(formattedData));
                    });
            }
            else {
                this.props.loadData(preference.mainDataType).then(() => {
                    let formattedData = this.formatDataForOne(preference.mainDataType);

                    // for logging only - the following line could be removed.
                    // console.log("FORMATTED DATA FOR 2 (AFTER RETURN): " + JSON.stringify(formattedData));
                });
            }
        }
    }

    /*
     Given a two data types, will take data from this.props.data and process it before storing in this.state
     also return the values - this is for logging purposes only - do not abuse it for functionality
     */
    formatDataForTwo(mainDataType, secondaryDataType) {
        // console.log("FORMAT DATA FOR 2: " + JSON.stringify(this.props.data[mainDataType][secondaryDataType]));

        // map over values and format into intermediate representation
        let values = this.props.data[mainDataType][secondaryDataType].map((xy) => {
            return ( {x: xy.valueA, y: xy.valueB} );
        });
        // console.log("FORMATTED DATA FOR 2 (BEFORE RETURN): " + JSON.stringify(values));

        // Mutation-free (no inplace changes) way of updating this.state.data
        if (values.length > 0) {
            let data = Object.assign({}, this.state.data);
            let count = this.state.loadedValues;
            data[mainDataType] = data[mainDataType] || {};
            data[mainDataType][secondaryDataType] = values;
            this.setState({data, loadedValues: count + 1});
        }

        // not necassary, but if you want to log it
        return values;
    }

    /*
     Given a data type, will take data from this.props.data and process it before storing in this.state
     also return the values - this is for logging purposes only - do not abuse it for functionality
     */
    formatDataForOne(mainDataType) {
        // console.log("FORMAT DATA FOR 1: " + JSON.stringify(this.props.data[mainDataType].self));

        // map over values and format into intermediate representation
        let values = this.props.data[mainDataType].self.map((value, index) => {
            return ( {x: index, y: value.value} );
        });
        // console.log("FORMATTED DATA FOR 1 (BEFORE RETURN): " + JSON.stringify(values));

        // Mutation-free (no inplace changes) way of updating this.state.data
        if (values.length > 0) {
            let data = Object.assign({}, this.state.data);
            data[mainDataType] = data[mainDataType] || {};
            data[mainDataType]['self'] = values;
            let count = this.state.loadedValues;

            this.setState({data, loadedValues: count + 1});
        }

        // not necassary, but if you want to log it
        return values;
    }


    // given a list of visualizations, returns a number in the range 0 - 4 to indicate what type of visualization it is.
    checkVisType(vis) { // Ammendable visualisation checker
        if (vis.visualization.includes("BarChart")) {
            return 1;
        }
        else if (vis.visualization.includes("LineGraph")) {
            return 2;
        }
        else if (vis.visualization.includes("Doughnut")) {
            return 3;
        }
        else if (vis.visualization.includes("GroupBarChart")) {
            return 4;
        }
        return 0;
    }

    // Load the data from Props
    // loadData(dataType) {
    //     const sampleBarChartWeekly1 = [{x: "Monday", y: (Math.random() * 400), label: "Monday"},
    //         {x: "Tuesday", y: (Math.random() * 400), label: "Tuesday"},
    //         {x: "Wednesday", y: (Math.random() * 400), label: "Wednesday"},
    //         {x: "Thursday", y: (Math.random() * 400), label: "Thursday"},
    //         {x: "Friday", y: (Math.random() * 400), label: "Friday"},
    //         {x: "Saturday", y: (Math.random() * 400), label: "Saturday"},
    //         {x: "Sunday", y: (Math.random() * 400), label: "Sunday"}
    //     ];
    //
    //     var mock = Object.assign({}, this.state);
    //     mock.data = mock.data || {};
    //     mock.data[dataType] = mock.data[dataType] || {};
    //     mock.data[dataType] = sampleBarChartWeekly1;
    //
    //     this.setState(mock);
    // }

    /*
     Constructs a visualization out of a preference
     */
    renderVisualization(preference, index) {
        let dataType = preference.mainDataType;
        let secondaryDataType = preference.secondaryDataType;
        let colour = preference.colour;

        switch (this.checkVisType(preference)) {
            case 1:
                return (<BarChart key={dataType + index} className="dash__component"
                                  data={ this.state.data[dataType]['self'] }
                                  title={ dataType } colour={ colourMap[colour] }/>);
                break;
            case 2:
                return (<BrushLineGraph key={dataType + index} className="dash__component"
                                        data={ this.state.data[dataType][secondaryDataType] }
                                        title={ dataType } colour={ colourMap[colour] }/>);
                break;
            case 3:
                return (
                    <Donut key={dataType + index} className="dash__component" data={ this.state.data[dataType]['self'] }
                           title={ dataType } colour={ colourMap[colour] }/>);
                break;
            case 4:
                return (<GroupBarChart key={dataType + index} className="dash__component"
                                       data={ this.state.data[dataType]['self'] }
                                       title={ dataType } colour={ colourMap[colour] }/>);
                break;
            default:
                console.log("Unkown Data visualisation");
                break;
        }
    }


    render() {
        return (
            <div className="dash__container">
                {
                    this.state.loadedValues > 0 &&
                    // if we have preferences
                    this.props.preferences &&
                    // select the preferences where data has loaded
                    this.props.preferences.filter(this.withDataReady)
                    // and render them
                        .map(this.renderVisualization)
                }
            </div>
        )
    }
}

CorporateDashboardGrid.propTypes = {
    preferences: PropTypes.array,
    data: PropTypes.object,
    loadData: PropTypes.func,
};
