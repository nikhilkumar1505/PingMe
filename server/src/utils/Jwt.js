import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const key = process.env.JWT_KEY;

export const getToken = (payload) => {
	const token = jwt.sign(payload, key, { expiresIn: '14d' });
	return token;
};

export const verifyToken = (token) => {
	const payload = jwt.verify(token, key);
	return payload;
};
