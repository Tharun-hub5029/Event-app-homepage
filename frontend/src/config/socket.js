import io from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';

// const token = localStorage.getItem("_key_");
// const decode = jwtDecode(token);
// const userId = decode.id;

const socket = io('http://localhost:5001',{
    transports:['websocket'],
    reconnectionAttempts:5,
    timeout:5000,
    cors:{origin:"*"},
    
});

socket.on('connect',()=>{
    console.log('connected to server',socket.connected);
});

socket.on('disconnect', ()=>{
    console.log('disconnected from server');
});

export default socket;