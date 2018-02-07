import {connect} from "react-redux";
import Goals from "components/pure/individual/Goals";
import {
    manualCreateGoal,
    manualLoadGoals,
    manualRemoveGoal,
    manualUpdateGoal
} from "actions/individual/goals";

import {
    manualLoadPreferences,
    manualLoadColours
} from "actions/individual/data";

const mapStateToProps = (state) => {
    return {
        validVisualizations: state.individual.data.validVisualizations,
        goals: state.individual.goals.goals,
        validPeriods: state.individual.goals.validPeriods,
        isWaiting: state.individual.goals.isWaiting,
        hasErrored: state.individual.goals.hasErrored,
        errorMsg: state.individual.goals.errorMsg,
        colours: state.individual.data.colours
    };
};

export default connect(
    mapStateToProps,
    {
        manualCreateGoal,
        manualLoadGoals,
        manualRemoveGoal,
        manualUpdateGoal,
        manualLoadPreferences,
        manualLoadColours
    }
)(Goals);
