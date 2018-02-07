import { connect } from "react-redux";
import * as IndividualUserActions from "actions/individual/user";
import * as CorporateUserActions from "actions/corporate/user";
import Navigation from "components/pure/Navigation";


function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(
    mapStateToProps,
    {
        corporateManualLogout: CorporateUserActions.manualLogout,
        individualManualLogout: IndividualUserActions.manualLogout
    }
)(Navigation);