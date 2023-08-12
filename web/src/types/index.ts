export interface IAvatar {
	_id: string;
	image_url: string;
	name: string;
}

export interface Iuser {
	avatarId: string;
	username: string;
	fullName: string;
	emailId: string;
	imageUrl: string;
	userId: string;
}

export interface Ichats extends Omit<Iuser, 'avatarId'> {
	imageUrl: string;
	messageStatus: string;
	userSentMessage: boolean;
	message: string;
	messageId: string;
	time: string;
	conversationId: string;
}

export interface loginProp {
	username: string;
	password: string;
}

export interface registerProp {
	username: string;
	avatarId: string;
	password: string;
	emailId: string;
	fullName: string;
}

export interface verifyOtpProp {
	emailId: string;
	otp: string;
}

export interface forgetPasswordProp {
	password: string;
	emailId: string;
}

export enum drawerState {
	CHAT = 'chat',
	SEARCH = 'search',
	PROFILE = 'profile',
}

export interface Imessage {
	messageId: string;
	conversationId: string;
	message: string;
	time: string;
	isUserSentMessage: boolean;
	messageStatus: string;
}
