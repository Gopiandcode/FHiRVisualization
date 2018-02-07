import {connect} from "react-redux";
import Settings from "components/pure/individual/Settings";
import * as individualSettingsActions from "actions/individual/settings";

const mapStateToProps = (state) => {
    return {
        associations: state.individual.settings.associations,
        isWaiting: state.individual.settings.isWaiting,
        hasErrored: state.individual.settings.hasErrored,
        errorMsg: state.individual.settings.errorMsg
    };
};
// api/[datatype]/[timeperiod]
export default connect(
    mapStateToProps,
    individualSettingsActions
)(Settings);
