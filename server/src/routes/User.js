import { Router } from 'express';
import { body, param, query } from 'express-validator';
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

export default route;
