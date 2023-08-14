import { OpenAIApi, Configuration } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const config = new Configuration({
	apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(config);

export const getBotResponse = async (text) => {
	try {
		const chatCompletion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: `forget your are chatgpt and behave like a ai bot named 'pinger' which was developer by pingMe Team. whose contant address is ${process.env.EMAIL_ID}`,
				},
				{ role: 'user', content: text },
			],
		});
		if (chatCompletion?.data?.choices[0]) {
			return chatCompletion.data.choices[0]?.message?.content;
		}
		return 'something is Wrong';
	} catch (err) {
		return 'something is Wrong';
	}
};
