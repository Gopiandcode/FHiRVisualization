import React, {Component} from 'react';
import * as propTypes from 'prop-types';
import './Dropdown.scss';
export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listVisible: false
        };

        this.renderListItems = this.renderListItems.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    show() {
        this.setState({
            listVisible: true
        });
        document.addEventListener("click", this.hide);
    }

    hide() {
        this.setState({
            listVisible: false
        });
        document.removeEventListener("click", this.hide);
    }


    render() {
        return (
            <div className={"dropdown-container"} style={{zIndex: this.props.baseZindex}}>
                <div className={"dropdown-display" + (this.state.listVisible ? " clicked" : "")} onClick={this.show}>
                    <span>{this.props.choiceToString(this.props.currentlySelected)}</span>
                    <i className="fa fa-angle-down"/>
                </div>
                <div className={"dropdown-list" + (this.state.listVisible ? " show" : "")}>
                    {
                        this.props.choices.map((choice) => {
                            return (
                                <div key={JSON.stringify(choice)} onClick={(e) => this.props.callback(choice)}>
                                    <span>{this.props.choiceToString(choice)}</span>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    renderListItems() {

    }
}

Dropdown.propTypes = {
    choices: propTypes.array.isRequired,
    currentlySelected: propTypes.object.isRequired,
    choiceToString: propTypes.func.isRequired,
    callback: propTypes.func.isRequired,
    baseZindex: propTypes.number.isRequired
};
