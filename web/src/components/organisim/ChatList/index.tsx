import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { ChatListHeader, ConversationList, SearchList } from '../..';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { drawerState } from '../../../types';

export const ChatList = () => {
	const drawer = useAppSelector((state) => state.app.drawerState);

	const Body = useCallback(() => {
		switch (drawer) {
			case drawerState.CHAT:
				return <ConversationList />;
			case drawerState.SEARCH:
				return <SearchList />;
			case drawerState.PROFILE:
				return <></>;
		}
	}, [drawer]);

	return (
		<Container>
			<ChatListHeader />
			<Scrollable>{Body()}</Scrollable>
		</Container>
	);
};

const Container = styled.div(({ theme }) => ({
	flex: 2,
	position: 'relative',
	backgroundColor: theme.colors.background3,
	maxWidth: '35rem',
	boxShadow: `2px 0px ${theme.colors.background2}`,
}));

const Scrollable = styled.div(() => ({
	overflowY: 'scroll',
	marginBottom: '1rem',
	height: '90.5%',
}));
