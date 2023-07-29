interface IColors {
	primary: string;
	secondary: string;
	white: string;
	dark: string;
	background1: string;
	background2: string;
	glassMorph: string;
	error: string;
	violet: string;
}
const colors: IColors = {
	secondary: '#ef261f',
	primary: '#2cc6ff',
	background1: '#63d3f6',
	background2: '#00407177',
	white: '#ffffff',
	dark: '#151515',
	glassMorph: '#ffffff24',
	error: '#B00020',
	violet: '#604bff',
};

export interface ITheme {
	colors: IColors;
}

export const theme: ITheme = {
	colors,
};
