import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AppNavBar from "./components/layout/AppNavBar";
import Orders from "./components/Orders";
import 'bootstrap/dist/css/bootstrap.min.css';

import {Provider} from 'react-redux';
import AddEvent from "./components/AddOrder";
import OrderDetails from "./components/OrderDetails";

import {store, rrfProps} from "./store";
import {ReactReduxFirebaseProvider} from 'react-redux-firebase'
import Departments from "./components/Departments";
import Products from "./components/Products";
import Login from "./components/Login";
import {UserIsAuthenticated,UserIsNotAuthenticated} from "./helpers/auth";

function App() {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <Router>
                    <div className="App">
                        <AppNavBar></AppNavBar>
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={UserIsAuthenticated(Orders)}/>
                                <Route exact path="/departments" component={UserIsAuthenticated(Departments)}/>
                                <Route exact path="/order/add/" component={UserIsAuthenticated(AddEvent)}/>
                                <Route exact path="/order/:id" component={UserIsAuthenticated(OrderDetails)}/>
                                <Route exact path="/products" component={UserIsAuthenticated(Products)}/>
                                <Route exact path="/login" component={UserIsNotAuthenticated(Login)}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </ReactReduxFirebaseProvider>
        </Provider>
    );
}

export default App;
