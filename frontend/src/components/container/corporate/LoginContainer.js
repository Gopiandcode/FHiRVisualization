import { connect } from "react-redux";
import * as userActions from "actions/corporate/user";
import Login from "components/pure/Login";

const mapStateToProps = (state, ownProps) => {
    let nextPathName = "/corporate/home";
    try {
        if(state.user.nextPathName)
            nextPathName = state.user.nextPathName;
    } catch(err) {}


    return {
        user: state.user,
        nextPathName: nextPathName,
        registerPath: "/corporate/register",
        alternatePath: "/individual/login",
        alternateMessage: "Not an corporate user?",
        loginAccountType: "Corporate Account",
        loginPrompt: "Corporate Sign In"

    }
};


export default connect(
    mapStateToProps,
    userActions
)(Login);
