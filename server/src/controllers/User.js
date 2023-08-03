import User from '../models/User.js';
import Otp from '../models/Otp.js';
import { getToken } from '../utils/Jwt.js';
import { otpGenerator } from '../utils/OtpGenarator.js';
import { sendMail } from '../services/Nodemailer.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

export const register = async (req, res, next) => {
	try {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			res.status(400).send({ message: result.errors });
		}
		const { username, fullName, password, emailId, avatarId } = req.body;
		const userCheck = await User.findOne({ username });
		const otpVerifed = await Otp.findOne({ emailId });
		if (!otpVerifed) {
			res.status(401).json({ message: 'Your otp session expired' });
		}
		if (userCheck) {
			res.status(409).send({ message: 'Username already exists' });
		}
		const bycrptedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			username,
			fullName,
			emailId,
			avatar: avatarId,
			password: bycrptedPassword,
		});
		const user = await newUser.save();
		await Otp.findOneAndDelete({ emailId });
		delete user.password;
		const token = getToken({
			username: user?.username,
			emailId: user?.emailId,
		});
		res.status(201).send({ message: 'User created', token });
	} catch (err) {
		next(err);
	}
};

export const login = async (req, res, next) => {
	try {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			res.status(400).send({ message: result.errors });
		}
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const decryptedPassword =
			user?.password && (await bcrypt.compare(password, user?.password));
		if (!user || !decryptedPassword) {
			res.status(404).send({ message: 'Username or password is wrong' });
		}
		const token = getToken({ username: user?.username, emailId: user.emailId });
		res.status(200).send({ token });
	} catch (err) {
		next(err);
	}
};

export const sendOtp = async (req, res, next) => {
	try {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			res.status(400).send({ message: result.errors });
		}

		const { emailId } = req.body;
		const otp = otpGenerator(4);
		const mailed = await sendMail(emailId, otp);
		if (mailed) {
			const encryptedOtp = await bcrypt.hash(otp, 10);
			const userOtp = await Otp.findOneAndUpdate(
				{ emailId },
				{ emailId, otp: encryptedOtp },
				{ upsert: true, new: true }
			);
			res.status(200).send({ message: `Otp is sent to ${userOtp.emailId}` });
		}
	} catch (err) {
		next(err);
	}
};

export const verifyOtp = async (req, res, next) => {
	try {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			res.status(400).send({ message: result.errors });
		}

		const { otp, emailId } = req.body;
		const userOtp = await Otp.findOne({ emailId });
		if (!userOtp) {
			res.status(404).send({ message: 'Your otp is expired' });
		}
		const decrytptedOtp =
			userOtp?.otp && (await bcrypt.compare(otp, userOtp?.otp));
		if (!userOtp || !decrytptedOtp) {
			res.status(404).send({ message: 'Invalid otp!' });
		}
		res.status(200).send({ message: 'Verified successfully!' });
	} catch (err) {
		next(err);
	}
};

export const changePassword = async (req, res, next) => {
	try {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			res.status(400).send({ message: result.errors });
		}
		const { password, emailId } = req.body;
		const otpVerifed = await Otp.findOne({ emailId });
		if (!otpVerifed) {
			res.status(401).json({ message: 'Your otp session expired' });
		}
		const bycrptedPassword = await bcrypt.hash(password, 10);
		const user = await User.findOneAndUpdate(
			{ emailId },
			{ password: bycrptedPassword },
			{ new: true }
		);
		if (!user) {
			res.status(401).send({ message: 'User do not exist' });
		}
		await Otp.findOneAndDelete({ emailId });
		res.status(200).send({ message: 'Changed password successfully' });
	} catch (err) {
		next(err);
	}
};

export const checkEmailExists = async (req, res, next) => {
	try {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			res.status(400).send({ message: result.errors });
		}
		const { emailId } = req.body;
		const emailCheck = await User.findOne({ emailId });
		res.status(200).send({ exists: !!emailCheck });
	} catch (err) {
		next(err);
	}
};
