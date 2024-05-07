import { useTranslation } from 'react-i18next';
import { PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { Anchor, Box, Burger, Flex, Group, Tooltip } from '@mantine/core';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../modules/auth/context.tsx';

import useWindowSize from '../../../hooks/useWindowSize.ts';
import AdministratorToggle from '../administrator-toggle';
import classes from './navbar.module.css';
import DrawerList from './drawer-list';
import UserMenu from './user-menu';

const Navbar = ({ children }: PropsWithChildren) => {
	const { getAdminAccess } = useContext(AuthContext);
	const { isAuthenticated } = useContext(AuthContext);
	const windowSize = useWindowSize();
	const [drawerOpened, setDrawerOpened] = useState(windowSize > 1000);

	useEffect(() => {
		setDrawerOpened(windowSize > 1000);
	}, [windowSize]);

	const isLoggedIn = useMemo(() => isAuthenticated(), [isAuthenticated]);

	// TODO implement admin access
	const [adminAccess, setAdminMenu] = useState(getAdminAccess());
	const toggleDrawer = () => setDrawerOpened((opened) => !opened);

	const { t } = useTranslation();

	return (
		<>
			<Flex justify="space-between" align="center" className={classes.wrapper}>
				<Box component="header" color="white">
					<Group h="100%" pl={10}>
						{isLoggedIn && (
							<Group>
								<Tooltip label="Menu" zIndex={600}>
									<Burger size="sm" color="white" onClick={toggleDrawer} />
								</Tooltip>
							</Group>
						)}
						<Anchor component={Link} to="/" c="white" underline="never">
							{t('components.global.navbar.header')}
						</Anchor>
					</Group>
				</Box>
				{isLoggedIn && (
					<Group mr={10}>
						<AdministratorToggle adminAccess={adminAccess} setAdminMenu={setAdminMenu} />
						<UserMenu />
					</Group>
				)}
			</Flex>
			<Flex>
				{isLoggedIn && <DrawerList open={drawerOpened} />}
				<Box w="100%">{children}</Box>
			</Flex>
		</>
	);
};

export default Navbar;
