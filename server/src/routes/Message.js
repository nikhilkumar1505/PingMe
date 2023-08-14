import { Router } from 'express';
import { body, query } from 'express-validator';
import {
	getAllConversation,
	getmessages,
	sendMessage,
	aimessage,
} from '../controllers/Message.js';

const routes = Router();

const recevierIdVal = body('recevierId').isMongoId();
const messageVal = body('message').isString().notEmpty();

routes.post('/send-message', [messageVal, recevierIdVal], sendMessage);

routes.get(
	'/get-message',
	[query('conversationId').isMongoId(), query('recevierId').isMongoId()],
	getmessages
);

routes.get('/all-chats', getAllConversation);

routes.post('/chat-bot', [body('message').isString().notEmpty()], aimessage);

export default routes;
