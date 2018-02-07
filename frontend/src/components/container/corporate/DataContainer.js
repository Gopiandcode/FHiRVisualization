import {connect} from "react-redux";
import Data from "components/pure/corporate/Data";
import * as CorporateUserActions from "actions/corporate/data";

const mapStateToProps = (state) => {
    return {
        preferences: state.corporate.data.preferences,
        visualizationMap: state.corporate.data.visualizationMap,
        dataTypes: state.corporate.data.dataTypes,
        colours: state.corporate.data.colours,
        isWaiting: state.corporate.data.isWaiting,
        hasErrored: state.corporate.data.hasErrored,
        errorMsg: state.corporate.data.errorMsg
    };
};

export default connect(
    mapStateToProps,
    CorporateUserActions
)(Data);
