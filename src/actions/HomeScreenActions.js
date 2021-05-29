import {GAMES_SET, SET_LOADING_HOME} from './types';

export const games_set = arr => {
  return dispatch => {
    dispatch({
      type: GAMES_SET,
      payload: arr,
    });
  };
};

export const set_loading_home = val => {
  return dispatch => {
    dispatch({
      type: SET_LOADING_HOME,
      payload: val,
    });
  };
};
