import Avatar from '../models/Avatar.js';
import { validationResult } from 'express-validator';

export const getAllAvatars = async (req, res, next) => {
	try {
		const avatars = await Avatar.find();
		res.status(200).json(avatars);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

export const addAvatar = async (req, res, next) => {
	try {
		const findAvatar = await Avatar.findOne({
			name: req.body.name,
			image_url: req.body.image_url,
		});
		if (findAvatar) {
			const err = new Error('image already exists');
			err.statusCode = 409;
			throw err;
		}
		const avatar = new Avatar({
			name: req.body.name,
			image_url: req.body.image_url,
		});
		await avatar.save();
		res.status(201).json(avatar);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

export const deleteAvatar = async (req, res, next) => {
	try {
		const result = validationResult(req);
		console.log(result, req.params);
		if (!result.isEmpty()) {
			res.status(404).json({ message: 'avatar not found' });
		}
		const avatar = await Avatar.findByIdAndDelete(req.params.avatarId);
		if (!avatar) {
			res.status(404).json({ message: 'avatar not found' });
		}
		res.status(200).json({ message: 'avatar deleted', data: avatar });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
