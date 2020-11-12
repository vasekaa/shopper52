//import React from 'react' ToDo check if can beremoved, camefrom example
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
import {createStore, combineReducers} from 'redux'
import {firebaseReducer} from 'react-redux-firebase'
import {createFirestoreInstance, firestoreReducer} from 'redux-firestore' // <- needed if using firestore
import notifyReducer from "./reducers/notifyReducer";

const fbConfig = {
    apiKey: "AIzaSyAmVSnsKZr23rNhDXAiWBfJIqHEhEwNMvM",
    authDomain: "zakupixyz.firebaseapp.com",
    databaseURL: "https://zakupixyz.firebaseio.com",
    projectId: "zakupixyz",
    storageBucket: "zakupixyz.appspot.com",
    messagingSenderId: "221696221809",
    appId: "1:221696221809:web:e921b87fa090a80c53f1d0",
    measurementId: "G-RX79NDWHXV"
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)
//firebase.analytics();
// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore


// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore,
    notify:notifyReducer
})

// Create store with reducers and initial state
const initialState = {}
export const store = createStore(rootReducer, initialState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
}