import React, {Component} from 'react';
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore


class SignUpWithSocials extends Component {

    showPopUp = () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
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
        });
        let callback = null;
        let metadataRef = null;
        firebase.auth().onAuthStateChanged(user => {
            // Remove previous listener.
            if (callback) {
                metadataRef.off('value', callback);
            }
            // On user login add new listener.
            if (user) {
                // Check if refresh is required.
                metadataRef = firebase.database().ref('metadata/' + user.uid + '/refreshTime');
                callback = (snapshot) => {
                    // Force refresh to pick up the latest custom claims changes.
                    // Note this is always triggered on first call. Further optimization could be
                    // added to avoid the initial trigger when the token is issued and already contains
                    // the latest claims.
                    user.getIdToken(true);
                };
                // Subscribe new listener to changes on that node.
                metadataRef.on('value', callback);
            }
        });
    }

    render() {
        return (<h1>{this.showPopUp()}</h1>)
    }


};

export default compose(firebaseConnect(),
    connect((state, props) => ({
        ...props,
        auth: state.firebase.auth
    })))(SignUpWithSocials)