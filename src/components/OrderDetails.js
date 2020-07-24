import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import Spinner from "./layout/spinner";
import Order from "./Order";
import OrderItem from "./OrderItem";
import Creatable from "react-select/creatable/dist/react-select.esm";

class OrderDetails extends Component {
    state = {
        showNewItem: false,
        ItemQuantity: "1",
        ItemPrice: "",
        ItemDepartment: "",
        ItemName: ""

    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    onChangeOffer = selectedOption => {
        this.setState(
            {ItemName: selectedOption != null ? selectedOption.value:"" },
            () => console.log(`Option selected:`, this.state.ItemName)
        );
    };

    addOrderItem = (e) => {
        e.preventDefault();
        const {order, firestore, departmentsAll} = this.props;
        let newOrderItem = {
            ItemName: this.state.ItemName,
            ItemQuantity: this.state.ItemQuantity,
            ItemPrice: this.state.ItemPrice,
            DepartmentName: this.state.ItemDepartment
        };

        firestore.add(
            {
                collection: 'Orders',
                doc: order.id,
                subcollections: [{collection: 'OrderItems'}],
            }, newOrderItem).then(() => {
            this.setState({...this.state, ItemName: "", ItemQuantity: "", ItemPrice: ""})
        });
    }


    render() {
        const {order, orderItems, departmentsAll, products} = this.props;
        const {showNewItem, ItemQuantity, ItemPrice, ItemName, ItemDepartment} = this.state;


        if (order && orderItems && departmentsAll && products) {
            const ProductsNames = Array.from(products, prd => ({value: prd.Name, label: prd.Name}));
            let ItemForm = '';
            if (showNewItem) {
                ItemForm = (
                    <form onSubmit={this.addOrderItem.bind(this)} className=" mb-md-4 ">
                        <div className="row ">
                            <div className="col-12 col-md-10 mt-2">
                                {/*<input
                                    type="text"
                                    className="form-control "
                                    name='ItemName'
                                    value={ItemName}
                                    required
                                    placeholder='Название'
                                    onChange={this.onChange}
                                />*/}
                                <Creatable
                                    options={ProductsNames}
                                    placeholder={"Название"}
                                    isClearable
                                    onChange={this.onChangeOffer}
                                />
                            </div>
                            <div className="col-12 col-md-10 my-2">
                                <select
                                    className="form-control"
                                    id="DeptSel"
                                    name='ItemDepartment'
                                    onChange={this.onChange}
                                    required
                                    value={ItemDepartment}
                                >
                                    <option value="" disabled selected>Выберите отдел</option>
                                    {
                                        departmentsAll.map((department, index) => (<option>{department.Name}</option>))
                                    }
                                </select>
                            </div>
                            <div className="col-6 col-md-5 mb-2">
                                <input
                                    type="text"
                                    className="form-control mr-sm-2"
                                    name='ItemPrice'
                                    value={ItemPrice}
                                    placeholder='Цена'
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-6 col-md-5 mb-2">
                                <input
                                    type="text"
                                    className="form-control mr-sm-2"
                                    name='ItemQuantity'
                                    value={ItemQuantity}
                                    placeholder='Количество'
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-12 col-md-10 mx-auto mb-2">
                                <button type="submit"
                                        className="btn btn-block btn-primary"
                                ><i className="fas fa-check " style={{color: "green"}}></i> Добавить
                                </button>
                            </div>
                        </div>


                    </form>
                )
            } else {
                ItemForm = null;
            }

            return (
                <div>
                    <div className="row">
                        <div className="col-sm-12">
                            <Link to={"/"} className="btn btn-link">
                                <i className="fas fa-arrow-circle-left"></i> back to Dashboard
                            </Link>
                            <h3 className="">№: {order.CreationDate}
                                <a href="#!" onClick={() => this.setState({showNewItem: !this.state.showNewItem})}>
                                    <i className="fas fa-plus fa-pull-right mr-4"></i></a></h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            {ItemForm}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            {departmentsAll.map((department, index) => (
                                <div className="accordion" id={"OrdersAccordion" + department.id}>
                                    <div className="card">
                                        <div className="card-header" id={"heading_" + department.id}>
                                            <a className="btn btn-link btn-block text-left text-xl-left"
                                               type="button"
                                               data-toggle="collapse" data-target={"#collapse_" + department.id}
                                               aria-expanded="true"
                                               aria-controls={"collapse_" + department.id}>
                                                <h4>{department.Name}</h4>
                                            </a>
                                        </div>
                                        {orderItems.filter((item) =>
                                            item.DepartmentName === department.Name
                                        ).map((matchItem, key) =>
                                            <OrderItem matchItem={matchItem} index={department.id} key={matchItem.id}
                                                       orderId={order.id}></OrderItem>
                                        )}

                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>

                </div>
            );
        } else
            return <Spinner/>
    }
}

const mapStateToProps = ({firestore}, props) => {
    return {
        ...props,
        order: firestore.ordered.Order && firestore.ordered.Order[0],
        orderItems: firestore.ordered.OrderItems,
        departmentsAll: firestore.ordered.DepartmentsAll,
        products: firestore.ordered.Products
    };
};

export default compose(firestoreConnect((props) => {

    return [{collection: 'Products'}
        , {
            collection: 'Orders',
            storeAs: 'Order',
            doc: props.match.params.id
        }, {
            collection: 'Orders',
            storeAs: 'OrderItems',
            doc: props.match.params.id,
            subcollections: [
                {collection: 'OrderItems'}
            ]
        }, {
            collection: 'Orders',
            storeAs: 'Departments',
            doc: props.match.params.id,
            subcollections: [
                {collection: 'Departments'}
            ]
        }, {
            collection: 'Departments',
            storeAs: 'DepartmentsAll',
        }]
}), connect(mapStateToProps))(OrderDetails);
