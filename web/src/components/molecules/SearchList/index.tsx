import React, { useCallback, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ChatBox, EmptyResult, SearchInput, Shimmer } from '../..';
import { useState } from 'react';
import { searchUser } from '../../../store/controllers';
import { Iuser } from '../../../types';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { updateSelectedChats } from '../../../store/slices';

const emptyResult = {
	first: {
		url: 'https://img.freepik.com/premium-vector/team-business-staff-searching-new-ideas-people_74855-19907.jpg?size=626&ext=jpg&ga=GA1.2.304103842.1690276064&semt=ais',
		title: 'Search New Friends',
	},
	second: {
		url: 'https://img.freepik.com/free-vector/curious-concept-illustration_114360-2185.jpg?size=626&ext=jpg&ga=GA1.2.304103842.1690276064&semt=ais',
		title: 'No User Found',
	},
};

export const SearchList = () => {
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState<Iuser[] | []>([]);
	const timer = useRef<NodeJS.Timeout | null>(null);
	const dispatch = useAppDispatch();

	const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearch(value);
		setLoading(true);
		if (timer.current) {
			clearTimeout(timer.current);
		}
		timer.current = setTimeout(() => {
			searchUser(value)
				.then((res) => setUsers(res))
				.finally(() => setLoading(false));
		}, 500);
	}, []);

	const handleCardClick = useCallback((item: any) => {
		dispatch(updateSelectedChats(item));
	}, []);

	const Body = useCallback(() => {
		if (loading) {
			return [...Array(10)].map((_, index) => (
				<div key={index} style={{ marginTop: '1rem' }}>
					<Shimmer />
				</div>
			));
		}
		if (search.length === 0 || users.length === 0) {
			const results =
				search.length !== 0 && users.length === 0
					? emptyResult.second
					: emptyResult.first;
			return <EmptyResult title={results?.title} imageUrl={results?.url} />;
		} else {
			return (
				<>
					{users.length > 0 &&
						users.map((item, index) => (
							<ChatBox
								imageUrl={item?.imageUrl}
								lastIndex={index !== 9}
								key={item?.userId}
								title={item?.fullName}
								description={item?.username}
								handleClick={() => handleCardClick(item)}
								id={item?.userId}
							/>
						))}
				</>
			);
		}
	}, [users, search, loading]);

	return (
		<ListContainer>
			<SearchInput value={search} onChange={handleSearch} />
			<List> {Body()}</List>
		</ListContainer>
	);
};

const fadeToBlack = keyframes` 
  from {
    opacity:0;
    transform: translate(0,20px);
  },
  to {
    opacity:1;
  }
`;

const ListContainer = styled.div(
	({ theme }) => ({
		padding: '0.5rem 1.5rem 1rem',
		minHeight: '100%',
	}),
	css`
		animation: ${fadeToBlack} 0.3s linear;
	`
);

const List = styled.div(() => ({
	marginTop: '2rem',
}));
