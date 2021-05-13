const SERVER_URL = 'ws://192.168.1.40:9999';

import socketIOClient from 'socket.io-client';

class Websocket {
  connect() {
    this.client = socketIOClient(SERVER_URL, {
      transports: ['websocket'],
    });
    this.client.connect();
  }

  disconnect() {
    this.client.disconnect();
  }

  sendMessage(nickname, text, tokenS) {
    this.client.send(
      JSON.stringify({
        token: tokenS,
        type: 'Notification',
        notification: {title: nickname, body: text},
      }),
    );
  }
}

export {Websocket};
