import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

class OrderItem extends Component {
    state = {
        ItemQuantity: this.props.matchItem.ItemQuantity,
        ItemPrice: this.props.matchItem.ItemPrice,
        ItemName: this.props.matchItem.ItemName,
        key:this.props.matchItem.id,
        showPriceUpdate: false,
        isCompleted: false
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {orderId, firestore, matchItem} = this.props;
        let newOrderItem = {...matchItem};
        newOrderItem = {ItemQuantity: this.state.ItemQuantity, ItemPrice: this.state.ItemPrice};
        if (this.state.isNew) {
            alert("10");
            firestore.add({collection: "Orders"}, newOrderItem)/*.then(()=>this.props.history.push("/"))*/;
        } else {
            firestore.update(
                {
                    collection: 'Orders',
                    doc: orderId,
                    subcollections: [{collection: 'OrderItems', doc: matchItem.id}],
                }, newOrderItem);
        }

    }
    onDeleteOrderItem = (e) => {
        e.preventDefault();
        const {orderId, firestore} = this.props;
        firestore.delete(
            {
                collection: 'Orders',
                doc: orderId,
                subcollections: [{collection: 'OrderItems', doc: this.state.key}]});

    }

    drawItemPrice = (showPriceUpdate, ItemQuantity, ItemPrice, ItemName, isCompleted) => {

        const ItemSection = (
            <div className="row" onClick={() => this.setState({isCompleted: !this.state.isCompleted})}>
                <div className="col-sm-4">
                    <span className="secondary-text">{ItemName}</span>
                </div>
                <div className="col-sm-4">
                    <span className="secondary-text">{ItemPrice}</span>
                </div>
                <div className="col-sm-3">
                    <span className="secondary-text">{ItemQuantity}</span>
                </div>
            </div>
        );
        let ItemFinal = '';
        if (isCompleted) {
            ItemFinal = (<del>
                {ItemSection}
            </del>)
        } else {
            ItemFinal = ItemSection;
        }

        if (showPriceUpdate && !isCompleted) {
            return (
                <form onSubmit={this.onSubmit.bind(this)} className="form-inline">
                    <div className="input-group ">
                        <input
                            type="text"
                            className="form-control-plaintext"
                            name='ItemName'
                            value={ItemName}
                            readOnly={true}
                        />
                        <input
                            type="text"
                            className="form-control mr-sm-2"
                            name='ItemPrice'
                            value={ItemPrice}
                            placeholder=''
                            onChange={this.onChange}
                        />
                        <input
                            type="text"
                            className="form-control mr-sm-2"
                            name='ItemQuantity'
                            value={ItemQuantity}
                            placeholder=''
                            onChange={this.onChange}
                        />
                        <div className="input-group-append">
                            <button type="submit"
                                    className="btn hidden"
                            ><i className="fas fa-check"></i></button>
                        </div>
                    </div>

                </form>
            )
        } else {
            return (
                <div>{ItemFinal}</div>
            )
        }
    }

    render() {
        const {index} = this.props;
        const {ItemQuantity, ItemPrice, ItemName, showPriceUpdate, isCompleted} = this.state;

        return (
            <div>
                <div id={"collapse_" + index} className="collapse show"
                     aria-labelledby={"heading_" + index}
                     data-parent={"#OrdersAccordion" + index}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-10">
                                {this.drawItemPrice(showPriceUpdate, ItemQuantity, ItemPrice, ItemName, isCompleted)}
                            </div>
                            <div className="col-sm-2">
                                <a href="#!"
                                   onClick={() => this.setState({showPriceUpdate: !this.state.showPriceUpdate})}>
                                    <i className="fas fa-pencil-alt "></i></a>
                                <a href="#!"
                                   onClick={this.onDeleteOrderItem.bind(this)}>
                                    <i className="fas fa-trash "></i></a>
                            </div>
                        </div>
                    </div>

                </div>
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

export default compose(firestoreConnect(), connect(mapStateToProps))(OrderItem);