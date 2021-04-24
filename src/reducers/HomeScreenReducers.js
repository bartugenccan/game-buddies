import {
    GAMES_SET,
    SET_LOADING_HOME
} from '../actions/types';

const INITIAL_STATE = {
    games_arr : [],
    loading : false
}

// Switch case for action and payload
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GAMES_SET:
            return { ...state, games_arr: action.payload }
        case SET_LOADING_HOME:
            return {...state , loading : action.payload}
        default:
            return { ...state }
    }
}
