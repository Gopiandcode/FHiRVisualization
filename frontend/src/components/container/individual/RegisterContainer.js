import { connect } from "react-redux";
import * as userActions from "actions/individual/user";
import Register from "components/pure/individual/Register.jsx";

function mapStateToProps(state) {
    return {}
}

export default connect(
    mapStateToProps, userActions
)(Register);
