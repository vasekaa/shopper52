import {
    GET_EVENTS,
    ADD_EVENT,
    DELETE_EVENT,
    EVENTS_ERROR
} from '../actions/types';

const initialState = {
    events: [],
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            return {
                ...state,
                events: action.payload,
                loading: false
            };
        case ADD_EVENT:
            return {
                ...state,
                events: [...state.events, action.payload],
                loading: false
            };
        case DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter(event => event.id !== action.payload),
                loading: false
            };
        case EVENTS_ERROR:
            console.error(action.payload);
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};