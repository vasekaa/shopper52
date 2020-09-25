//import React from 'react' ToDo check if can beremoved, camefrom example
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
import {createStore, combineReducers} from 'redux'
import {firebaseReducer} from 'react-redux-firebase'
import {createFirestoreInstance, firestoreReducer} from 'redux-firestore' // <- needed if using firestore
import notifyReducer from "./reducers/notifyReducer";

const fbConfig = {
    apiKey: "AIzaSyAkv-kX30pVYPDLhQqXz_IUiUHt1_c3QIE",
    authDomain: "shopinglist-d5990.firebaseapp.com",
    databaseURL: "https://shopinglist-d5990.firebaseio.com",
    projectId: "shopinglist-d5990",
    storageBucket: "shopinglist-d5990.appspot.com",
    messagingSenderId: "497372884451",
    appId: "1:497372884451:web:b603e9e7a9e172f8b884d6",
    measurementId: "G-WTZ78SZB5J"
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)
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