import React, {Component} from "react";
import {Link} from "react-router";
import {any} from "prop-types";
import './styles/Navigation.scss';
import * as  corporateStatus from 'constants/corporateStatus';

const navStyle = {
    backgroundColor: "#EEE",
    padding: "10px"
};


const buttonStyle = {};


export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this._IndividualLogout = this._IndividualLogout.bind(this);
        this._Corporatelogout = this._Corporatelogout.bind(this);
    }

    _IndividualLogout(event) {
        event.preventDefault();
        this.props.individualManualLogout();
    }

    _Corporatelogout(event) {
        event.preventDefault();
        this.props.corporateManualLogout();
    }


    render() {
        return this.props.user.corporateStatus === corporateStatus.INDIVIDUAL ?
            (
                <div id="navbar-root">
                    <img id="navbar-logo" src={require("../../images/logo.svg")}/>
                    <h3 id="navbar-title"><strong>FHiR</strong> Visualization</h3>
                    <div id="navbar-buttons">
                        <a id="navbar-auth-button" onClick={this._IndividualLogout}
                           style={buttonStyle}>Logout {this.props.user.email }</a>
                        <div id="navbar-options-container">
                            <ul>
                                <li><Link to="/individual/home">Home</Link></li>
                                <li><Link to="/individual/data">All Data</Link></li>
                                <li><Link to="/individual/goals">Goals</Link></li>
                                <li><Link to="/individual/settings">Settings</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
            : this.props.user.corporateStatus === corporateStatus.CORPORATE ?
                (
                    <div id="navbar-root">
                        <img id="navbar-logo" src="/images/logo.svg"/>
                        <h3 id="navbar-title"><strong>FHiR</strong> Visualization</h3>
                        <div id="navbar-buttons">
                            <a id="navbar-auth-button" onClick={this._Corporatelogout}
                               style={buttonStyle}>Logout {this.props.user.email }</a>
                            <div id="navbar-options-container">
                                <ul>
                                    <li><Link to="/corporate/home">Home</Link></li>
                                    <li><Link to="/corporate/data">All Data</Link></li>

                                    <li><Link to="/corporate/settings">Settings</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <div id="navbar-root">
                        <img id="navbar-logo" src="/images/logo.svg"/>
                        <h3 id="navbar-title"><strong>FHiR</strong> Visualization</h3>
                        <div id="navbar-buttons">
                            <Link id="navbar-auth-button" to="/individual/login">Log in</Link>
                        </div>
                    </div>
                );
    }
}

Navigation.propTypes = {
    corporateManualLogout: any,
    individualManualLogout: any,
    user: any
};
