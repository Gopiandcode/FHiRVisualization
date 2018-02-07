import React, {Component} from "react";
import '../styles/Settings.scss';

import * as propTypes from "prop-types";

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
    domainField;
    updateCount;

    constructor(props) {
        super(props);

        this.state = {
            domain: ""
        };
        this._onAddSubmit = this._onAddSubmit.bind(this);
        this._onRemoveAssociation = this._onRemoveAssociation.bind(this);
        this.updateCount = 0;
    }

    _onAddSubmit(event) {
        event.preventDefault();
        const domain = this.state.domain;

        this.props.manualAddAssociation({
            domain
        });

        this.updateCount++;
    }

    _onRemoveAssociation(domain) {
        this.props.manualRemoveAssociation({
            domain
        });

        this.updateCount++;
    }

    componentDidMount() {
        this.props.manualLoadSettings();
    }

    render() {
        return (
            <div id="settings-container">
                <div id="settings-title">
                    <h2>Settings</h2>
                </div>
                <div id="settings-date">
                    <div id="settings-date-items">
                        <p>Fri 27</p>
                        <p>October</p>
                    </div>
                </div>
                <div id="settings-add-panel">
                    <h2>Add Company</h2>
                    <form id="add-form" onSubmit={this._onAddSubmit}>
                        <input
                            className="settings-inp"
                            type="text"
                            placeholder="Company Domain"
                            onChange={e => this.setState({domain: e.target.value})}
                            ref={ref => this.domainField = ref}/>
                        <input id="add-submit" type="submit" value="Add Association"/>
                    </form>
                </div>
                <div id="settings-list-panel">
                    <h2>Associated Organizations</h2>
                    {
                        this.props.isWaiting ?
                            <p>Loading...</p>
                            :
                            <div id="settings-company-list">
                                {
                                    this.props.associations.map(association => {
                                        return (
                                            <div key={this.updateCount + association.domain}>
                                                {association.name} - {association.domain}
                                                <button
                                                    onClick={this._onRemoveAssociation.bind(this, association.domain)}>
                                                    Remove
                                                </button>
                                            </div>);
                                    })
                                }
                            </div>
                    }
                </div>
            </div>
        );
    }
}


Settings.propTypes = {
    associations: propTypes.array.isRequired,
    isWaiting: propTypes.bool.isRequired,
    hasErrored: propTypes.bool.isRequired,
    errorMsg: propTypes.string.isRequired,
    manualLoadSettings: propTypes.func.isRequired,
    manualAddAssociation: propTypes.func.isRequired,
    manualRemoveAssociation: propTypes.func.isRequired
};

