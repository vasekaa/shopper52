import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import classnames from 'classnames';
import Select from 'react-select';
import Creatable, {makeCreatableSelect} from 'react-select/creatable';
import Spinner from "./layout/spinner";


class Products extends Component {
    state = {
        Name: "",
        Price: "",
        Department: "",
        errorText: ""
    }

    onNewProduсtClick = (e) => {
        e.preventDefault();
        const {firestore, Products} = this.props;
        const Product = {...this.state};
        if (Products.filter((prd) =>
            prd.Name == Product.Name
        ).length == 0)
            firestore.add({collection: "Products"}, Product).then(() => this.setState({
                Name: "",
                Price: "",
                Department: ""
            }));
        else {
            this.setState({errorText: "Такой товар уже есть"});
        }
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value, errorText: ""});
    }

    render() {
        const {Products, Departments} = this.props;
        const Product = {...this.state};
        const confirmGroupClass = classnames('form-control',
            {'is-invalid': Product.errorText !== ""}
        );
        if (Products && Departments) {
            const DepartmentsNames = Array.from(Departments, dpt => ({value: dpt.Name, label: dpt.Name}));
            return (
                <div className="container mt-5">
                    <div className="row mb-md-4">
                        <div className="col-12">
                            <ul className="list-group ">
                                {Products.map(product => (
                                    <li className="list-group-item">
                                        {product.Name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <form onSubmit={this.onNewProduсtClick.bind(this)}>
                                <div className="row">
                                    <div className="col-8 col-sm-5">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className={confirmGroupClass}
                                                name='Name'
                                                value={this.state.Name}
                                                required
                                                placeholder='Название'
                                                onChange={this.onChange}
                                            />
                                            <div className="invalid-tooltip">
                                                {Product.errorText}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 col-sm-2">
                                        <input
                                            type="text"
                                            className="form-control "
                                            name='Price'
                                            value={this.state.Price}
                                            placeholder='Цена'
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-8 col-sm-3">
                                        <Creatable
                                            options={DepartmentsNames}
                                            placeholder={"Отдел"}
                                            isClearable
                                            onChange={(opt, meta) => console.log(opt, meta)}
                                        />
                                    </div>
                                    <div className="col-4 col-sm-2">
                                        <button
                                            type="submit"
                                            className="btn  btn-primary">
                                            Добавить
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Spinner/>
        }
    }
}


Products.propTypes = {
    firestore: PropTypes.object.isRequired,
    Products: PropTypes.array,
    Departments: PropTypes.array
}

export default compose(firestoreConnect([{collection: 'Products'}, {collection: 'Departments'}]),
    connect((state, props) => (
        {
            Products: state.firestore.ordered.Products,
            Departments: state.firestore.ordered.Departments
        }
    )))(Products);