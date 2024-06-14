import { CheckIcon, Combobox, Group, Loader, Stack, Text, TextInput, useCombobox } from '@mantine/core';
import { useRef, useState } from 'react';

import { type UserInfo } from '@/modules/user/model';
import request from '@/modules/api/request';

type UserResponse = {
	users: UserInfo[];
};

const getAsyncData = async (projectId: number, query: string, signal: AbortSignal): Promise<UserInfo[]> => {
	const response = await request<UserResponse>(`/users?query=${query}&projectId=${projectId}`, {
		signal
	});

	return response.data.users;
};

type AddMembersSelectProps = {
	projectId: number;
	pickedMembers: UserInfo[];
	handleSelect: (member: UserInfo) => void;
};

const AddMembersSelect = ({ projectId, pickedMembers, handleSelect }: AddMembersSelectProps) => {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption()
	});

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<UserInfo[] | null>(null);
	const [query, setQuery] = useState('');
	const [empty, setEmpty] = useState(false);
	const abortController = useRef<AbortController>();

	const fetchOptions = (query: string) => {
		if (query.length < 3) {
			setData([]);
			setLoading(false);
			setEmpty(true);
			return;
		}

		abortController.current?.abort();
		abortController.current = new AbortController();
		setLoading(true);

		getAsyncData(projectId, query, abortController.current?.signal)
			.then(response => {
				setData(response);
				setLoading(false);
				setEmpty(response.length === 0);
				abortController.current = undefined;
			})
			.catch(() => {});
	};

	const options = (data ?? []).map((user: UserInfo) => {
		const active = pickedMembers.some(m => m.id === user.id);
		return (
			<Combobox.Option key={user.id} value={user.username} active={active}>
				<Group gap="sm">
					{active && <CheckIcon size={12} />}
					<Stack gap={2}>
						<Text>
							{user.name} ({user.username})
						</Text>
						<Text c="dimmed">{user.email}</Text>
					</Stack>
				</Group>
			</Combobox.Option>
		);
	});

	return (
		<Stack gap={2}>
			<Combobox
				store={combobox}
				withinPortal={false}
				onOptionSubmit={optionValue => {
					setQuery('');
					const user = data?.find(user => user.username === optionValue);
					if (user) {
						handleSelect(user);
					}
					combobox.closeDropdown();
				}}
			>
				<Combobox.Target>
					<TextInput
						label="Search users"
						placeholder="Start typing for search..."
						value={query}
						onChange={event => {
							const value = event.currentTarget.value;
							setQuery(value);
							fetchOptions(value);
							combobox.resetSelectedOption();
							combobox.openDropdown();
						}}
						onFocus={() => {
							if (data === null) {
								fetchOptions(query);
							}
						}}
						onBlur={() => combobox.closeDropdown()}
						rightSection={loading && <Loader size={10} />}
					/>
				</Combobox.Target>

				<Combobox.Dropdown hidden={data === null}>
					<Combobox.Options>
						{options}
						{query.length < 3 && (
							<Combobox.Empty>
								No users found. You need to type at least 3 characters to start searching
							</Combobox.Empty>
						)}
						{empty && query.length >= 3 && <Combobox.Empty>No users found.</Combobox.Empty>}
					</Combobox.Options>
				</Combobox.Dropdown>
			</Combobox>
			<Text c="dimmed" size="sm">
				Users that are already part of the projects will not be included in search.
			</Text>
		</Stack>
	);
};

export default AddMembersSelect;
