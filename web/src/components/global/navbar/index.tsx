import { useTranslation } from 'react-i18next';
import { PropsWithChildren, useContext, useMemo, useState } from 'react';
import { Anchor, Box, Burger, Flex, Group, NavLink, rem, ScrollArea, Tooltip } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../modules/auth/context.tsx';

import classes from './navbar.module.css';

const LINKS = [{ title: 'Projects', href: '/project' }];

const Navbar = ({ children }: PropsWithChildren) => {
	const { pathname } = useLocation();
	const { getAdminAccess } = useContext(AuthContext);
	const { isAuthenticated } = useContext(AuthContext);

	const isLoggedIn = useMemo(() => isAuthenticated(), [isAuthenticated]);

	// TODO implement admin access
	const [adminAccess, setAdminMenu] = useState(getAdminAccess());

	const [drawerOpened, setDrawerOpened] = useState(true);
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
			</Flex>
			<Flex>
				{isLoggedIn && (
					<Box className={classes.sidebar} data-opened={drawerOpened}>
						<ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
							<Box px="md">
								{LINKS.map(({ title, href }) => (
									<NavLink
										className={classes.link}
										key={title}
										to={href}
										component={Link}
										label={title}
										active={pathname === href}
										variant="filled"
									/>
								))}
							</Box>
						</ScrollArea>
					</Box>
				)}
				{children}
			</Flex>
		</>
	);
};

export default Navbar;
