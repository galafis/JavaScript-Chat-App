/**
 * Real-time Chat Application Server
 * WebSocket-based chat server with Express.js
 * @author Gabriel Demetrios Lafis
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST']
    }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage
const rooms = new Map();
const users = new Map();
const messageHistory = new Map();

const MAX_HISTORY = 100;

/**
 * Chat Room Manager
 */
class ChatRoomManager {
    constructor() {
        this.rooms = rooms;
    }

    createRoom(name, createdBy) {
        const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const room = {
            id: roomId,
            name,
            createdBy,
            createdAt: new Date().toISOString(),
            users: new Set(),
            messageCount: 0
        };
        this.rooms.set(roomId, room);
        messageHistory.set(roomId, []);
        return room;
    }

    getRoom(roomId) {
        return this.rooms.get(roomId);
    }

    listRooms() {
        return Array.from(this.rooms.values()).map(room => ({
            id: room.id,
            name: room.name,
            userCount: room.users.size,
            messageCount: room.messageCount,
            createdAt: room.createdAt
        }));
    }

    addUserToRoom(roomId, userId) {
        const room = this.rooms.get(roomId);
        if (room) {
            room.users.add(userId);
            return true;
        }
        return false;
    }

    removeUserFromRoom(roomId, userId) {
        const room = this.rooms.get(roomId);
        if (room) {
            room.users.delete(userId);
            return true;
        }
        return false;
    }

    addMessage(roomId, message) {
        const history = messageHistory.get(roomId);
        if (history) {
            history.push(message);
            if (history.length > MAX_HISTORY) {
                history.shift();
            }
            const room = this.rooms.get(roomId);
            if (room) room.messageCount++;
        }
    }

    getHistory(roomId, limit = 50) {
        const history = messageHistory.get(roomId) || [];
        return history.slice(-limit);
    }
}

/**
 * User Session Manager
 */
class UserSessionManager {
    constructor() {
        this.users = users;
    }

    registerUser(socketId, username) {
        const user = {
            id: socketId,
            username,
            joinedAt: new Date().toISOString(),
            currentRoom: null,
            status: 'online'
        };
        this.users.set(socketId, user);
        return user;
    }

    getUser(socketId) {
        return this.users.get(socketId);
    }

    removeUser(socketId) {
        const user = this.users.get(socketId);
        this.users.delete(socketId);
        return user;
    }

    getOnlineUsers() {
        return Array.from(this.users.values())
            .filter(u => u.status === 'online')
            .map(u => ({ id: u.id, username: u.username, currentRoom: u.currentRoom }));
    }

    updateUserRoom(socketId, roomId) {
        const user = this.users.get(socketId);
        if (user) {
            user.currentRoom = roomId;
        }
    }
}

const roomManager = new ChatRoomManager();
const userManager = new UserSessionManager();

// Create default room
roomManager.createRoom('General', 'system');

// REST API endpoints
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        connections: users.size
    });
});

app.get('/api/rooms', (req, res) => {
    res.json({ rooms: roomManager.listRooms() });
});

app.get('/api/users', (req, res) => {
    res.json({ users: userManager.getOnlineUsers() });
});

app.get('/api/rooms/:roomId/messages', (req, res) => {
    const limit = parseInt(req.query.limit) || 50;
    const messages = roomManager.getHistory(req.params.roomId, limit);
    res.json({ messages });
});

// WebSocket event handling
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('register', (data) => {
        const { username } = data;
        if (!username || username.trim().length === 0) {
            socket.emit('error', { message: 'Username is required' });
            return;
        }

        const user = userManager.registerUser(socket.id, username.trim());
        socket.emit('registered', { user });
        io.emit('user_list', { users: userManager.getOnlineUsers() });
        console.log(`User registered: ${username}`);
    });

    socket.on('join_room', (data) => {
        const { roomId } = data;
        const user = userManager.getUser(socket.id);

        if (!user) {
            socket.emit('error', { message: 'Please register first' });
            return;
        }

        // Leave current room
        if (user.currentRoom) {
            socket.leave(user.currentRoom);
            roomManager.removeUserFromRoom(user.currentRoom, socket.id);
            io.to(user.currentRoom).emit('user_left', {
                username: user.username,
                roomId: user.currentRoom
            });
        }

        // Join new room
        socket.join(roomId);
        roomManager.addUserToRoom(roomId, socket.id);
        userManager.updateUserRoom(socket.id, roomId);

        // Send history
        const history = roomManager.getHistory(roomId);
        socket.emit('room_joined', { roomId, history });

        io.to(roomId).emit('user_joined', {
            username: user.username,
            roomId
        });
    });

    socket.on('send_message', (data) => {
        const { roomId, content } = data;
        const user = userManager.getUser(socket.id);

        if (!user) {
            socket.emit('error', { message: 'Please register first' });
            return;
        }

        if (!content || content.trim().length === 0) {
            socket.emit('error', { message: 'Message cannot be empty' });
            return;
        }

        const message = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            userId: socket.id,
            username: user.username,
            content: content.trim(),
            roomId,
            timestamp: new Date().toISOString()
        };

        roomManager.addMessage(roomId, message);
        io.to(roomId).emit('new_message', message);
    });

    socket.on('typing', (data) => {
        const { roomId } = data;
        const user = userManager.getUser(socket.id);
        if (user) {
            socket.to(roomId).emit('user_typing', { username: user.username });
        }
    });

    socket.on('stop_typing', (data) => {
        const { roomId } = data;
        const user = userManager.getUser(socket.id);
        if (user) {
            socket.to(roomId).emit('user_stop_typing', { username: user.username });
        }
    });

    socket.on('create_room', (data) => {
        const { name } = data;
        const user = userManager.getUser(socket.id);
        if (!user) {
            socket.emit('error', { message: 'Please register first' });
            return;
        }

        const room = roomManager.createRoom(name, user.username);
        io.emit('room_created', { room: { id: room.id, name: room.name, userCount: 0 } });
    });

    socket.on('disconnect', () => {
        const user = userManager.removeUser(socket.id);
        if (user && user.currentRoom) {
            roomManager.removeUserFromRoom(user.currentRoom, socket.id);
            io.to(user.currentRoom).emit('user_left', {
                username: user.username,
                roomId: user.currentRoom
            });
        }
        io.emit('user_list', { users: userManager.getOnlineUsers() });
        console.log(`Client disconnected: ${socket.id}`);
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Chat server running on port ${PORT}`);
});

module.exports = { app, server, io, ChatRoomManager, UserSessionManager };
