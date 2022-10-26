import { io } from 'socket.io-client';
//const ENDPOINT = 'http://192.168.1.33:5000/';
const ENDPOINT = 'https://trulylivechatbackend.herokuapp.com/';

export const socket = io(ENDPOINT, { transports: ["websocket", "polling", "flashsocket"], forceNew: true });
export let socketId = '';
socket.on('connect', () => {
    socketId = socket.id
})

export default function Home() {
    return <>;
  }