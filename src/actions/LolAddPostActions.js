// Types Import
import {
  SET_WANTS_LANE_LOL,
  SET_PLAYING_LANE_LOL,
  SET_VOICE_CHAT_LOL,
  SET_MODAL_VISIBILITY,
} from './types';

export const set_playing_lane_lol = value => {
  return dispatch => {
    dispatch({
      type: SET_PLAYING_LANE_LOL,
      payload: value,
    });
  };
};

export const set_wants_lane_lol = value => {
  return dispatch => {
    dispatch({
      type: SET_WANTS_LANE_LOL,
      payload: value,
    });
  };
};

export const set_voice_chat_lol = value => {
  return dispatch => {
    dispatch({
      type: SET_VOICE_CHAT_LOL,
      payload: value,
    });
  };
};

export const set_modal_visibility = value => {
  return dispatch => {
    dispatch({
      type: SET_MODAL_VISIBILITY,
      payload: value,
    });
  };
};
