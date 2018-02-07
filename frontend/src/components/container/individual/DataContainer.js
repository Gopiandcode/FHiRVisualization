import {connect} from "react-redux";
import Data from "components/pure/individual/Data";
import * as individualDataActions from "actions/individual/data";

const mapStateToProps = (state) => {
    return {
        preferences: state.individual.data.preferences,
        validVisualizations: state.individual.data.validVisualizations,
        isWaiting: state.individual.data.isWaiting,
        hasErrored: state.individual.data.hasErrored,
        errorMsg: state.individual.data.errorMsg,
        colours: state.individual.data.colours
    };
};

export default connect(
    mapStateToProps,
    individualDataActions
)(Data);
