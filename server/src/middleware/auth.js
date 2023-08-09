import User from '../models/User.js';
import { verifyToken } from '../utils/Jwt.js';
import asyncHandler from 'express-async-handler';

export const isAuth = asyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	const token = authHeader?.split(' ')[1];

	if (token) {
		const userPayload = verifyToken(token);
		const user = await User.findById(userPayload?.id);
		if (user) {
			req.user = user;
			next();
		} else {
			res.status(401).send({ messsage: 'Not Authorized' });
		}
	} else {
		res.status(401).send({ messsage: 'Not Authorized' });
	}
});
