import handlebar from 'handlebars';
import fs from 'fs';

const source = fs.readFileSync('src/utils/request.hbs', 'utf-8');
const template = handlebar.compile(source);

export const formatVerificationPayload = (otp, emailId, user) => {
	return {
		emailId,
		subject: 'PingMe - verification code',
		text: `${
			user && `Hello ${user?.username}.`
		}  your one time password is ${otp}. please note this will expires in 5 minutes`,
		html: `${
			user ? `<h1>Hello, ${user?.username}</h1>` : ''
		}<p>your one time password is: <b>${otp}</b></p> <p>please note this otp will expires in 5 minutes</p>`,
	};
};

export const formatSendMessage = (emailId, friendData) => {
	const info = {
		username: friendData?.username,
		fullname: friendData?.fullName,
		imageUrl: friendData?.imageUrl,
		messageLink: 'https://www.google.com',
	};

	const element = template(info);
	return {
		emailId,
		subject: `Knock Knock! Someone's at the Door with a Message 🚪💬`,
		text: 'A new user ',
		html: element,
	};
};
