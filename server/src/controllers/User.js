import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

export const getDetails = asyncHandler(async (req, res, next) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		res.status(400).send({ message: result.errors });
	}
	const user = await User.findById(req.user?._id, { password: 0 }).populate({
		path: 'avatar',
		model: 'avatar',
		select: 'image_url',
	});

	if (!user) {
		res.status(404, 'user not found');
	}
	res.status(200).send({
		message: 'user details',
		data: user,
	});
});

export const searchFriends = asyncHandler(async (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		res.status(400).send({ message: result.errors });
	}
	const { searchTerm } = req.query;
	const users = await User.find(
		{
			$text: { $search: searchTerm.trim(), $caseSensitive: false },
			_id: { $ne: req.user._id },
		},
		{ score: { $meta: 'textScore' }, password: 0 }
	)
		.sort({ score: { $meta: 'textScore' } })
		.populate('avatar', '_id image_url')
		.limit(10);

	res.status(200).send({ message: 'found users', data: users });
});

export const updateAvatar = asyncHandler(async (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		res.status(400).send({ message: result.errors });
	}

	const userId = req.user._id;
	if (req.body.avatarId?.toString() !== req.user.avatar?.toString()) {
		const savedUser = await User.findByIdAndUpdate(userId, {
			avatar: req.body.avatarId,
		});
		if (savedUser) {
			res.status(201).send({ message: 'Avatar updated Successfully!' });
		}
	}
	res.status(200).send({ message: 'same avatar' });
});
