import  { Schema, model } from 'mongoose';

const OtpSchema = new Schema(
	{
		emailId: {
			type: String,
			required: true,
		},
		otp: {
			type: String,
			required: true,
		},
		createdAt: { type: Date, default: Date.now, index: { expires: 300 } },
	},
	{ timestamps: true }
);

export default model("Otp",OtpSchema)