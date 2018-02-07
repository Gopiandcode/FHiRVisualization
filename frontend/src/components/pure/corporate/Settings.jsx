import React, {Component} from "react";
import '../styles/Settings.scss';
import * as propTypes from 'prop-types';

const elem = () => (
    <div style={{
        backgroundColor: 'red',
        width: 100,
        height: 100
    }}>
        Data
    </div>
);

export default class Settings extends Component {

    constructor(props) {
        super(props);

        this.createUserItemFor = this.createUserItemFor.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    componentDidMount() {
        this.props.manualLoadAssociatedUsers();
    }

    createUserItemFor(user) {
        return (<div><p>{user.email}</p>
            <button onClick={this.removeUser.bind(this, user.email)}>remove</button>
        </div>)
    }

    removeUser(email) {
        this.props.manualRemoveAssociatedUser(email);
    }

    render() {
        return (
            <div id="settings-container">
                <div id="settings-content">
                    <h2>Settings</h2>
                    <h4>This is where you would be able to store your settings</h4>
                    {this.props.isLoading ?
                        (<div>Loading...</div>) :

                        (<div>
                            {this.props.users.map(((user, i) => (
                                <div key={user.email + i}>
                                    {
                                        this.createUserItemFor(user)
                                    }
                                </div>
                            )))}
                        </div>)
                    }
                </div>
            </div>
        );
    }
}

Settings.propTypes = {
    manualLoadAssociatedUsers: propTypes.func.isRequired,
    manualRemoveAssociatedUser: propTypes.func.isRequired,
    users: propTypes.array.isRequired,
    hasErrored: propTypes.bool.isRequired,
    isLoading: propTypes.bool.isRequired,
    errorMsg: propTypes.string.isRequired
};
