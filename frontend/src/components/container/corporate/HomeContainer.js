import {connect} from "react-redux";
import Home from "components/pure/corporate/Home";
import {manualLoadPreferences} from "actions/corporate/data";
import {manualLoadData} from 'actions/corporate/home';

const mapStateToProps = (state) => {
    return {
        preferences: state.corporate.data.preferences,
        data: state.corporate.home.data,
        isLoading: state.corporate.home.isLoading,
        hasErrored: state.corporate.home.hasErrored,
        errorMsg: state.corporate.home.errorMsg
    };
};

export default connect(
    mapStateToProps,
    {manualLoadPreferences, manualLoadData}
)(Home);
