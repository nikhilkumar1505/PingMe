import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transport = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_ID,
		pass: process.env.MAIL_PASSWORD,
	},
});

export const sendMail = async ({ emailId, text, html, subject }) => {
	const info = {
		from: process.env.EMAIL_ID,
		to: emailId,
		subject,
		text,
		html,
	};
	try {
		const res = await transport.sendMail(info);
		return res;
	} catch (err) {
		return err;
	}
};
