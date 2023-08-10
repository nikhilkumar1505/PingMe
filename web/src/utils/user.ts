import { IAvatar } from '../types';
import { ACCESS_TOKEN } from './constants';

export const getAvatarImageUrl = (avatars: IAvatar[], avatarId: string) => {
	return avatars.find((avatar) => avatar?._id === avatarId);
};

export const setToken = (token: string) => {
	localStorage.setItem(ACCESS_TOKEN, token);
};

export const getToken = () => {
	return localStorage.getItem(ACCESS_TOKEN);
};

const firstMessageQuotes = [
	'Reconnecting through messages, rekindling our friendship.',
	'A new message, a fresh start in our journey of friendship.',
	"From inbox to heart: let's write a new chapter of friendship.",
	"Sending the first message, but it's just another page in our story.",
	'In the world of chats, a new adventure in friendship begins.',
	"Here's to the first message, and the countless memories to follow.",
	'Our friendship, typed in messages, sent with care.',
	'One message can spark countless conversations and lifelong bonds.',
	'Hello through the screen, but our connection is always real.',
	"Pressing send on a new message, but it's an old connection.",
	'A message: the start of something wonderful between friends.',
	'From silence to conversation, our messages build bridges.',
	'With a message, a digital connection blossoms into real friendship.',
	'Hitting send on the first message, ready for endless chats.',
	'Messages that carry the weight of our shared memories.',
	'Starting anew with a message, as if we never stopped talking.',
	"A message is more than words – it's a hug through the screen.",
];

// Example of selecting a random quote from the array
export const getRandomQuote = () =>
	firstMessageQuotes[Math.floor(Math.random() * firstMessageQuotes.length)];
