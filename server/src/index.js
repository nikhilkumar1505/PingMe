import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import AvatarRoutes from './routes/Avatar.js';
import AuthRoutes from './routes/Auth.js';
import UserRoutes from './routes/User.js';
import { isAuth } from './middleware/auth.js';
import cors from 'cors';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use('/avatar', AvatarRoutes);
app.use('/auth', AuthRoutes);
app.use('/user', isAuth, UserRoutes);

app.use((error, req, res, next) => {
	console.log('errr===>', error);
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message: message, data: data });
});

mongoose
	.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Conneted the mongoDb ' + PORT);
	})
	.catch((err) => console.log('err', err));

const server = app.listen(PORT, () => {
	console.log('lisiting in port ', PORT);
});

const io = new Server(server, { cors: { origin: '*', credentials: true } });

global.onlineUser = {};
io.on('connection', (socket) => {
	socket.on('user-online', (userId) => {
		onlineUser[userId] = socket.id;
		socket.join(userId);
		io.emit('getOnlineUser', onlineUser);
	});
	socket.on('join-room', (room) => {
		socket.join(room);
	});
	socket.on('start-typing', (room) =>
		socket.in(room).emit('started-typing', room)
	);
	socket.on('stop-typing', (room) =>
		socket.in(room).emit('stopped-typing', room)
	);
	socket.on('send-message', (userId, data) => {
		io.to(userId).emit('get-message', data);
		socket.to(data.conversationId).emit('get-message-room', data);
	});
	socket.on('user-offline', (userId) => {
		if (onlineUser[userId]) {
			delete onlineUser[userId];
			io.emit('getOnlineUser', onlineUser);
		}
	});
	socket.on('disconnect', (userId) => {
		if (onlineUser[userId]) {
			delete onlineUser[userId];
			io.emit('getOnlineUser', onlineUser);
		}
	});
});
