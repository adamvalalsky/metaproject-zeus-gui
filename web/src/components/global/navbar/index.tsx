import { useTranslation } from 'react-i18next';
import { useContext, useState } from 'react';
import { Anchor, Box, Burger, Flex, Group, NavLink, rem, ScrollArea, Tooltip } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../modules/auth/context.tsx';

import classes from './navbar.module.css';

const LINKS = [{ title: 'Projects', href: '/project' }];

type AppMenuProps = {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	shouldHaveDrawer: boolean;
};

const Navbar = ({ isOpen, setIsOpen, shouldHaveDrawer }: AppMenuProps) => {
	console.log(classes);
	const { pathname } = useLocation();
	const { getAdminAccess } = useContext(AuthContext);
	const [adminAccess, setAdminMenu] = useState(getAdminAccess());

	const [drawerOpened, setDrawerOpened] = useState(true);
	const toggleDrawer = () => setDrawerOpened((opened) => !opened);
	const closeDrawer = () => setDrawerOpened(false);

	const { t } = useTranslation();

	return (
		<>
			<Flex justify="space-between" align="center" className={classes.wrapper}>
				<Box component="header" color="white">
					<Group h="100%" pl={10}>
						<Group>
							<Tooltip label="Menu" zIndex={600}>
								<Burger size="sm" color="white" onClick={toggleDrawer} />
							</Tooltip>
						</Group>
						<Anchor component={Link} to="/" c="white" underline="never">
							Resource manager
						</Anchor>
					</Group>
				</Box>
			</Flex>
			<Box className={classes.sidebar} data-closed={drawerOpened}>
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
		</>
	);
};

export default Navbar;
