import { Combobox, Loader, Stack, Text, TextInput, useCombobox } from '@mantine/core';
import { useRef, useState } from 'react';

import { type UserInfo } from '@/modules/user/model';
import request from '@/modules/api/request';

type UserResponse = {
	users: UserInfo[];
};

const getAsyncData = async (query: string, signal: AbortSignal): Promise<UserInfo[]> => {
	const response = await request<UserResponse>(`/users?query=${query}`, {
		signal
	});

	return response.data.users;
};

const AddMembersSelect = () => {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption()
	});

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<UserInfo[] | null>(null);
	const [value, setValue] = useState('');
	const [empty, setEmpty] = useState(false);
	const abortController = useRef<AbortController>();

	const fetchOptions = (query: string) => {
		if (!query) {
			setData([]);
			setLoading(false);
			setEmpty(true);
			return;
		}

		abortController.current?.abort();
		abortController.current = new AbortController();
		setLoading(true);

		getAsyncData(query, abortController.current?.signal)
			.then(response => {
				setData(response);
				setLoading(false);
				setEmpty(response.length === 0);
				abortController.current = undefined;
			})
			.catch(() => {});
	};

	const options = (data ?? []).map((user: UserInfo) => (
		<Combobox.Option key={user.id} value={user.username}>
			<Stack gap={2}>
				<Text>
					{user.name} ({user.username})
				</Text>
				<Text c="dimmed">{user.email}</Text>
			</Stack>
		</Combobox.Option>
	));

	return (
		<Combobox
			store={combobox}
			withinPortal={false}
			onOptionSubmit={optionValue => {
				setValue(optionValue);
				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<TextInput
					label="Search users"
					placeholder="Start typing for search..."
					value={value}
					onChange={event => {
						const value = event.currentTarget.value;
						setValue(value);
						fetchOptions(value);
						combobox.resetSelectedOption();
						combobox.openDropdown();
					}}
					onFocus={() => {
						if (data === null) {
							fetchOptions(value);
						}
					}}
					onBlur={() => combobox.closeDropdown()}
					rightSection={loading && <Loader size={10} />}
				/>
			</Combobox.Target>

			<Combobox.Dropdown hidden={data === null}>
				<Combobox.Options>
					{options}
					{empty && <Combobox.Empty>No users found.</Combobox.Empty>}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
};

export default AddMembersSelect;
