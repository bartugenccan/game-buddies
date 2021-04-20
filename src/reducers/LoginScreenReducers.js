// Actions Imports
import {
    LOGIN_EMAIL_CHANGED,
    LOGIN_PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL
} from "../actions/types";


// Initialize INITIAL_STATE
const INITIAL_STATE = {
    email: "",
    password: "",
    loading: false
};

// Switch case for action and payload
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_EMAIL_CHANGED:
            return { ...state, email: action.payload }
        case LOGIN_PASSWORD_CHANGED:
            return { ...state, password: action.payload }
        case LOGIN_USER:
            return { ...state, loading: true }
        case LOGIN_USER_FAIL:
            return { ...state, loading: false }
        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false }
        default:
            return { ...state }
    }
}