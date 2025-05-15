import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app =  express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
})

// to store online users with their socket ids
const userSocketMap = {}; // { userId: socketId }

export const getReceiverSocketId = (userId) => {
    return userSocketMap[userId];
}

io.on('connection', (socket) => {
    console.log('A user connected: ', socket.id);
    const userId = socket.handshake.query.userId;//that query is passed from the client side
    if(userId){
        userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));
    // Emit the online users to all connected clients, kind of like a broadcast
    socket.on('disconnect', ()=>{
        console.log('A user disconnected: ', socket.id);
        // remove the user from the userSocketMap
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));//again broadcast the online users
    })
});

export {app, server, io};
//the above code is used to create a socket server using express and socket.io