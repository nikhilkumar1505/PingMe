import { Router } from 'express';
import { body, query } from 'express-validator';
import messageRoute from './Message.js';

import {
	getDetails,
	searchFriends,
	updateAvatar,
} from '../controllers/User.js';
const route = Router();

route.get('/details', getDetails);

route.get('/search', [query('searchTerm').notEmpty()], searchFriends);

route.post(
	'/updateAvatar',
	[body('avatarId').notEmpty().isMongoId()],
	updateAvatar
);

route.use('/message', messageRoute);

export default route;
