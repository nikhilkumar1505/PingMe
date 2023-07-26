import mongoose from 'mongoose';

const avatarSchema = mongoose.Schema({
	image_url: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
});

export default mongoose.model('avatar', avatarSchema);
