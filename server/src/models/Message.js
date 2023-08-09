import { Schema, model } from 'mongoose';

const MesssageSchema = new Schema(
	{
		sender: {
			required: true,
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		reciever: {
			required: true,
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		status: {
			type: String,
			enum: ['sent', 'seen'],
			default: 'sent',
		},
		conversationId: {
			type: Schema.Types.ObjectId,
			ref: 'Conversation',
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model('Message', MesssageSchema);
