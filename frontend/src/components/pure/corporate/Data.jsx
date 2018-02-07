import React, {Component} from "react";
import '../styles/Data.scss';
import * as propTypes from 'prop-types';

const elem = () => (
    <div style={{
        backgroundColor: 'red',
        width: 100,
        height: 100
    }}>
        Data
    </div>
);

export default class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: -1,
            selectedVisualization: "",
            selectedMainDataType: "",
            selectedSecondaryDataType: "",
            selectedColour: ""
        };

        /*
         {
         visualization: "",
         mainDataType: "",
         secondaryDataType: "",
         colour: ""
         }

         */

        this.generateDataTypeOption = this.generateDataTypeOption.bind(this);
        this.generateDataPanelFor = this.generateDataPanelFor.bind(this);
    }

    componentDidMount() {
        this.props.manualLoadPreferences();
        this.props.manualLoadVisualizations();
        this.props.manualLoadColours();
    }

    generateDataTypeOption(dataType, index) {
        return (<button key={index + dataType} onClick={(e) => {
            this.setState({currentIndex: index});
        }}>{dataType}</button>)
    }

    generateDataPanelFor(dataType) {

        return (
            <div key={dataType.name + dataType.dataType}>
                <h3>{dataType.name}</h3>
                {
                    this.props.preferences.filter((preference) => preference.mainDataType === dataType.dataType).map((preference, i) => (
                        <div key={preference.mainDataType + i}>
                            {this.props.visualizationMap[preference.visualization] ?
                                preference.visualization + " of " + preference.mainDataType + " with " + preference.secondaryDataType
                                :
                                preference.visualization + " of " + preference.mainDataType
                            }
                            <button onClick={(e) => {
                                this.props.manualRemovePreference(preference)
                            }}>Remove
                            </button>
                        </div>
                    ))
                }
                <h4>Colour</h4>
                {
                    this.props.colours.map((colour) => (
                        <div key={colour}>
                            {colour}
                            <input checked={this.state.selectedColour === colour} type="checkbox"
                                   onChange={(e) => this.setState({
                                       selectedColour: colour
                                   })}/>

                        </div>
                    ))
                }
                <h4>Data Type</h4>
                {Object.keys(this.props.visualizationMap).map((visualization, index) => (
                    <div key={visualization + index}>
                        {visualization}
                        <input checked={this.state.selectedVisualization === visualization} type="checkbox"
                               onChange={(e) => this.setState({
                                   selectedVisualization: visualization
                               })}/>
                    </div>
                ))}
                {
                    this.state.selectedVisualization !== "" &&
                    this.props.visualizationMap[this.state.selectedVisualization] &&
                    (
                        <div>
                            <h4>Secondary Data Type</h4>
                            {this.props.dataTypes.filter((dataType) => dataType.dataType !== dataType).map((dataType, index) => (
                                <div key={dataType.name + index}>
                                    {dataType.name}
                                    <input checked={this.state.selectedSecondaryDataType === dataType.dataType}
                                           type="checkbox"
                                           onChange={(e) => this.setState({
                                               selectedSecondaryDataType: dataType.dataType
                                           })}/>
                                </div>
                            ))}
                        </div>)}
                {
                    this.state.selectedVisualization !== "" &&
                    this.state.selectedColour !== "" &&
                    (!this.props.visualizationMap[this.state.selectedVisualization] ||
                    this.state.selectedSecondaryDataType !== "") &&

                    ((!this.props.visualizationMap[this.state.selectedVisualization] &&
                    !this.props.preferences.find((preference) =>
                    preference.mainDataType === dataType.dataType && preference.visualization === this.state.selectedVisualization)) ||
                    (this.props.visualizationMap[this.state.selectedVisualization] &&
                    !this.props.preferences.find((preference) =>
                    preference.mainDataType === dataType.dataType && preference.secondaryDataType === this.state.selectedSecondaryDataType && preference.visualization === this.state.selectedVisualization)) ) &&
                    <button onClick={e => {
                        this.props.manualCreatePreference({
                            visualization: this.state.selectedVisualization,
                            mainDataType: dataType.dataType,
                            secondaryDataType: this.state.selectedSecondaryDataType,
                            colour: this.state.selectedColour
                        })
                    }

                    }>Save Visualization</button>
                }

            </div>
        )
    }

    render() {
        return (
            <div id="data-container">
                <div id="data-content">
                    <h2>Data</h2>
                    <h4>Here is where you would be able to view all your data</h4>
                    {
                        this.props.dataTypes.map((dataType, index) => {
                            return this.generateDataTypeOption(dataType.name, index);
                        })
                    }
                    {
                        this.state.currentIndex >= 0 &&
                        (
                            this.generateDataPanelFor(this.props.dataTypes[this.state.currentIndex])
                        )
                    }
                </div>
            </div>
        );
    }
}
Data.propTypes = {
    manualLoadPreferences: propTypes.func.isRequired,
    manualLoadVisualizations: propTypes.func.isRequired,
    manualLoadColours: propTypes.func.isRequired,
    manualCreatePreference: propTypes.func.isRequired,
    manualUpdatePreference: propTypes.func.isRequired,
    manualRemovePreference: propTypes.func.isRequired,
    preferences: propTypes.array.isRequired,
    visualizationMap: propTypes.object.isRequired,
    dataTypes: propTypes.array.isRequired,
    colours: propTypes.array.isRequired,
    isWaiting: propTypes.bool.isRequired,
    hasErrored: propTypes.bool.isRequired,
    errorMsg: propTypes.string.isRequired
};