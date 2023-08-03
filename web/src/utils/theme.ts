const colors = {
	secondary: '#ef261f',
	primary: '#2cc6ff',
	background1: '#63d3f6',
	background2: '#00407177',
	background3: '#F1F1F1',
	background4: '#658FFF',
	white: '#ffffff',
	dark: '#151515',
	glassMorph: '#ffffff24',
	error: '#B00020',
	violet: '#604bff',
};

const sizes = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '2560px',
};
export const devices = {
	mobileS: `(min-width: ${sizes.mobileS})`,
	mobileM: `(min-width: ${sizes.mobileM})`,
	mobileL: `(min-width: ${sizes.mobileL})`,
	tablet: `(min-width: ${sizes.tablet})`,
	laptop: `(min-width: ${sizes.laptop})`,
	laptopL: `(min-width: ${sizes.laptopL})`,
	desktop: `(min-width: ${sizes.desktop})`,
};

export interface ITheme {
	colors: typeof colors;
	devices: typeof devices;
}

export const theme: ITheme = {
	colors,
	devices,
};
