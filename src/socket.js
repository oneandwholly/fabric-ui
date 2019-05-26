import io from 'socket.io-client'
const socket = io();

socket.on('connect', (socket) => {
    console.log('connected')
});

export default socket