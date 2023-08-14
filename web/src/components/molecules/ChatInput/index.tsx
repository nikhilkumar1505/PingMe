import React, { useState, useCallback, useRef } from 'react';
import { styled } from 'styled-components';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';
import EmojiPicker, {
	EmojiClickData,
	SkinTonePickerLocation,
} from 'emoji-picker-react';
import { sendMessage, sendMessageToBot } from '../../../store/controllers';
import { Ichats, Imessage } from '../../../types';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { updateChatValue, updateIsTyping } from '../../../store/slices';

interface ChatInputProp {
	updateMessage: (val: Imessage) => void;
	replaceMessage: (id: string, val: Imessage) => void;
}

export const ChatInput: React.FC<ChatInputProp> = ({
	updateMessage,
	replaceMessage,
}) => {
	const dispatch = useAppDispatch();
	const [input, setInput] = useState('');
	const socket = useAppSelector((state) => state.app.socket);
	const selectedChat = useAppSelector(
		(state) => state.chat.selectedChat
	) as Ichats;
	const [openEmoji, setOpenEmoji] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const handleEmojiChange = useCallback(() => {
		setOpenEmoji((prev) => !prev);
	}, []);

	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setInput(event.target.value);
			if (socket && selectedChat?.userId !== 'ai-bot') {
				if (!isTyping) {
					setIsTyping(true);
					socket?.emit('start-typing', selectedChat?.conversationId);
				}
				if (timerRef.current) {
					clearTimeout(timerRef.current);
				}
				let lastTime = new Date().getTime();
				timerRef.current = setTimeout(() => {
					let diff = new Date().getTime() - lastTime > 3000;
					if (diff && isTyping) {
						socket?.emit('stop-typing', selectedChat?.conversationId);
						setIsTyping(false);
					}
				}, 3000);
			}
		},
		[isTyping, socket, selectedChat?.conversationId, timerRef]
	);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				handleSubmit();
			}
		},
		[input]
	);

	const handleAimessgae = useCallback(async () => {
		try {
			const randomId = Math.floor(Math.random() * 1000000);
			const payload = {
				messageId: `${randomId}`,
				message: input,
				time: new Date().toISOString(),
				isUserSentMessage: true,
				messageStatus: 'seen',
			};
			updateMessage(payload as Imessage);
			dispatch(updateIsTyping(true));
			const res = await sendMessageToBot(input);
			updateMessage(res as Imessage);
		} finally {
			dispatch(updateIsTyping(false));
		}
	}, [input]);

	const handleSubmit = useCallback(async () => {
		setOpenEmoji(false);
		setInput('');
		if (selectedChat?.userId === 'ai-bot') {
			handleAimessgae();
			return;
		}
		const randomId = Math.floor(Math.random() * 1000000);
		const payload = {
			messageId: `${randomId}`,
			conversationId: selectedChat?.conversationId,
			message: input,
			time: new Date().toISOString(),
			isUserSentMessage: true,
			messageStatus: 'sending',
		};
		updateMessage(payload as Imessage);

		socket?.emit('stop-typing', selectedChat?.conversationId);
		setIsTyping(false);

		const res = await sendMessage(selectedChat?.userId, input);
		if (res) {
			const socketPayload = { ...res, isUserSentMessage: false };
			socket?.emit('send-message', selectedChat.userId, socketPayload);
			replaceMessage(`${randomId}`, res);
			const slicePayload = {
				conversationId: res.conversationId,
				time: res.time,
				message: res.message,
				messageId: res.messageId,
				userSentMessage: true,
				messageStatus: res.messageStatus,
			};
			dispatch(updateChatValue(slicePayload));
		}
	}, [input, selectedChat, socket]);

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
