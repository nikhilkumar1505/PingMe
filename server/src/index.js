import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import AvatarRoutes from './routes/Avatar.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/avatar', AvatarRoutes);

app.use((error, req, res, next) => {
	console.log(error);
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
