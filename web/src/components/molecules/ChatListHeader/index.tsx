import React, { useState, useCallback } from 'react';
import { CommonModal, Header, HeaderIcon } from '../..';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { IoChatbox } from 'react-icons/io5';
import { BiSearchAlt, BiLogOut } from 'react-icons/bi';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { updateDrawerState, updateLoggedIn } from '../../../store/slices';
import { drawerState } from '../../../types';
import { useNavigate } from 'react-router-dom';

interface ChatListHeaderProp {}

export const ChatListHeader: React.FC<ChatListHeaderProp> = ({}) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState(false);
	const userdetails = useAppSelector((state) => state.user);
	const drawer = useAppSelector((state) => state.app.drawerState);
	const Icon = drawer === drawerState.CHAT ? BiSearchAlt : IoChatbox;
	const state =
		drawer === drawerState.CHAT ? drawerState.SEARCH : drawerState.CHAT;

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
				imageUrl='https://drawer.design/wp-content/uploads/2020/12/Illustration.png'
				secondaryBtntext='back'
				secondaryBtnOnClick={() => setOpenModal(false)}
				primaryBtnOnClick={handlelogout}
				primaryBtnText='Logout'
			/>
		</>
	);
};
