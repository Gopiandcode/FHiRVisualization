import React from 'react';
import ReactDOM from 'react-dom';
import Donut from "../Donut"; //Will change this to a folder of visualisation components
import BarChart from "../BarChart";
import GroupBarChart from "../GroupBarChart";
import LineGraph from "../LineGraph";
import BrushLineGraph from "../BrushLineGraph";
import GoalRing from "../GoalRing";

import * as PropTypes from 'prop-types';

export default class DashboardGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data : {}, goalData : {} };
    this.loadData = this.loadData.bind(this);
    this.loadGoalData = this.loadGoalData.bind(this);
    this.checkVisType  = this.checkVisType.bind(this);
    this.mapToRange  = this.mapToRange.bind(this);
    this.renderVisualization  = this.renderVisualization.bind(this);
    this.renderGoalVisualisation = this.renderGoalVisualisation.bind(this);
    this.loadPreferences  = this.loadPreferences.bind(this);
    this.loadGoals = this.loadGoals.bind(this);
  }

  componentDidMount() {
    // Either props.preferences is null, OR props.goals is null
    if(this.props.preferences != null) {
      let listOfVis = this.loadPreferences();
      for(var i = 0; i < listOfVis.length; i++) {
        let dataRange = this.mapToRange(listOfVis[i].visualization);
        let dataType = listOfVis[i].dataType;
        this.loadData(dataType, dataRange);
      }

      this.setState({
        listOfVis
      })
    }

    else {
      let listOfGoals = this.loadGoals();
      for(var i = 0; i < listOfGoals.length; i++) {
        let goal = listOfGoals[i].value;
        let title = listOfGoals[i].name;
        this.loadGoalData(title, goal/*, current*/);
      }

      this.setState({
        listOfGoals
      })
    }
  }

  mapToRange(visualization) {
    if(visualization.includes("Daily")) { return "Daily" }
    else if(visualization.includes("Weekly")) { return "Weekly"; }
    else if(visualization.includes("Monthly")) { return "Monthly"; }
    else if(visualization.includes("Annual")) { return "Annual"; }
    return "OOPS";
  }

  checkVisType(vis) { // Ammendable visualisation checker
    if(vis.visualization.includes("BarChart")) {
      return 1;
    }
    else if(vis.visualization.includes("LineGraph")) {
      return 2;
    }
    else if(vis.visualization.includes("Doughnut")) {
      return 3;
    }
    else if(vis.visualization.includes("GroupBarChart")) {
      return 4;
    }
    return 0;
  }

  // Find preference,
  // manualLoadData() gets called on: dataType & range (Weekly, Monthly etc)

  // Load the data from Props
  loadData(dataType, dataRange) {
    const sampleBarChartWeekly1 = [{ x: "Monday", y: (Math.random() * 400), label: "Monday"},
                                 { x: "Tuesday", y: (Math.random() * 400), label: "Tuesday" },
                                 { x: "Wednesday", y: (Math.random() * 400), label: "Wednesday" },
                                 { x: "Thursday", y: (Math.random() * 400), label: "Thursday" },
                                 { x: "Friday", y: (Math.random() * 400), label: "Friday" },
                                 { x: "Saturday", y: (Math.random() * 400), label: "Saturday" },
                                 { x: "Sunday", y: (Math.random() * 400), label: "Sunday" }
                               ];

    var mock = Object.assign({}, this.state);
    mock.data = mock.data || {};
    mock.data[dataType] = mock.data[dataType] || {};
    mock.data[dataType][dataRange] = mock.data[dataType][dataRange] || {};
    mock.data[dataType][dataRange] = sampleBarChartWeekly1;

    this.setState(mock);
  }

  //Find Goals
  // ManualLoadGoal() gets called on:
  loadGoalData(title, goal/*, current*/) {
    let current = Math.round(Number(goal - (Math.random() * goal)))
    const sampleGoalRing = [{ x: current.toString(), y: current},
                            { x: Math.round(Number(goal - current)).toString(), y: (goal - current) },
                            ];

    var mock = Object.assign({}, this.state);
    mock.goalData = mock.goalData || {};
    mock.goalData[title] = mock.goalData[title] || {};
    mock.goalData[title] = sampleGoalRing;
    this.setState(mock);
  }

  renderVisualization(vis) {
    console.log(JSON.stringify(vis));
    let dataRange = this.mapToRange(vis.visualization);
    let dataType = vis.dataType;
    switch(this.checkVisType(vis)) {
      case 1:
        return( <BarChart key={dataRange+dataType} className="dash__component" data={ this.state.data[dataType][dataRange] } title={ dataType } />);
        break;
      case 2:
        return( <BrushLineGraph key={dataRange+dataType} className="dash__component" data={ this.state.data[dataType][dataRange] } title={ dataType } />);
        break;
      case 3:
        return( <Donut key={dataRange+dataType} className="dash__component" data={ this.state.data[dataType][dataRange] } title={ dataType } />);
        break;
      case 4:
        return( <GroupBarChart key={dataRange+dataType} className="dash__component" data={ this.state.data[dataType][dataRange] } title={ dataType } />);
        break;
      default:
        console.log("Unkown Data visualisation");
        break;
    }
  }

  renderGoalVisualisation(name, goal) {
    return( <GoalRing key={goal + goal.name} className="dash__component" data={ this.state.goalData[name] } title={ name } /> );
  }

  loadPreferences() {
    var listOfVis = [];
    this.props.preferences.map((p) => {
      p.visualization.map((v) => {
        listOfVis.push({dataType : p.dataType, visualization : v, colour: p.colour });
      })
    })
    return listOfVis;
  }

  loadGoals() {
    var listOfGoalVis = [];
    this.props.goals.map((g) => {
      listOfGoalVis.push({ name: g.name, value : g.value, colour: g.colour });
    })
    return listOfGoalVis;
  }

  preferencesOrGoals() {
    if(this.props.preferences != null) {
      return (
        <div className="dash__container">
          {
            this.state.listOfVis &&
            this.state.listOfVis.map(vis => this.renderVisualization(vis))
          }
        </div>
      )
    }
    else {
      return (
        <div className="dash__container-goals">
          { this.state.listOfGoals &&
            this.state.listOfGoals.map(goal => this.renderGoalVisualisation(goal.name, goal))
          }
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        { this.preferencesOrGoals() }
      </div>
      /*
      <div className="dash__container">
        {
          (this.state.listOfVis &&
          this.state.listOfVis.map(vis => this.renderVisualization(vis))) ||
          (this.state.listOfGoals && this.state.listOfGoals.map(vis => this.renderGoalVisualisation(vis)))
        }
      </div>
      */
    )
  }
}

DashboardGrid.propTypes = {
  preferences: PropTypes.array,
  goals: PropTypes.array
};
