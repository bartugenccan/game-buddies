import io from 'socket.io-client';

const SERVER_URL = 'ws://207.154.211.28:8000/';

const socket = io(SERVER_URL, {
  transports: ['websocket'],
  jsonp: false,
});

export default socket;
