import React, {Component} from "react";
import {VictoryLine, VictoryChart, VictoryTheme} from 'victory';
import '../styles/Home.scss';
import moment from 'moment';
import * as propTypes from 'prop-types';
import DashboardGrid from "../DashboardContainer";

const sampleBarChartWeekly1 = [{ x: "Monday", y: 293 },
                             { x: "Tuesday", y: 424 },
                             { x: "Wednesday", y: 392},
                             { x: "Thursday", y: 264},
                             { x: "Friday", y: 42},
                             { x: "Saturday", y: 105},
                             { x: "Sunday", y: 183}
                           ];

const sampleBarChartDaily1 = [{ x: "7:39", y: 293 },
                              { x: "8:21", y: 424 },
                              { x: "14:53", y: 392},
                              { x: "19:20", y: 264},
                             ]

const dumbData = [
  {
    "dataType": "HeartRate",
    "colour": "blue",
    "visualization": []
  },
  {
    "dataType": "BloodPressure",
    "colour": "blue",
    "visualization": [
      "LineGraphMonthly"
    ]
  },
  {
    "dataType": "BodyWeight",
    "colour": "yellow",
    "visualization": [
      "LineGraphMonthly"
    ]
  },
  {
    "dataType": "BodyHeight",
    "colour": "yellow",
    "visualization": [
      "DonutWeekly"
    ]
  },
  {
    "dataType": "SystolicAndDiastolic",
    "colour": "yellow",
    "visualization": []
  },
  {
    "dataType": "BMI",
    "colour": "yellow",
    "visualization": []
  },
  {
    "dataType": "HeartRate",
    "colour": "red",
    "visualization": [
      "BarChartDaily",
      "LineGraphAnnual",
      "LineGraphWeekly"
    ]
  },
  {
    "dataType": "BloodPressure",
    "colour": "blue",
    "visualization": [
      "LineGraphAnnual",
      "BarGraphWeekly"
    ]
  }
];



/*[
    {
        "dataType": "HeartRate",
        "colour": "red",
        "visualization": [
            "BarChartDaily",
            "LineGraphAnnual",
            "LineGraphWeekly"
        ]
    },
    {
        "dataType": "BloodPressure",
        "colour": "blue",
        "visualization": [
            "LineGraphAnnual",
            "BarGraphWeekly"
        ]
    }
];
*/

const elem = (colour, string) => (
    <div key={string} style={{
        backgroundColor: {colour},
        width: 100,
        height: 100
    }}>
        {string}
    </div>
);

export default class Home extends Component {
    componentDidMount() {
        this.props.manualLoadGoals();
        this.props.manualLoadPreferences();
    }
    render() {
        return (
            <div id="home-container" className="basic">
                <div id="home-content">
                  <div id="home-content__header">
                    <h2 className="home__title">Home</h2>
                    <h4 className="home__date">{moment().format("ddd D MMMM")}</h4>
                  </div>
                    {
                      this.props.preferences.length > 0 && ( <DashboardGrid preferences={ this.props.preferences }/> )
                    }
                    {
                    /* May No Longer Need This
                        this.props.preferences.map((preference) => {
                            *                                     "dataType": "HeartRate",
                             "colour":  DEFAULT_COLOUR,
                             "visualization": [],
                             *
                            return preference.visualization.map((visualization, i) => {
                                return (elem(preference.colour, visualization + " " + preference.dataType + " " + i));
                            });
                        })
                    */
                    }

                    <div id="goals-content__header">
                      <h2 className="goals__title">Goals</h2>
                    </div>
                    {
                        this.props.goals.length > 0 && ( <DashboardGrid goals = { this.props.goals } /> )

                        /* Might not need this anymore
                          this.props.goals.map((goal, i) => {
                            return (elem(goal.colour, JSON.stringify(goal)/* goal.name + " " + goal.value + " " + i*))
                        })
                        */
                    }
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    manualLoadGoals: propTypes.func.isRequired,
    manualLoadPreferences: propTypes.func.isRequired,
    manualLoadData: propTypes.func.isRequired,
    preferences: propTypes.array.isRequired,
    goals: propTypes.array.isRequired,
    data: propTypes.object.isRequired
};
