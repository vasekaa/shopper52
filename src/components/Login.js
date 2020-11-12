import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {firebaseConnect} from "react-redux-firebase";
import {compose} from "redux";
//import classnames from 'classnames'; ToDo check why stoped using
import {NotifyUser} from "../actions/notifyActions";
import Alert from "./layout/Alert";
import HomePage from "./layout/HomePage";
import {Link} from "react-router-dom";
import spinner from "./layout/spinner.gif";
import facebooksvg from "./layout/facebook-logo.svg"
import googlesvg from "./layout/google-logo.svg"

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
                                <p className="card-text">
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
                                </p>
                                <p className="card-text"></p>
                                <p className="card-text mt-2">
                                    <hr className="my-3"/>
                                </p>
                                <p className="card-text text-center"> Или войдите с помощью: </p>
                                <p className="card-text">
                                    <ul className="nav" style={{
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <li className="nav-item">
                                            <Link to="/signInSocialsFB"
                                                  className="nav-link">
                                                <img src={facebooksvg} alt="facebook logo"
                                                     style={{width: '20px', margin: 'auto'}}/>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/signInSocials"
                                                  className="nav-link">
                                                <img src={googlesvg} alt="google logo"
                                                     style={{width: '40px', margin: 'auto'}}/>
                                            </Link>
                                        </li>

                                    </ul>
                                </p>
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