import React, {Component} from 'react';
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore


class SignUpWithSocials extends Component {
    state = {
        isError: false
    };

    showPopUp = () => {
        const that = this;
        var provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            return result.user.getIdToken();
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(error);
            if (error.code === "auth/account-exists-with-different-credential") {
                console.log(that);
                that.setState({isError: true});
            }
        });
    }

    render() {
        const {isError} = this.state;
        return (
            <h1>
                {isError ?
                    <div>
                        <div className="container">
                            <div className="row ">
                                <div className="col-3 mx-auto">
                                    <h1 className="text-danger">Ошибка, такой эмэйл уже используется</h1>
                                </div>
                            </div>
                        </div>
                    </div> : this.showPopUp()}
            </h1>
        );
    }


};

export default compose(firebaseConnect(),
    connect((state, props) => ({
        ...props,
        auth: state.firebase.auth
    })))(SignUpWithSocials)