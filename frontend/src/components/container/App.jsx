import React, {Component} from 'react';
import {any} from "prop-types";
import NavigationContainer from "./NavigationContainer";
import {Link} from "react-router";
import '../App.scss';

export default class App extends Component {
    render() {
        return (
            <div>
                <NavigationContainer />
                {this.props.children}
                <footer>
                    <Link className="footer-button" to="/individual/login">Terms and Conditions</Link>
                    |
                    <Link className="footer-button" to="/individual/login">Privacy Statement</Link>
                    |
                    <p className="footer-button footer-button-last">2018 FHiR Visualization</p>
                </footer>

            </div>
        );
    }
}

App.propTypes = {
    children: any
};
