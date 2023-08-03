import React, { useCallback, useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import './style.css';
import { styled, useTheme } from 'styled-components';
import { Button } from '../../atoms/Button';
import { verifyOtp } from '../../../store/controllers';

const TIMER = 100;
const OTP_LENGTH = 4;

interface OtpProps {
	email: string;
	handleNext: () => void;
	handlePrev: () => void;
}

export const Otp: React.FC<OtpProps> = ({ email, handleNext, handlePrev }) => {
	const theme = useTheme();
	const [otp, setOtp] = useState('');
	const [timer, setTimer] = useState<number>(TIMER);
	const [enableTimer, setEnableTimer] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (timer === 0) {
			setEnableTimer(false);
		}
		if (enableTimer) {
			const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
			return () => clearInterval(interval);
		}
	}, [timer]);

	const handleVerify = useCallback(async () => {
		if (otp.length === OTP_LENGTH) {
			try {
				setIsLoading(true);
				const res = await verifyOtp({ emailId: email, otp });
				if (res?.status === 200) {
					handleNext();
				}
				setOtp('');
			} finally {
				setIsLoading(false);
			}
		}
	}, [otp, email]);

	const resendOtp = useCallback(() => {
		setTimer(TIMER);
		setEnableTimer(true);
	}, []);

	return (
		<Container>
			<OtpSentText>{`OTP has been sent to your email  \n ${email}`}</OtpSentText>
			<OtpInput
				inputStyle={inputStyles}
				value={otp}
				renderSeparator={() => <Seperation />}
				onChange={setOtp}
				numInputs={OTP_LENGTH}
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
					onClick={resendOtp}
				/>
			)}
			<ButtonWrapper>
				<Button
					backgroundColor={theme.colors.violet}
					text={'back'}
					onClick={handlePrev}
				/>
				<Button
					text={'verify'}
					onClick={handleVerify}
					disabled={otp.length !== OTP_LENGTH}
					isLoading={isLoading}
				/>
			</ButtonWrapper>
		</Container>
	);
};

const Container = styled.div({
	padding: '1rem 3rem',
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
	width: 'max-content',
});

const Seperation = styled.div({
	width: '2.5rem',
});

const OtpSentText = styled.p(({ theme }) => ({
	fontSize: '1.6rem',
	margin: '2rem 0',
	fontWeight: '700',
	textAlign: 'center',
	maxWidth: '30rem',
	color: theme.colors.dark,
	opacity: 0.77,
}));

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
	marginTop: '1rem',
	marginBottom: '4rem',
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
	width: '20rem',
}));
