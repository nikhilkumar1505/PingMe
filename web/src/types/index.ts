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
