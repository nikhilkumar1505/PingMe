import { Schema, model } from 'mongoose';

const ConversationSchema = new Schema(
	{
		users: [
			{
				required: true,
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		lastMessage: {
			type: Schema.Types.ObjectId,
			ref: 'Message',
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model('Conversation', ConversationSchema);
