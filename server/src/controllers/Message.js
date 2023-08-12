import expressAsyncHandler from 'express-async-handler';
import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import { formatSendMessage } from '../utils/mailHelper.js';
import Avatar from '../models/Avatar.js';
import { sendMail } from '../services/Nodemailer.js';

export const sendMessage = expressAsyncHandler(async (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		res.status(400).send({ message: result.errors });
	}
	const { message, recevierId } = req.body;
	const userId = req.user._id;

	let conversationDoc = await Conversation.findOne({
		users: { $all: [userId, recevierId] },
	});
	let messageDoc;

	const recevier = await User.findById(recevierId);
	const avatar = await Avatar.findById(req.user?.avatar);

	if (!recevier) {
		res.status(404).send({ message: 'user not found' });
	}

	if (!conversationDoc) {
		messageDoc = await Message.create({
			sender: userId,
			reciever: recevierId,
			message,
		});

		if (messageDoc) {
			conversationDoc = await Conversation.create({
				users: [userId, recevierId],
				lastMessage: messageDoc._id,
			});
			messageDoc.conversationId = conversationDoc._id;
			await messageDoc.save();
			const mailPayload = formatSendMessage(recevier.emailId, {
				username: req.user.username,
				fullName: req.user.fullName,
				imageUrl: avatar.image_url,
			});
			sendMail(mailPayload);
		}
	} else {
		messageDoc = await Message.create({
			sender: userId,
			reciever: recevierId,
			message,
			conversationId: conversationDoc._id,
		});
		conversationDoc.lastMessage = messageDoc._id;
		await conversationDoc.save();
	}
	const populateChat = await conversationDoc.populate('lastMessage');
	if (populateChat) {
		res.status(200).send({
			message: 'message sent',
			data: messageDoc,
		});
	}
});

export const getmessages = expressAsyncHandler(async (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		res.status(400).send({ message: result.errors });
	}
	const { conversationId, recevierId } = req.query;
	await Message.updateMany(
		{ conversationId, status: 'sent', sender: recevierId },
		{ status: 'seen' }
	);
	const conversations = await Message.find({ conversationId }).sort({
		createdAt: 1,
	});
	if (!conversations.length) {
		res.status(200).send({ message: 'No conversation', data: conversations });
	}
	res.status(200).send({ message: 'conversation', data: conversations });
});

export const getAllConversation = expressAsyncHandler(async (req, res) => {
	const userId = req.user._id;
	const chats = await Conversation.aggregate([
		{
			$match: {
				users: userId,
			},
		},
		{
			$unwind: '$users',
		},
		{
			$match: {
				users: { $ne: userId },
			},
		},
		{
			$lookup: {
				from: 'messages',
				localField: 'lastMessage',
				foreignField: '_id',
				as: 'lastMessageData',
				pipeline: [
					{
						$addFields: {
							time: '$updatedAt',
							messageId: '$_id',
						},
					},
					{
						$project: {
							_id: 0,
							time: 1,
							message: 1,
							status: 1,
							messageId: 1,
							sender: 1,
						},
					},
				],
			},
		},
		{
			$lookup: {
				from: 'users',
				localField: 'users',
				foreignField: '_id',
				as: 'user',
				pipeline: [
					{
						$lookup: {
							from: 'avatars',
							localField: 'avatar',
							foreignField: '_id',
							as: 'image',
						},
					},
					{
						$addFields: {
							userId: '$_id',
							avatar: { $arrayElemAt: ['$image', 0] },
						},
					},
					{
						$addFields: {
							avatarImageUrl: '$avatar.image_url',
						},
					},
					{
						$project: {
							_id: 0,
							userId: 1,
							username: 1,
							fullName: 1,
							avatarImageUrl: 1,
						},
					},
				],
			},
		},
		{
			$replaceRoot: {
				newRoot: {
					$mergeObjects: [
						{ $arrayElemAt: ['$lastMessageData', 0] },
						{ $arrayElemAt: ['$user', 0] },
						'$$ROOT',
					],
				},
			},
		},
		{
			$addFields: { isLastMessageByUser: { $ne: ['$userId', '$sender'] } },
		},
		{
			$project: {
				lastMessageData: 0,
				lastMessage: 0,
				user: 0,
				users: 0,
				sender: 0,
			},
		},
		{
			$sort: {
				updatedAt: -1,
			},
		},
	]);

	res.status(200).send({ data: chats });
});
