// Actions Imports
import {
    REGISTER_EMAIL_CHANGED,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_PASSWORD_CHANGED
} from "../actions/types";

// Initialize INITIAL_STATE
const INITIAL_STATE = {
    register_email: "",
    register_pasword: "",
    loading: false
}

// Switch case for action and paylaod
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_EMAIL_CHANGED:
            return { ...state, register_email: action.payload }
        case REGISTER_PASSWORD_CHANGED:
            return { ...state, register_pasword: action.payload }
        case REGISTER_USER:
            return { ...state, loading: true }
        case REGISTER_USER_FAIL:
            return { ...state, loading: false }
        case REGISTER_USER_SUCCESS:
            return { ...state, loading: false }
        default:
            return { ...state }
    }
}

