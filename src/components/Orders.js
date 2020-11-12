import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Order from "./Order";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import Spinner from "./layout/spinner";
import {v4 as uuidv4} from "uuid";

class Orders extends Component {
    onNewOrderClick = (e) => {
        e.preventDefault();
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;
        const {firestore, auth} = this.props;

        const newOrder = {
            CompleationDate:
                "",
            CreationDate:
            dateTime,
            Owner:
                "Vasya",
            Status:
                "NEW",
            isTemplate:
                true,
            Name: dateTime,
            Code: uuidv4(),
            Author: auth.uid
        };


        firestore.add({collection: "Orders"}, newOrder).then(() => this.props.history.push("/"));
    }

    onClick(id, e) {
        this.props.history.push(`/order/${id}`);
    }

    render() {
        const {Orders, auth} = this.props;
        if (Orders)
            return (
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <ul className="list-group">
                                {Orders.filter((order) => {
                                    return order.Author === auth.uid
                                }).map((order, index) =>
                                    <li className="list-group-item" onClick={(e) => this.onClick(order.id, e)}>
                                        <Order Order={order} key={index}/>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="row mt-1 justify-content-md-center">
                        <div className="col-10 mx-auto">
                            <i className="btn btn-primary btn-block" onClick={this.onNewOrderClick}>Новый</i>
                        </div>
                    </div>
                </div>
            );
        else {
            return <Spinner/>
        }
    }
}


Orders.propTypes = {
    firestore: PropTypes.object.isRequired,
    Orders: PropTypes.array
}

export default compose(firestoreConnect([{collection: 'Orders'}]), connect(
    (state, props) => (
        {
            Orders: state.firestore.ordered.Orders,
            auth: state.firebase.auth
        }
    )))(Orders);