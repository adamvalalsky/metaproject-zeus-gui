import { useState } from 'react';
import { Avatar, Group, Menu, MenuDropdown, MenuItem, MenuTarget, rem, Text, UnstyledButton } from '@mantine/core';
import { IconChevronDown, IconLogout, IconSettings } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

import classes from './user-menu.module.css';

type UserMenuProps = {
	fullWidth?: boolean;
};

const UserMenu = ({ fullWidth = false }: UserMenuProps) => {
	const { user, removeUser, signoutSilent } = useAuth();
	const [userMenuOpened, setUserMenuOpened] = useState(false);

	const logout = () => {
		removeUser();
		signoutSilent();
	};

	if (!user) {
		return null;
	}

	return (
		<Menu
			width={fullWidth ? '96%' : 260}
			position="bottom-end"
			transitionProps={{ transition: 'pop-top-right' }}
			onClose={() => setUserMenuOpened(false)}
			onOpen={() => setUserMenuOpened(true)}
			withinPortal={false}
			menuItemTabIndex={0}
			trigger="click-hover"
		>
			<MenuTarget>
				<UnstyledButton className={classes.user} data-opened={userMenuOpened}>
					<Group gap={7}>
						<Avatar
							color="initials"
							variant="filled"
							size="sm"
							name={`${user.profile.given_name} ${user.profile.family_name}`}
						/>
						<Text fw={500} size="sm" lh={1} mr={3} flex={1}>
							{user.profile.name}
						</Text>
						<IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
					</Group>
				</UnstyledButton>
			</MenuTarget>
			<MenuDropdown>
				<Menu.Label>Profile settings</Menu.Label>
				<MenuItem
					component={Link}
					to="/dashboard/profile"
					leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
				>
					Account settings
				</MenuItem>
				<MenuItem
					onClick={() => logout()}
					leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
				>
					Logout
				</MenuItem>
			</MenuDropdown>
		</Menu>
	);
};

export default UserMenu;
