import mongoose, { Schema } from 'mongoose';

const Userschema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 3,
			max: 10,
			unique: true,
		},
		emailId: {
			type: String,
			required: true,
			min: 3,
			unique: true,
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
		avatar: { type: Schema.Types.ObjectId, default: null, ref: 'Avatar' },
	},
	{ timestamps: true }
);

export default mongoose.model('User', Userschema);
