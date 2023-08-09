import mongoose, { Schema } from 'mongoose';

const Userschema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 3,
			max: 10,
		},
		emailId: {
			type: String,
			required: true,
			min: 3,
		},
		fullName: {
			type: String,
			required: true,
			min: 3,
		},
		password: {
			type: String,
			required: true,
			min: 3,
			max: 10,
		},
		avatar: { type: Schema.Types.ObjectId, default: null, ref: 'avatar' },
	},
	{ timestamps: true, versionKey: false }
);

Userschema.index(
	{ username: 'text', fullName: 'text', emailId: 'text' },
	{ weights: { username: 10, fullName: 5, emailId: 1 } }
);

export default mongoose.model('User', Userschema);
