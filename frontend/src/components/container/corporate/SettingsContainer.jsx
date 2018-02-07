import {connect} from "react-redux";
import Settings from "components/pure/corporate/Settings";
import * as corporateSettingsActions from "actions/corporate/settings";

const mapStateToProps = (state) => {
    return {
        users: state.corporate.settings.users,
        hasErrored: state.corporate.settings.hasErrored,
        isLoading: state.corporate.settings.isLoading,
        errorMsg: state.corporate.settings.errorMsg
    };
};

export default connect(
    mapStateToProps,
    corporateSettingsActions
)(Settings);
