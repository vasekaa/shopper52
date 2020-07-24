import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {addEvent} from "../actions/eventActions";
import { v4 as uuidv4 } from 'uuid';

class AddOrder extends Component {
    state = {
        id: "",
        title: "",
        body: ""
    }
    OnChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        const id = uuidv4();
        const newEvent = {...this.state};
        this.props.addEvent(newEvent);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to={"/"} className="btn btn-link">
                            <i className="fas fa-arrow-circle-left"></i> к заказам
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">Новый заказ</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Название</label>
                                <input type="text"
                                       className="form-control"
                                       name="title"
                                       minLength="2"
                                       required
                                       onChange={this.OnChange}
                                       defaultValue={this.state.title}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Body</label>
                                <input type="text"
                                       className="form-control"
                                       name="body"
                                       onChange={this.OnChange}
                                       defaultValue={this.state.body}
                                />
                            </div>
                            <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, {addEvent})(AddOrder);