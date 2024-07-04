import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, NavLink, rem, ScrollArea } from '@mantine/core';
import { IconReport } from '@tabler/icons-react';

import classes from '../navbar.module.css';

type DrawerListProps = {
	open: boolean;
};

const LINKS = [{ title: 'components.global.drawerList.links.projects', href: '/project', icon: <IconReport /> }];

const DrawerList = ({ open }: DrawerListProps) => {
	const { pathname } = useLocation();
	const { t } = useTranslation();

	return (
		<Box className={classes.sidebar} data-opened={open}>
			<ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
				<Box px="md">
					{LINKS.map(({ title, href, icon }) => (
						<NavLink
							className={classes.link}
							key={title}
							to={href}
							component={Link}
							label={t(title)}
							active={pathname.includes(href)}
							variant="filled"
							leftSection={icon}
						/>
					))}
				</Box>
			</ScrollArea>
		</Box>
	);
};

export default DrawerList;
