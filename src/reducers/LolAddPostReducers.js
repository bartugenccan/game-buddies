// Action Imports
import {
  SET_WANTS_LANE_LOL,
  SET_PLAYING_LANE_LOL,
  SET_VOICE_CHAT_LOL,
  SET_MODAL_VISIBILITY,
} from '../actions/types';

// Initialize INITIAL_STATE
const INITIAL_STATE = {
  playing_lane: [],
  wanted_lane: [],
  voice_chat: null,
  modal_visibility: false,
};

// Switch case for action and payload
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_WANTS_LANE_LOL:
      return {...state, wanted_lane: action.payload};
    case SET_PLAYING_LANE_LOL:
      return {...state, playing_lane: action.payload};
    case SET_VOICE_CHAT_LOL:
      return {...state, voice_chat: action.payload};
    case SET_MODAL_VISIBILITY:
      return {...state, modal_visibility: action.payload};
    default:
      return {...state};
  }
};
