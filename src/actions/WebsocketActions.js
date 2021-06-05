import {
  WS_CLOSE,
  WS_INIT,
  SEND_NOTIFICATION,
  SEND_REQUEST,
  WS_MATCH,
} from './types';

export const ws_init = () => {
  return dispatch => {
    dispatch({
      type: WS_INIT,
    });
  };
};

export const ws_close = () => {
  return dispatch => {
    dispatch({
      type: WS_CLOSE,
    });
  };
};

export const send_notification = (token, title, body) => {
  return dispatch => {
    dispatch({
      type: SEND_NOTIFICATION,
      token: token,
      data: {title: title, body: body},
    });
  };
};

export const send_request = (token, username, game, avatar_url, uid) => {
  return dispatch => {
    dispatch({
      type: SEND_REQUEST,
      token: token,
      data: {
        userName: username,
        gameName: game,
        avatar_url: avatar_url,
        uid: uid,
      },
    });
  };
};

export const ws_match = (
  uid1,
  uid2,
  game,
  avatar1,
  avatar2,
  username1,
  username2,
) => {
  return dispatch => {
    dispatch({
      type: WS_MATCH,
      game: game,
      user1: {
        uid: uid1,
        username: username1,
        avatar: avatar1,
      },
      user2: {
        uid: uid2,
        username: username2,
        avatar: avatar2,
      },
    });
  };
};
