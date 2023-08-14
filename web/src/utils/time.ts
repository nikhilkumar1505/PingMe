// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
export const getRelativeTimeDescription = (time: string, getTime?: boolean) => {
	const currentTime = new Date();
	const inputTime = new Date(time);
	const timeDifference = (+currentTime - +inputTime) / (1000 * 60 * 60 * 24);

	const date = {
		current: {
			date: currentTime.getDate(),
			month: currentTime.getMonth(),
			year: currentTime.getFullYear(),
		},
		input: {
			date: inputTime.getDate(),
			month: inputTime.getMonth(),
			year: inputTime.getFullYear(),
		},
	};

	if (
		date.current.month === date.input.month &&
		date.current.year === date.input.year
	) {
		if (date.input.date === date.current.date) {
			return getTime ? getFormatedTime(time) : 'Today';
		}
		if (date.input.date === date.current.date - 1) {
			return 'Yesterday';
		}
	}
	if (timeDifference < 7 && timeDifference > 1) {
		const days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];
		return days[inputTime.getDay()];
	} else {
		return inputTime.toLocaleDateString();
	}
};

export const getFormatedTime = (time: string) => {
	const date = new Date(time);
	return date.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	});
};
