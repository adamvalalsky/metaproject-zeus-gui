import { useTranslation } from 'react-i18next';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { Anchor, Box, Burger, Flex, Group, Image, Tooltip } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

import useWindowSize from '@/hooks/useWindowSize';
import { getStepUpAccess } from '@/modules/auth/methods/getStepUpAccess';

import AdministratorToggle from '../administrator-toggle';

import classes from './navbar.module.css';
import DrawerList from './drawer-list';
import UserMenu from './user-menu';

const Navbar = ({ children }: PropsWithChildren) => {
	const { t } = useTranslation();
	const { isAuthenticated } = useAuth();
	const windowSize = useWindowSize();
	const stepUpAccess = getStepUpAccess();
	const [drawerOpened, setDrawerOpened] = useState(windowSize > 1000);

	const toggleDrawer = () => setDrawerOpened(opened => !opened);

	useEffect(() => {
		setDrawerOpened(windowSize > 1000);
	}, [windowSize]);

	return (
		<>
			<Flex justify="space-between" align="center" className={classes.wrapper}>
				<Box component="header" color="white">
					<Group h="100%" pl={10}>
						{isAuthenticated && (
							<Group>
								<Tooltip label="Menu" zIndex={600}>
									<Burger size="sm" color="white" onClick={toggleDrawer} />
								</Tooltip>
							</Group>
						)}
						<Group>
							<Image
								src="/images/zeus.png"
								w={30}
								style={{
									filter: 'invert(100%)'
								}}
							/>
							<Anchor component={Link} to="/" c="white" underline="never">
								{t('components.global.navbar.header')}
							</Anchor>
						</Group>
					</Group>
				</Box>
				{isAuthenticated && (
					<Group mr={10}>
						<AdministratorToggle stepUpAccess={stepUpAccess} />
						<UserMenu />
					</Group>
				)}
			</Flex>
			<Flex>
				{isAuthenticated && <DrawerList open={drawerOpened} />}
				<Box w="100%">{children}</Box>
			</Flex>
		</>
	);
};

export default Navbar;
