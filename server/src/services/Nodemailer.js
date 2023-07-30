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

export const sendMail = (emailId, otp) => {
	const info = {
		from: process.env.EMAIL_ID,
		to: emailId,
		subject: 'PingMe - verification code',
		text: `your one time password is ${otp}. please note this will expires in 5 minutes`,
		html: `<p>your one time password is: <b>${otp}</b></p> <p>please note this will expires in 5 minutes</p>`,
	};
	return transport
		.sendMail(info)
		.then((res) => res)
		.catch((err) => err);
};
