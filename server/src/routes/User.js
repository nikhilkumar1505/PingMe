import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { getDetails, searchFriends } from '../controllers/User.js';
const route = Router();

route.get('/details', getDetails);

route.get('/search', [query('searchTerm').notEmpty()], searchFriends);

export default route;
