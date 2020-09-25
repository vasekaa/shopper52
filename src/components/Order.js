import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable: false,
            Order: this.props.Order,
            Name: this.props.Order.Name,
            CreationDate: this.props.Order.CreationDate
        }
    }

    changeName(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {isEditable, Name} = this.state;
        return (
            <div>
                <form className="form-inline" onSubmit={this.OnSubmit.bind(this)} onClick={(e) => {
                    if (isEditable) {
                        e.stopPropagation()
                    }
                }}>
                    <div className="form-group mb-2">
                        <label htmlFor="Name" className="sr-only">Name</label>
                        <input
                            type="text"
                            readOnly={!isEditable}
                            className={!isEditable ? "form-control-plaintext" : ""} id="Name" name='Name'
                            //className="form-control-plaintext"
                            id="Name"
                            name='Name'
                            value={Name}
                            onChange={(e) => this.changeName(e)}
                            onClick={(e) => {
                                if (isEditable) e.stopPropagation()
                            }}
                        />
                    </div>
                    <div className="ml-auto">
                        <button className="btn btn-floating btn-lg text-primary" hidden={!isEditable} type="submit"
                                id="button-addon2"
                        ><i className="fas fa-check" aria-hidden="true"></i>
                        </button>
                        <a className="ml-1 btn-floating btn-lg" href="/#"  hidden={isEditable}
                           onClick={(e) => {
                               e.stopPropagation();
                               this.setState({isEditable: !isEditable})
                           }}>
                            <i className="fas fa-pencil-alt "></i></a>
                    </div>
                </form>
            </div>
        )
    }

    OnSubmit = (e) => {
        e.preventDefault();
        this.setState({isEditable: false});
        const {firestore} = this.props;
        const NewOrder = {...this.state.Order, Name: this.state.Name};
        console.log(NewOrder);
        firestore.update(
            {
                collection: 'Orders',
                doc: NewOrder.id
            }, NewOrder);
    }
}

const mapStateToProps = ({firestore}, props) => {
    return {
        ...props,
        order: firestore.ordered.Orders && firestore.ordered.Orders[0]
    };
};

Order.propTypes = {
    firestore: PropTypes.object.isRequired,
    Order: PropTypes.object.isRequired,
    key: PropTypes.number
};

export default compose(firestoreConnect(), connect(mapStateToProps))(Order);