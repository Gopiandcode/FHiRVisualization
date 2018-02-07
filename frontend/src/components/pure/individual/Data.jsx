import React, {Component} from "react";
import '../styles/Data.scss';
import Dropdown from 'components/pure/utility/Dropdown';

import * as propTypes from "prop-types";

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
            currentIndex: -1
        };

        this.setCurrentItem = this.setCurrentItem.bind(this);
        this.createCheckBoxFor = this.createCheckBoxFor.bind(this);
        this.toggleVisualization = this.toggleVisualization.bind(this);
        this.createColourCheckboxFor = this.createColourCheckboxFor.bind(this);
        this.toggleColour = this.toggleColour.bind(this);
    }

    componentDidMount() {
        this.props.manualLoadPreferences().then(() => {
            this.setCurrentItem(this.props.preferences[0].dataType);
        });

        this.props.manualLoadColours();
    }

    setCurrentItem(dataType) {
        let i = 0;
        for (i = 0; i < this.props.preferences.length; i++) {
            if (this.props.preferences[i].dataType === dataType) break;
        }
        if (i === this.props.preferences.length) i = -1;

        if (!this.props.validVisualizations[this.props.preferences[i].dataType].hasLoaded || !this.props.validVisualizations[this.props.preferences[i].dataType].isLoading) {
            this.props.manualLoadVisualizationsFor(this.props.preferences[i].dataType);
        }
        this.setState({currentIndex: i});

    }

    createCheckBoxFor(visualization) {

        let isChecked = this.props.preferences[this.state.currentIndex].visualization.some(vis => vis === visualization);
        console.log("Clicked");

        return (<input
            type="checkbox"
            value={visualization}
            checked={isChecked}
            onChange={this.toggleVisualization.bind(this, visualization)}/>);

    }

    createColourCheckboxFor(colour) {
        let isChecked = this.props.preferences[this.state.currentIndex].colour === colour;
        return (
            <input
                type="checkbox"
                value={colour}
                checked={isChecked}
                onChange={this.toggleColour.bind(this, colour)}
            />
        );
    }

    toggleColour(colour) {
        this.props.manualUpdateColour(this.props.preferences[this.state.currentIndex].dataType, colour);
    }

    toggleVisualization(visualization) {
        let dataType = this.props.preferences[this.state.currentIndex].dataType;
        let colour = this.props.preferences[this.state.currentIndex].colour;
        console.log("Current prefs: " + JSON.stringify(this.props.preferences[this.state.currentIndex]) + ", for vis " + visualization);
        let isChecked = this.props.preferences[this.state.currentIndex].visualization.some(vis => vis === visualization);
        if (isChecked) {
            console.log("Removing visualization " + visualization);
            this.props.manualRemoveVisualization(dataType, visualization, colour);
        } else {
            console.log("Adding visualization " + visualization);
            this.props.manualAddVisualization(dataType, visualization, colour);
        }
    }

    render() {
        return (
            <div id="data-container">
                <div id="data-title">
                    <h2>Data</h2>
                </div>
                <div id="data-date">
                    <div id="data-date-items">
                        <p>Fri 27</p>
                        <p>October</p>
                    </div>
                </div>

                <div id="data-list">
                    {
                        Object.keys(this.props.validVisualizations).map((key) => {
                            return (<button id="btn"
                                            key={key}
                                            onClick={this.setCurrentItem.bind(this, key)}
                            >{key}</button>);
                        })
                    }
                </div>
                <div id="data-content">
                    {
                        this.state.currentIndex < 0 ?
                            (<p>Loading</p>) :
                            (<div id="data-panel">
                                <h1>{this.props.preferences[this.state.currentIndex].dataType}</h1>
                                <div id="data-colour-select">
                                    <p>Colour Scheme:</p>
                                    <Dropdown baseZindex={5}
                                              choices={(this.props.colours)}
                                              currentlySelected={ this.props.preferences[this.state.currentIndex].colour }
                                              choiceToString={(colour => colour)}
                                              callback={colour => this.toggleColour(colour)}/>
                                </div>

                                <div id="data-visualizations-title">
                                    <h2>Available Visualizations</h2>
                                    <p>On dashboard:</p>
                                </div>
                                <div id="data-visualizations">
                                    {
                                        this.props.validVisualizations[this.props.preferences[this.state.currentIndex].dataType].visualizations.map((visualization) =>
                                            (<div className="data-visualization-option"
                                                  key={this.state.currentIndex + visualization}>
                                                <p className="data-visualization-option-label">{visualization}</p>
                                                {
                                                    this.createCheckBoxFor(visualization)
                                                }
                                            </div>)
                                        )
                                    }
                                </div>
                            </div>)
                    }
                </div>
            </div>
        );
    }
}

Data.propTypes = {
    manualLoadPreferences: propTypes.func.isRequired,
    manualLoadVisualizationsFor: propTypes.func.isRequired,
    manualAddVisualization: propTypes.func.isRequired,
    manualRemoveVisualization: propTypes.func.isRequired,
    manualLoadColours: propTypes.func.isRequired,
    manualUpdateColour: propTypes.func.isRequired,
    preferences: propTypes.array.isRequired,
    validVisualizations: propTypes.object.isRequired,
    colours: propTypes.array.isRequired,
    isWaiting: propTypes.bool.isRequired,
    hasErrored: propTypes.bool.isRequired,
    errorMsg: propTypes.string.isRequired
};
