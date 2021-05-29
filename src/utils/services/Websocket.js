import io from 'socket.io-client';

const SERVER_URL = 'ws://207.154.211.28:8000/';

/*
const socket = io(SERVER_URL, {
  transports: ['websocket'],
  jsonp: false,
});

export default socket; */

export default class WS {
  constructor() {}

  connect() {
    this.client = io(SERVER_URL, {
      transports: ['websocket'],
      jsonp: false,
    });
  }

  disconnect() {
    this.client.disconnect();
  }

  sendMessage(token, title, body) {
    this.client.send(
      JSON.stringify({
        type: 'Notification',
        token: token,
        notification: {
          title: title,
          body: body,
        },
      }),
    );
  }

  sendRequest(token, userName, game, avatar_url, uid) {
    this.client.send(
      JSON.stringify({
        type: 'Request',
        token: token,
        data: {
          userName: userName,
          gameName: game,
          avatar_url: avatar_url,
          uid: uid,
        },
      }),
    );
  }

  sendWsForMatch(uid1, uid2, game, avatar1, avatar2, username1, username2) {
    this.client.send(
      JSON.stringify({
        type: 'Match',
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
      }),
    );
  }
}
