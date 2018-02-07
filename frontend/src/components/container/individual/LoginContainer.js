import {connect} from "react-redux";
import * as userActions from "actions/individual/user";
import Login from "components/pure/Login";

const mapStateToProps = (state, ownProps) => {
    const pathName = "/individual/home";

    return {
        user: state.user,
        nextPathName: pathName,
        registerPath: "/individual/register",
        alternatePath: "/corporate/login",
        alternateMessage: "Not an individual user?",
        loginAccountType: "Individual Account",
        loginPrompt: "Individual Sign In"
    }
};


export default connect(
    mapStateToProps,
    userActions
)(Login);
