import {connect} from "react-redux";
import Home from "components/pure/individual/Home";

import {
    manualLoadGoals
} from "actions/individual/goals";

import {
    manualLoadPreferences,
} from "actions/individual/data";

import {
    manualLoadData
} from "actions/individual/home";


const mapStateToProps = (state) => {
    return {
        preferences: state.individual.data.preferences,
        goals: state.individual.goals.goals,
        data: state.individual.home.data,
        isLoading: state.corporate.home.isLoading,
        hasErrored: state.corporate.home.hasErrored,
        errorMsg: state.corporate.home.errorMsg

    };
};

export default connect(
    mapStateToProps,
    {
        manualLoadGoals,
        manualLoadPreferences,
        manualLoadData
    }
)(Home);
