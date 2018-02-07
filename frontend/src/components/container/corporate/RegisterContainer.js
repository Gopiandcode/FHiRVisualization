import { connect } from "react-redux";
import * as userActions from "actions/corporate/user";
import Register from "components/pure/corporate/Register.jsx";

function mapStateToProps(state) {
    return {}
}

export default connect(
    mapStateToProps, userActions
)(Register);
