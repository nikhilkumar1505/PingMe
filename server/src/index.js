import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import AvatarRoutes from './routes/Avatar.js';
import AuthRoutes from './routes/Auth.js';
import FriendRoutes from './routes/Friend.js';
import UserRoutes from './routes/User.js';
import { isAuth } from './middleware/auth.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use('/avatar', AvatarRoutes);
app.use('/auth', AuthRoutes);
app.use('/friend', FriendRoutes);
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
		app.listen(PORT);
		console.log('Conneted to port ' + PORT);
	})
	.catch((err) => console.log('err', err));
