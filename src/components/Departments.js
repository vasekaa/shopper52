import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import Spinner from "./layout/spinner";

class Departments extends Component {
    state = {
        Name: "",
        Order: "1"
    }

    onNewDepartmentClick = (e) => {
        e.preventDefault();
        const {firestore, Departments} = this.props;
        const Department = {...this.state};
        if (Departments.filter((dpt) =>
            dpt.Name === Department.Name
        ).length === 0)
            firestore.add({collection: "Departments"}, Department).then(()=>this.setState({Name:""}));
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {Departments} = this.props;
        if (Departments)
            return (
                <div className="container mt-5">
                    <div className="row">
                        <ul className="list-group col-12">
                            {Departments.map(department => (
                                <li className="list-group-item">
                                    {department.Name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="row">
                        <form onSubmit={this.onNewDepartmentClick.bind(this)} className="form-inline col-12  mt-3">
                            <div className="input-group flex-fill">
                                <input
                                    type="text"
                                    className="form-control"
                                    name='Name'
                                    value={this.state.Name}
                                    required
                                    placeholder='Название'
                                    onChange={this.onChange}
                                />
                                <input
                                    type="text"
                                    className="form-control "
                                    name='Order'
                                    value={this.state.Order}
                                    placeholder='Порядок'
                                    onChange={this.onChange}
                                />
                                <div className="input-group-append">
                                    <button type="submit"
                                            className="btn  btn-primary"
                                    >Добавить
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            );
        else {
            return <Spinner/>
        }
    }
}


Departments.propTypes = {
    firestore: PropTypes.object.isRequired,
    Departments: PropTypes.array
}

export default compose(firestoreConnect([{collection: 'Departments'}]), connect((state, props) => ({Departments: state.firestore.ordered.Departments})))(Departments);