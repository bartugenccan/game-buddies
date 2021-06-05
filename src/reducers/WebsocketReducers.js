import {
  WS_INIT,
  WS_CLOSE,
  SEND_NOTIFICATION,
  SEND_REQUEST,
  WS_MATCH,
} from '../actions/types';

const INITAL_STATE = {
  status: false,
};

import WS from '../utils/services/Websocket';

let client = null;

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case WS_INIT:
      if (state.status == true) {
        return {...state, status: true};
      }

      client = new WS();
      client.connect();
      return {...state, status: true};

    case WS_CLOSE:
      client.disconnect();
      return {...state, status: false};

    case SEND_NOTIFICATION:
      client.sendMessage(
        'eBLr5jnaTJud_kZHqh01Cu:APA91bFbd2G6doqsWxB4-0m1twPQAmNl8IKi9YpzP7GAoO01xw8i0_Xrhr-1s7-yiVsTlBimPq9O9kjw_LPyy-q-CshNtEW-rWzjbZBRYou87KZzizDZPrztlM-s3mmerXVYNa6CawrN',
        action.data.title,
        action.data.body,
      );

      return {...state};

    case SEND_REQUEST:
      client.sendRequest(
        'eBLr5jnaTJud_kZHqh01Cu:APA91bFbd2G6doqsWxB4-0m1twPQAmNl8IKi9YpzP7GAoO01xw8i0_Xrhr-1s7-yiVsTlBimPq9O9kjw_LPyy-q-CshNtEW-rWzjbZBRYou87KZzizDZPrztlM-s3mmerXVYNa6CawrN',
        action.data.userName,
        action.data.gameName,
        action.data.avatar_url,
        action.data.uid,
      );
      return {...state};

    case WS_MATCH:
      client.sendWsForMatch(
        action.user1.uid,
        action.user2.uid,
        action.game,
        action.user1.avatar,
        action.user2.avatar,
        action.user1.username,
        action.user2.username,
      );
      return {...state};

    default:
      return {...state};
  }
};
