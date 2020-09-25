import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import classnames from "classnames";

class OrderItem extends Component {
    state = {
        ItemQuantity: this.props.matchItem.ItemQuantity,
        ItemPrice: this.props.matchItem.ItemPrice,
        ItemName: this.props.matchItem.ItemName,
        key: this.props.matchItem.id,
        showPriceUpdate: false,
        isCompleted: this.props.matchItem.isCompleted || false
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this);
        const {orderId, firestore, matchItem} = this.props;
        const newOrderItem = {
            ...matchItem,
            ItemQuantity: this.state.ItemQuantity,
            ItemPrice: this.state.ItemPrice,
            isCompleted: this.state.isCompleted
        };
        this.setState({showPriceUpdate: !this.state.showPriceUpdate})
        if (this.state.isNew) {
            firestore.add({collection: "Orders"}, newOrderItem)/*.then(()=>this.props.history.push("/"))*/;
        } else {
            console.log(newOrderItem);
            firestore.update(
                {
                    collection: 'Orders',
                    doc: orderId,
                    subcollections: [{collection: 'OrderItems', doc: matchItem.id}],
                }, newOrderItem);
        }

    }

    onIsCompleteChange = (e) => {
//TODO check why after SetState State value is not updated imideatly - stil.l hassold value
        const {orderId, firestore, matchItem} = this.props;
        let newOrderItem = {...matchItem, isCompleted: !this.state.isCompleted};
        this.setState({isCompleted: !this.state.isCompleted});
        firestore.update(
            {
                collection: 'Orders',
                doc: orderId,
                subcollections: [{collection: 'OrderItems', doc: matchItem.id}],
            }, newOrderItem);
    }


    onDeleteOrderItem = (e) => {
        e.preventDefault();
        const {orderId, firestore} = this.props;
        firestore.delete(
            {
                collection: 'Orders',
                doc: orderId,
                subcollections: [{collection: 'OrderItems', doc: this.state.key}]
            });

    }

    render() {
        const {index} = this.props;
        const {ItemQuantity, ItemPrice, ItemName, isCompleted, showPriceUpdate} = this.state;

        return (
            <div>
                <div id={"collapse_" + index} className="collapse show"
                     aria-labelledby={"heading_" + index}
                     data-parent={"#OrdersAccordion" + index}>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col-5">
                                    <input
                                        type="text"
                                        className={classnames("shadow-none", 'form-control-plaintext ', {'text-decoration': isCompleted ? 'line-through' : "none"})}
                                        name='ItemName'
                                        value={ItemName}
                                        readOnly={true}
                                        style={{textDecoration: classnames({'line-through': isCompleted}, {'inherit': !isCompleted})}}
                                        onClick={this.onIsCompleteChange}
                                    />
                                </div>
                                <div className="col-3">
                                    <input
                                        type="text"
                                        className={classnames('mr-sm-2', {'form-control p-0 m-0': showPriceUpdate}, {'form-control-plaintext p-0 m-0': !showPriceUpdate})}
                                        name='ItemPrice'
                                        value={ItemPrice}
                                        placeholder=''
                                        readOnly={!showPriceUpdate}
                                        style={{textDecoration: classnames({'line-through': isCompleted}, {'inherit': !isCompleted})}}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-2">
                                    <input
                                        type="text"
                                        className={classnames('mr-sm-2', {'form-control p-0 m-0': showPriceUpdate}, {'form-control-plaintext p-0 m-0': !showPriceUpdate})}
                                        name='ItemQuantity'
                                        value={ItemQuantity}
                                        placeholder=''
                                        readOnly={!showPriceUpdate}
                                        style={{textDecoration: classnames({'line-through': isCompleted}, {'inherit': !isCompleted})}}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-2">
                                    <button type="submit"
                                            className="btn text-primary btn-floating btn-lg"
                                            hidden={!showPriceUpdate} aria-hidden="true"
                                    ><i className="fas fa-check">

                                    </i></button>
                                    <a className="btn-floating btn-lg" href="#!"
                                       hidden={showPriceUpdate}
                                       onClick={() => this.setState({showPriceUpdate: !showPriceUpdate})}>
                                        <i className="fas fa-pencil-alt ">

                                        </i></a>
                                    <a className="btn-floating btn-lg" href="#!"
                                       onClick={this.onDeleteOrderItem.bind(this)}>
                                        <i className="fas fa-trash ">

                                        </i></a>
                                </div>
                            </div>
                        </form>
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
OrderItem.propTypes = {
    firestore: PropTypes.object.isRequired,
    matchItem: PropTypes.object.isRequired,
    index: PropTypes.number,
    key: PropTypes.number,
    orderId: PropTypes.number
};
export default compose(firestoreConnect(), connect(mapStateToProps))(OrderItem);