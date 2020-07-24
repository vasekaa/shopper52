import {
    GET_EVENTS,
    ADD_EVENT,
    DELETE_EVENT,
    EVENTS_ERROR
} from './types';
import axios from 'axios';

export const getEvents = () => async dispatch => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    dispatch({
        type: GET_EVENTS,
        payload: res.data
    });

};

export const addEvent = event => async dispatch => {
    const res = await axios.post(`https://jsonplaceholder.typicode.com/posts`,event, { crossdomain: true });
    dispatch({
        type: ADD_EVENT,
        payload: res.data
    });

};

export const deleteEvent = id => async dispatch => {
    dispatch({
        type: DELETE_EVENT,
        payload: id
    });

};
