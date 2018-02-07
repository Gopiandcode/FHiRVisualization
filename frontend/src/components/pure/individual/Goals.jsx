import React, {Component} from "react";
import Dropdown from "../utility/Dropdown";
import '../styles/Goals.scss';

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

export default class Goals extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: -1,
            newGoals: [],
            currentDataType: "",
            currentValue: "",
            currentPeriod: "",
            currentColour: ""
        };


        this.setCurrentItem = this.setCurrentItem.bind(this);
        this.setSelectedValue = this.setSelectedValue.bind(this);
        this.generateDisplayPanel = this.generateDisplayPanel.bind(this);
        this.setCurrentDataType = this.setCurrentDataType.bind(this);
        this.getCurrentValue = this.getCurrentValue.bind(this);
        this.setCurrentValue = this.setCurrentValue.bind(this);
        this.setCurrentColour = this.setCurrentColour.bind(this);
        this.setCurrentPeriod = this.setCurrentPeriod.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.deleteCurrentGoal = this.deleteCurrentGoal.bind(this);
        this.generateDataCheckboxFor = this.generateDataCheckboxFor.bind(this);
        this.generateColourCheckboxFor = this.generateColourCheckboxFor.bind(this);
        this.generatePeriodCheckboxFor = this.generatePeriodCheckboxFor.bind(this);
        this.createNewGoal = this.createNewGoal.bind(this);

    }

    componentDidMount() {
        this.props.manualLoadGoals();
        this.props.manualLoadColours();
        this.props.manualLoadPreferences().then(() => {
            this.setCurrentItem(0);
        });
    }

    setCurrentItem(index) {
        if (index < this.props.goals.length && index >= 0) {
            this.setState({
                currentIndex: index,
                currentDataType: this.props.goals[index].dataType,
                currentValue: this.props.goals[index].value,
                currentPeriod: this.props.goals[index].period,
                currentColour: this.props.goals[index].colour
            });
        } else if (index - this.props.goals.length < this.state.newGoals.length && index - this.props.goals.length >= 0) {
            const actualIndex = index - this.props.goals.length;
            console.log("setting index to fake " + actualIndex);
            let partialState = {
                currentIndex: index,
                currentDataType: this.state.newGoals[actualIndex].dataType,
                currentValue: this.state.newGoals[actualIndex].value,
                currentPeriod: this.state.newGoals[actualIndex].period,
                currentColour: this.state.newGoals[actualIndex].colour
            };
            console.log(JSON.stringify(partialState));
            this.setState(partialState);
        } else {
            // wrap around
            if (this.props.goals.length > 0)
                this.setCurrentItem(this.props.goals.length - 1);
        }
    }

    getCurrentValue() {
        if (this.state.currentIndex < this.props.goals.length) {
            return this.state.currentValue;
        } else {
            const actualIndex = this.state.currentIndex - this.props.goals.length;
            return this.state.newGoals[actualIndex].value;
        }
    }

    setCurrentValue(value) {
        let index = this.state.currentIndex;
        if (index < this.props.goals.length) {
            if (this.state.currentValue !== value)
                this.setState({
                    currentValue: value
                });
        } else {
            const actualIndex = index - this.props.goals.length;
            if (this.state.newGoals[actualIndex].value !== value) {
                let newGoals = [...this.state.newGoals];
                newGoals[actualIndex].value = value;
                this.setState({
                    newGoals: newGoals
                });
            }
        }

    }

    setSelectedValue(name) {
        let i = 0;
        for (; i < this.props.goals.length; i++) {
            if (this.props.goals[i].name === name) {
                this.setCurrentItem(i);
                return;
            }
        }
        i = 0;
        for (; i < this.state.newGoals.length; i++) {
            if (this.state.newGoals[i].name === name) {
                this.setCurrentItem(this.props.goals.length + i);
                return;
            }
        }
    }

    setCurrentDataType(dataType) {
        //
        let index = this.state.currentIndex;
        if (index < this.props.goals.length) {
            this.setState({
                currentDataType: dataType
            });
        } else {
            const actualIndex = index - this.props.goals.length;
            let newGoals = [...this.state.newGoals];
            newGoals[actualIndex].dataType = dataType;
            this.setState({
                newGoals: newGoals
            });
        }

    }

    setCurrentColour(colour) {
        let index = this.state.currentIndex;
        if (index < this.props.goals.length) {
            this.setState({
                currentColour: colour
            });
        } else {
            const actualIndex = index - this.props.goals.length;
            let newGoals = [...this.state.newGoals];
            newGoals[actualIndex].colour = colour;
            this.setState({
                newGoals: newGoals
            });
        }

    }

    setCurrentPeriod(period) {
        let index = this.state.currentIndex;
        if (index < this.props.goals.length) {
            this.setState({
                currentPeriod: period
            });
        } else {
            const actualIndex = index - this.props.goals.length;
            let newGoals = [...this.state.newGoals];
            newGoals[actualIndex].period = period;
            this.setState({
                newGoals: newGoals
            });
        }

    }

    saveChanges() {
        let index = this.state.currentIndex;
        if (index < this.props.goals.length) {
            let goal = this.props.goals[index];
            this.props.manualUpdateGoal({
                name: goal.name,
                dataType: this.state.currentDataType,
                value: this.state.currentValue,
                period: this.state.currentPeriod,
                colour: this.state.currentColour
            }).then(() => {
                this.setCurrentItem(this.state.currentIndex);
            });
        }
        else {
            const actualIndex = index - this.props.goals.length;
            let newGoal = this.state.newGoals[actualIndex];
            this.props.manualCreateGoal(
                newGoal
            ).then(() => {
                let newGoals = this.state.newGoals.filter(goal => goal.name !== newGoal.name);
                this.setState({newGoals: newGoals});
            });

        }

    }

    createNewGoal() {
        let newGoal = {
            name: " ",
            dataType: " ",
            value: 100,
            period: " ",
            colour: " "
        };

        let newGoals = [...this.state.newGoals, newGoal];
        let newIndex = this.props.goals.length + newGoals.length - 1;

        this.setState({
            newGoals: newGoals
        });
        this.setCurrentItem(newIndex);
    }

    deleteCurrentGoal() {
        let index = this.state.currentIndex;
        if (index < this.props.goals.length) {
            this.props.manualRemoveGoal(this.props.goals[index].name).then(() => {
                this.setCurrentItem(this.props.goals.length - 1);
            });
        } else {
            const actualIndex = index - this.props.goals.length;
            let newGoals = [...this.state.newGoals];
            newGoals.splice(actualIndex, 1);
            this.setState({
                newGoals: newGoals
            });
            if (actualIndex > this.state.newGoals.length) {
                this.setCurrentItem(this.state.newGoals.length - 1);
            }
        }

    }

    generateDataCheckboxFor(dataType) {
        let isChecked;
        if (this.state.currentIndex < this.props.goals.length) {
            if (this.state.currentDataType === dataType) {
                isChecked = true;
            } else {
                isChecked = false;
            }
        } else {
            let actualIndex = this.state.currentIndex - this.props.goals.length;
            if (this.state.newGoals[actualIndex].dataType === dataType) {
                isChecked = true;
            } else {
                isChecked = false;
            }
        }
        return (
            <input type="checkbox" checked={isChecked} onChange={e => this.setCurrentDataType(dataType)}/>
        );
    }

    generateColourCheckboxFor(colour) {
        let isChecked;
        if (this.state.currentIndex < this.props.goals.length) {
            if (this.state.currentColour === colour) {
                isChecked = true;
            } else {
                isChecked = false;
            }
        } else {
            let actualIndex = this.state.currentIndex - this.props.goals.length;
            if (this.state.newGoals[actualIndex].colour === colour) {
                isChecked = true;
            } else {
                isChecked = false;
            }
        }
        return (
            <input type="checkbox" checked={isChecked} onChange={e => this.setCurrentColour(colour)}/>
        );
    }

    generatePeriodCheckboxFor(period) {
        let isChecked;
        if (this.state.currentIndex < this.props.goals.length) {
            if (this.state.currentPeriod === period) {
                isChecked = true;
            } else {
                isChecked = false;
            }
        } else {
            let actualIndex = this.state.currentIndex - this.props.goals.length;
            if (this.state.newGoals[actualIndex].period === period) {
                isChecked = true;
            } else {
                isChecked = false;
            }
        }
        return (
            <input type="checkbox" checked={isChecked} onChange={e => this.setCurrentPeriod(period)}/>
        );
    }

    generateDisplayPanel() {
        let index = this.state.currentIndex;
        let goal;
        let needsSaving;
        let alreadyExists;
        let actualIndex;
        console.log(index);
        if (index < this.props.goals.length && index >= 0) {
            goal = this.props.goals[index];
            needsSaving = goal.dataType !== this.state.currentDataType ||
                goal.value !== this.state.currentValue ||
                goal.period !== this.state.currentPeriod ||
                goal.colour !== this.state.currentColour;
            alreadyExists = true;

        } else if (index - this.props.goals.length >= 0 && index - this.props.goals.length < this.state.newGoals.length) {
            actualIndex = index - this.props.goals.length;
            goal = this.state.newGoals[actualIndex];
            needsSaving = goal.name !== "" &&
                goal.dataType &&
                goal.value &&
                goal.value > 0 &&
                goal.period;
            alreadyExists = false;
        }

        return (
            goal && (
                <div id="goals-display-panel-container">
                    {alreadyExists ?
                        (
                            <div id="goals-display-panel-title"><p className="goals-display-panel-label">Label:</p><p
                                className="goals-display-panel-content">{goal.name}</p></div>
                        ) : (
                            <div id="goals-display-panel-title">
                                <p className="goals-display-panel-label">Label:</p>
                                <input type="text" placeholder="Goal Name"
                                       className="goals-display-panel-content"
                                       onChange={e => {
                                           const newGoals = [...this.state.newGoals];
                                           newGoals[actualIndex].name = e.target.value;
                                           this.setState({newGoals: newGoals});
                                       }}/>
                            </div>
                        )
                    }

                    <div>
                        <p className="goals-display-panel-label">Data:</p>
                        <p className="goals-display-panel-content">
                            {/*{goal.dataType}*/}

                            <Dropdown baseZindex={5}
                                      choices={Object.keys(this.props.validVisualizations)}
                                      currentlySelected={
                                          (
                                              this.state.currentIndex < this.props.goals.length ?
                                                  this.state.currentDataType :
                                                  this.state.newGoals[this.state.currentIndex - this.props.goals.length].dataType
                                          )
                                      }
                                      choiceToString={(dataType => dataType)}
                                      callback={dataType => this.setCurrentDataType(dataType)}/>
                        </p>
                    </div>


                    <div>
                        <p className="goals-display-panel-label">Colour:</p>
                        <div className="goals-display-panel-content">
                            <Dropdown baseZindex={4}
                                      choices={this.props.colours}
                                      currentlySelected={
                                          (this.state.currentIndex < this.props.goals.length ?
                                                  this.state.currentColour :
                                                  this.state.newGoals[this.state.currentIndex - this.props.goals.length].colour
                                          )
                                      }
                                      choiceToString={(colour => {
                                          console.log("Trying to parse " + colour);
                                          return colour;
                                      })} callback={colour => this.setCurrentColour(colour)}/>
                        </div>
                    </div>

                    <div><p className="goals-display-panel-label">Target:</p><input
                        className="goals-display-panel-content" type="text" value={this.getCurrentValue()}
                        onChange={e => {
                            try {
                                let value = Number.parseFloat(e.target.value);
                                this.setCurrentValue(value);
                            } catch (err) {
                                this.e.target.clear();
                            }
                        }}/></div>

                    <div><p className="goals-display-panel-label">Every:</p><p
                        className="goals-display-panel-content">
                        {/*{goal.period}*/}
                        <Dropdown baseZindex={3}
                                  choices={(this.props.validPeriods)}
                                  currentlySelected={
                                      (
                                          this.state.currentIndex < this.props.goals.length ?
                                              this.state.currentPeriod :
                                              this.state.newGoals[this.state.currentIndex - this.props.goals.length].period
                                      )
                                  }
                                  choiceToString={(period => period)}
                                  callback={period => this.setCurrentPeriod(period)}/>

                    </p></div>

                    <div id="goals-panel-button-container">
                        {needsSaving && (
                            <button className="goals-display-panel-button" onClick={this.saveChanges}>Save
                                Changes</button>
                        )}
                        <button className="goals-display-panel-button" onClick={this.deleteCurrentGoal}>Delete Goal
                        </button>
                    </div>
                </div>
            )
        );

    }

    render() {
        return (
            <div id="goals-container">
                <div id="goals-title">
                    <h2>Goals</h2>
                </div>
                <div id="goals-date">
                    <div id="goals-date-items">
                        <p>Fri 27</p>
                        <p>October</p>
                    </div>
                </div>
                <div id="goals-options">
                    <h3> Tracked Goals </h3>
                    {
                        this.props.goals.map(goal => (
                            <button
                                key={goal.name + this.state.currentIndex}
                                onClick={this.setSelectedValue.bind(this, goal.name)}
                            >
                                {goal.name}
                            </button>
                        ))
                    }
                    {
                        this.state.newGoals.map((goal, i) => (
                            <button
                                key={goal.name + i + " - " + this.props.goals.length + "," + this.state.newGoals.length + this.state.currentIndex}
                                onClick={this.setSelectedValue.bind(this, goal.name)}
                            >
                                {goal.name ? goal.name : "new goal"}
                            </button>
                        ))
                    }
                    { this.state.newGoals.length === 0 &&
                    (
                        <button
                            id="goals-new-button"
                            onClick={this.createNewGoal}>
                            Add goal
                        </button>
                    )}
                </div>
                <div id="goals-panel">
                    { this.state.currentIndex >= 0 &&
                    this.generateDisplayPanel()
                    }
                </div>
            </div>
        );
    }
}

Goals.propTypes = {
    validVisualizations: propTypes.object.isRequired,
    goals: propTypes.array.isRequired,
    validPeriods: propTypes.array.isRequired,
    isWaiting: propTypes.bool.isRequired,
    hasErrored: propTypes.bool.isRequired,
    errorMsg: propTypes.string.isRequired,
    colours: propTypes.array.isRequired,

    manualCreateGoal: propTypes.func.isRequired,
    manualLoadGoals: propTypes.func.isRequired,
    manualRemoveGoal: propTypes.func.isRequired,
    manualUpdateGoal: propTypes.func.isRequired,
    manualLoadPreferences: propTypes.func.isRequired,
    manualLoadColours: propTypes.func.isRequired
};
