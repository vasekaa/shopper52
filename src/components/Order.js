import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

class Order extends Component {



    render() {
        const {Order} = this.props;
        return (
            <div>
                <span>
                    Заказ от: {Order.CreationDate}
                </span>
            </div>
        )
    }
}
const mapStateToProps = ({firestore}, props) => {
    return {
        ...props,
        order: firestore.ordered.Orders && firestore.ordered.Orders[0]
    };
};

export default compose(firestoreConnect(), connect(mapStateToProps))(Order);