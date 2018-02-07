import React, { Component } from "react";
import ReactDOM from "react-dom";
import { any } from "prop-types";
import '../styles/Register.scss';

const registerMessageStyle = {
    color: "red"
};


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerMessage: "",
            email: "",
            password: ""
        };

        this._onRegisterSubmit = this._onRegisterSubmit.bind(this);
    }

    _onRegisterSubmit(event) {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;

        this.props.manualRegister({
            email,
            password
        })
            .then((registerMessage) => {
                if (registerMessage) {
                    this.setState({
                        registerMessage
                    });
                }
            });
    }

    render() {
        return (
            <div id="register-parent-container">
                <div id="register-container">
                    <form id="register-form" onSubmit={this._onRegisterSubmit}>
                        {/* <h2>Register</h2> */}
                        <input className="register-inp" type="email" onChange={e => this.setState({ email: e.target.value })} placeholder="Email" /><br />
                        <input className="register-inp" type="password" onChange={e => this.setState({ password: e.target.value })} placeholder="Password" /><br />
                        <input id="register-submit" type="submit" value="Register" />
                    </form>
                    {this.state.registerMessage && (
                        <div id="register-error">{this.state.registerMessage}</div>
                    )}
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    manualRegister: any
};
