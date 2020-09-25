import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {compose} from "redux";
import {connect} from "react-redux";
import {firebaseConnect} from 'react-redux-firebase';

class AppNavBar extends Component {
    state = {
        isAuthenticated: false
    }

    onLogout = (e) => {
        e.preventDefault()
        const {firebase} = this.props;
        firebase.logout();
    }

    static getDerivedStateFromProps(props, state) {
        const {auth} = props;
        if (auth.uid) {
            return {isAuthenticated: true}
        } else {
            return {isAuthenticated: false}
        }
    }

    render() {
        return (
            <div className="container">
                {this.state.isAuthenticated ?
                    (
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <Link to="/" className="nav-link">
                                <h3>Zakupi.xyz</h3>
                            </Link>
                            <button className="navbar-toggler mr-auto" type="button" data-toggle="collapse"
                                    data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

                                <ul className="nav navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li className="nav-item">
                                        <Link to="/products" className="nav-link">
                                            <i className="fa fa-shopping-bag"/> Продукты
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/templates" className="nav-link">
                                            <i className="fas fa-clone"/> Шаблоны заказов
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/departments" className="nav-link">
                                            <i className="fa fa-folder-open"/> Отделы
                                        </Link>
                                    </li>
                                </ul>


                            </div>
                            <ul className="nav navbar-nav navbar-right">
                                <li className="nav-item">
                                    <a href="#!" className="nav-link">{this.props.auth.email}</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#!" className="nav-link" onClick={this.onLogout}>Logout</a>
                                </li>
                            </ul>
                        </nav>
                    ) :
                    (<div>
                            <ul className="nav navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        <i className="fa fa-door-open"/> Войти
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>
        );
    };
}

AppNavBar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(AppNavBar);