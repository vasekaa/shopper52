import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {firebaseConnect} from "react-redux-firebase";
import {compose} from "redux";
//import classnames from 'classnames'; ToDo check why stoped using
import {NotifyUser} from "../actions/notifyActions";
import Alert from "./layout/Alert";
import HomePage from "./layout/HomePage";

class Login extends Component {
    state = {
        email: "",
        password: ""
    }

    submit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        const {firebase, NotifyUser} = this.props;
        firebase.login({
            email,
            password
        }).catch(err => NotifyUser("Неверный пароль", "error"));
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {email, password} = this.state;
        const {message, messageType} = this.props.notify;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-6 mx-auto">
                        <HomePage></HomePage>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                {message ? (<Alert message={message} messageType={messageType}></Alert>) : null}
                                <h3 className="text-center pb-4 pt-3">
                                    <span className="text-primary"><i className="fas fa-lock"/>Login</span>
                                </h3>
                                <form onSubmit={this.submit}>
                                    <div className="form-group">
                                        <label htmlFor="email" className="">Логин:</label>
                                        <input
                                            type="text"
                                            required
                                            name="email"
                                            onChange={this.onChange}
                                            value={email}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="">Пароль:</label>
                                        <input type="password"
                                               required
                                               name="password"
                                               onChange={this.onChange}
                                               value={password}
                                               className="form-control"
                                        />
                                    </div>
                                    <input type="submit" className="btn btn-primary btn-block" value="Войти"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    firestore: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired
}

export default compose(firebaseConnect(),
    connect((state, props) => ({
        notify: state.notify
    }), {NotifyUser}))(Login)