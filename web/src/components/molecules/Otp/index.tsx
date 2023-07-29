import React, { useEffect, useRef, useState } from 'react';
import OtpInput from 'react-otp-input';
import './style.css';
import { css, styled, useTheme } from 'styled-components';
import { Button } from '../../atoms/Button';

const TIMER = 11;

export const Otp = () => {
	const theme = useTheme();
	const [otp, setOtp] = useState('');
	const [timer, setTimer] = useState(TIMER);
	const [enableTimer, setEnableTimer] = useState(true);

	useEffect(() => {
		if (timer === 0) {
			setEnableTimer(false);
		}
		if (enableTimer) {
			const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
			return () => clearInterval(interval);
		}
	}, [timer]);

	return (
		<>
			<OtpInput
				inputStyle={inputStyles}
				value={otp}
				renderSeparator={() => <Seperation />}
				onChange={setOtp}
				numInputs={4}
				renderInput={(props) => <input {...props} className='otp-input' />}
			/>
			{enableTimer ? (
				<ResendText>
					Time Remaining,
					<Timer>{` ${timer.toString().padStart(2, '0')}sec`}</Timer>
				</ResendText>
			) : (
				<Button
					backgroundColor={theme.colors.background2}
					className='m-2'
					text={'resend'}
					onClick={() => console.log('back')}
				/>
			)}
			<ButtonWrapper>
				<Button
					backgroundColor={theme.colors.violet}
					text={'back'}
					onClick={() => console.log('back')}
				/>
				<Button text={'verify'} onClick={() => console.log('back')} />
			</ButtonWrapper>
		</>
	);
};

const Seperation = styled.div({
	width: '2.5rem',
});

const inputStyles = {
	width: '3.5rem',
	height: '3.6rem',
	border: '2px solid #604bff',
	borderRadius: '0.4rem',
	outline: 0,
	color: '#004071',
	fontSize: '2.4rem',
	fontWeight: '700',
};

const ResendText = styled.p(({ theme }) => ({
	margin: '2.5rem 0',
	fontSize: '1.4rem',
	color: theme.colors.violet,
}));

const Timer = styled.span(({ theme }) => ({
	color: theme.colors.secondary,
	fontWeight: '700',
	fontSize: '1.4rem',
}));

const ButtonWrapper = styled.div(() => ({
	display: 'flex',
	marginTop: '2rem',
	justifyContent: 'space-between',
	width: '75%',
}));
