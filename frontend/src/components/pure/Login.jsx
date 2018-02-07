import React, {Component} from "react";
import {any} from "prop-types";
import {Link} from "react-router";
import ReactDOM from "react-dom";
import axios from "axios";

import './styles/Login.scss';


const loginMessageStyle = {
    color: "red"
};

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginMessage: "",
            email: '',
            password: ""
        };

        this._onLoginSubmit = this._onLoginSubmit.bind(this);
    }

    _onLoginSubmit(event) {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;

        const nextPath = this.props.nextPathName || "/";

        this.props.manualLogin({
            email,
            password
        }, nextPath)
            .then((loginMessage) => {
                if (loginMessage) {
                    this.setState({
                        loginMessage
                    })
                }
            });
    }

    render() {
        return (
            <div id="login-parent-container">
                <div id="login-title-container">
                    <h2 id="text">
                        Log in to <strong>FHiR</strong> Visualization
                    </h2>
                    <h5 id="text">
                        <p >{this.props.loginAccountType}</p>
                    </h5>
                </div>
                <div id="login-container">
                    <form id="login-form" onSubmit={this._onLoginSubmit}>
                        {/* <h2 id="login-text">Log in</h2> */}
                        Email Address
                        <input className="login-inp" type="email" onChange={e => this.setState({email: e.target.value})}
                               placeholder="Username"/><br />
                        Password
                        <input className="login-inp" type="password"
                               onChange={e => this.setState({password: e.target.value})} placeholder="Password"/><br />
                        <input id="login-submit" type="submit" value={this.props.loginPrompt}/>
                        <p>
                            <Link to={this.props.alternatePath}>{this.props.alternateMessage}</Link>
                        </p>

                        <p>
                            Don&lsquo;t have an account? <Link to={this.props.registerPath}>Sign up</Link>
                        </p>
                    </form>
                    {this.state.loginMessage && (
                        <div id="login-error">
                            {this.state.loginMessage}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    manualLogin: any,
    nextPathName: any,
    registerPath: any,
    alternatePath: any,
    alternateMessage: any,
    loginAccountType: any,
    loginPrompt: any
};