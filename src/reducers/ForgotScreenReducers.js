// Action Imports
import {
    FORGOT_MAIL,
    FORGOT_MAIL_CHANGED,
    FORGOT_MAIL_FAILED_SEND,
    FORGOT_MAIL_SUCCESS_SEND,
} from '../actions/types';


// Initialize INITIAL_STATE
const INITIAL_STATE = {
    forgot_email: "",
    loading: false
}

// Switch case for action and payload
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FORGOT_MAIL:
            return { ...state, loading: true }
        case FORGOT_MAIL_CHANGED:
            return { ...state, forgot_email: action.payload }
        case FORGOT_MAIL_SUCCESS_SEND:
            return { ...state, loading: false }
        case FORGOT_MAIL_FAILED_SEND:
            return { ...state, loading: false }
        default:
            return { ...state }
    }
}

