import React, { useState, useCallback } from 'react';
import { AvatarModal, CommonModal, Header, HeaderIcon } from '../..';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { IoChatbox } from 'react-icons/io5';
import { BiSearchAlt, BiLogOut } from 'react-icons/bi';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { updateDrawerState, updateLoggedIn } from '../../../store/slices';
import { drawerState } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { updateAvatar } from '../../../store/controllers';

interface ChatListHeaderProp {}

export const ChatListHeader: React.FC<ChatListHeaderProp> = ({}) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState(false);
	const [openAvatar, setOpenAvatar] = useState(false);
	const userdetails = useAppSelector((state) => state.user);
	const drawer = useAppSelector((state) => state.app.drawerState);
	const Icon = drawer === drawerState.CHAT ? BiSearchAlt : IoChatbox;
	const state =
		drawer === drawerState.CHAT ? drawerState.SEARCH : drawerState.CHAT;

	const handleCloseAvatar = useCallback(async () => {
		try {
			setOpenAvatar(false);
			await updateAvatar(userdetails.avatarId);
		} catch {}
	}, [userdetails.avatarId]);

	const handleIconClick = useCallback(() => {
		dispatch(updateDrawerState(state));
	}, [state]);

	const handlelogout = useCallback(() => {
		localStorage.clear();
		dispatch(updateLoggedIn(false));
		navigate('/');
	}, []);

	return (
		<>
			<Header
				isClickable
				onClick={() => setOpenAvatar(true)}
				imageUrl={userdetails?.imageUrl}
				title={userdetails?.fullName}
				subTitle={userdetails?.username}>
				<HeaderIcon
					Icon={Icon}
					handleIconClick={handleIconClick}
					title={state}
				/>
				<HeaderIcon
					Icon={BiLogOut}
					handleIconClick={() => setOpenModal(true)}
					title={'logout'}
				/>
			</Header>
			<CommonModal
				visible={openModal}
				descrption='Are you sure you want to logout?'
				title={'Logout'}
				imageUrl='https://img.freepik.com/free-vector/escape-concept-illustration_114360-5656.jpg?size=626&ext=jpg&ga=GA1.2.304103842.1690276064&semt=ais'
				secondaryBtntext='back'
				secondaryBtnOnClick={() => setOpenModal(false)}
				primaryBtnOnClick={handlelogout}
				primaryBtnText='Logout'
			/>
			<AvatarModal isOpen={openAvatar} handleClose={handleCloseAvatar} />
		</>
	);
};
