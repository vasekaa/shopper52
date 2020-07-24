import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getEvents} from "../actions/eventActions";
import Order from "./Order";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import Spinner from "./layout/spinner";

class Orders extends Component {

    onNewOrderClick = (e) => {
        e.preventDefault();
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;
        const {firestore} = this.props;

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
                true
        };


        firestore.add({collection: "Orders"}, newOrder).then(() => this.props.history.push("/"));
    }
    onClick = (id) => {
        this.props.history.push(`/order/${id}`);
    }

    render() {
        const {Orders} = this.props;
        //const Orders = [{id:"1",title:"1",body:"tesst"}]
        if (Orders)
            return (
                <div className="container">
                    <div className="row">
                        <ul className="list-group col-12">
                            {Orders.map(order => (
                                <li className="list-group-item" onClick={this.onClick.bind(this, order.id)}>
                                    <Order Order={order}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="row justify-content-end">
                        <div className="col-md-4 col-lg-2">
                            <i className="btn btn-primary btn-block" onClick={this.onNewOrderClick}>Add</i>
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

export default compose(firestoreConnect([{collection: 'Orders'}]), connect((state, props) => ({Orders: state.firestore.ordered.Orders})))(Orders);