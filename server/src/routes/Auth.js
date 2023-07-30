import express from 'express';
import { body } from 'express-validator';
import {
	changePassword,
	login,
	register,
	sendOtp,
	verifyOtp,
} from '../controllers/User.js';

const username = body('username').notEmpty();
const emailId = body('emailId').isEmail().normalizeEmail();
const password = body('password').trim().isLength({ min: 6 });
const fullName = body('fullName').notEmpty();
const avatarId = body('avatarId').isMongoId();
const otp = body('otp').notEmpty();

const routes = express.Router();

routes.post('/login', [username, password], login);

routes.post(
	'/signup',
	[username, password, emailId, fullName, avatarId],
	register
);

routes.post('/send-otp', [emailId], sendOtp);

routes.post('/verify-otp', [emailId, otp], verifyOtp);

routes.post('/forgot-password', [password], changePassword);

export default routes;
