import {
    PROFILE_NAME_SET,
    PROFILE_SCREEN_STATS_SET,
    PROFILE_SCREEN_STATS_ADD,
    PROFILE_SCREEN_STATS_DELETE,
    PROFILE_SCREEN_LEAGUE_SET
} from './types';

export const profile_name_set = (val) => {
    return (dispatch) => {
        dispatch({
            type: PROFILE_NAME_SET,
            payload: val
        })
    }
};


export const profile_screen_stats_set = (arr) => {
    return (dispatch) => {
        dispatch({
            type: PROFILE_SCREEN_STATS_SET,
            payload: arr
        })
    }
};

export const profile_screen_stats_add = (item) => {
    return (dispatch) => {
        dispatch({
            type: PROFILE_SCREEN_STATS_ADD,
            newItem: item
        })
    }
}

export const profile_screen_stats_delete = (nameOfgame) => {
    return (dispatch) => {
        dispatch({
            type : PROFILE_SCREEN_STATS_DELETE,
            payload : nameOfgame
        })
    }
}

export const profile_screen_league_set = (nameOfGame , newLeague) => {
    return (dispatch) => {
        dispatch({
            type : PROFILE_SCREEN_LEAGUE_SET,
            gameName : nameOfGame,
            payload : newLeague
        })
    }
}
