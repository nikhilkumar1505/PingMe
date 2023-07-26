import express from 'express';
import { param } from 'express-validator';
import {
	addAvatar,
	deleteAvatar,
	getAllAvatars,
} from '../controllers/Avatar.js';

const AvatarRoutes = express.Router();

AvatarRoutes.get('/', getAllAvatars);
AvatarRoutes.post('/', addAvatar);
AvatarRoutes.delete('/:avatarId', [param('avatarId').notEmpty()], deleteAvatar);

export default AvatarRoutes;
