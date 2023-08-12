import React, { useState, useCallback } from 'react';
import { styled } from 'styled-components';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';
import EmojiPicker, {
	EmojiClickData,
	SkinTonePickerLocation,
} from 'emoji-picker-react';
import { sendMessage } from '../../../store/controllers';
import { Imessage } from '../../../types';
import { useAppSelector } from '../../../hooks/useAppSelector';

interface ChatInputProp {
	updateMessage: (val: Imessage) => void;
}

export const ChatInput: React.FC<ChatInputProp> = ({ updateMessage }) => {
	const [input, setInput] = useState('');
	const selectedChat = useAppSelector((state) => state.chat.selectedChat);
	const [openEmoji, setOpenEmoji] = useState(false);

	const handleEmojiChange = useCallback(() => {
		setOpenEmoji((prev) => !prev);
	}, []);

	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setInput(event.target.value);
		},
		[]
	);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				handleSubmit();
			}
		},
		[input]
	);

	const handleSubmit = useCallback(async () => {
		setOpenEmoji(false);
		setInput('');
		const res = await sendMessage(selectedChat?.userId as string, input);
		if (res) {
			updateMessage(res);
		}
	}, [input, selectedChat]);

	const handleEmojiClick = useCallback((emoji: EmojiClickData) => {
		setInput((prev) => prev + emoji.emoji);
	}, []);

	return (
		<>
			{openEmoji && (
				<EmojiWrapper>
					<EmojiPicker
						lazyLoadEmojis
						skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
						previewConfig={{ showPreview: false }}
						searchDisabled
						width={'40rem'}
						height={'25rem'}
						onEmojiClick={handleEmojiClick}
					/>
				</EmojiWrapper>
			)}
			<Container>
				<BsEmojiSmileFill
					color='white'
					size='2rem'
					title='emoji'
					style={{ cursor: 'pointer' }}
					onClick={handleEmojiChange}
				/>
				<TextInput
					placeholder='Type your message'
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					value={input}
				/>
				<SendButton onClick={handleSubmit} disabled={input.length === 0}>
					<IoSend size='2rem' color='white' />
				</SendButton>
			</Container>
		</>
	);
};

const Container = styled.div(({ theme }) => ({
	backgroundColor: theme.colors.background2,
	display: 'flex',
	alignItems: 'center',
	padding: '1.2rem 1rem',
	maxHeight: '6rem',
	justifyContent: 'space-between',
	flex: 1,
	width: '100%',
}));

const TextInput = styled.input(({ theme }) => ({
	height: '4rem',
	borderRadius: '1rem',
	borderWidth: 0,
	outline: 0,
	flex: 1,
	margin: '0 1rem',
	padding: '1rem',
	resize: 'none',
	textAlign: 'start',
	fontSize: '1.5rem',
	fontFamily: 'sans-serif',
	fontWeight: '500',
	letterSpacing: '1.1px',
	color: theme.colors.textColor,
	['&:focus']: {
		backdropFilter: 'blur(20rem)',
		border: '1px solid #604bff',
	},
	['&::placeholder']: {
		fontStyle: 'italic',
		fontSize: '1.2rem',
		padding: '0.2rem',
	},
}));

const SendButton = styled.button(({ theme, disabled }) => ({
	backgroundColor: theme.colors.secondary,
	cursor: 'pointer',
	padding: '0.7rem 2.5rem',
	borderRadius: '1rem',
	border: 0,
	opacity: disabled ? 0.6 : 1,
}));

const EmojiWrapper = styled.div(() => ({
	position: 'absolute',
	bottom: '7rem',
}));
