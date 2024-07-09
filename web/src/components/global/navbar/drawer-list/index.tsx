import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, NavLink, rem, ScrollArea } from '@mantine/core';
import { IconDevicesQuestion, IconReport, IconUserUp } from '@tabler/icons-react';

import { getAdminAccess } from '@/modules/auth/methods/getAdminAccess';
import { AdminAccess } from '@/modules/auth/model';

import classes from '../navbar.module.css';

type DrawerListProps = {
	open: boolean;
};

type LinkNode = {
	title: string;
	href: string;
	icon: React.ReactNode;
	links?: LinkNode[];
};

const DrawerList = ({ open }: DrawerListProps) => {
	const getLinkTree = (link: LinkNode) => {
		const { title, href, icon, links } = link;
		return (
			<NavLink
				className={classes.link}
				key={title}
				to={href}
				component={Link}
				label={t(title)}
				active={pathname.includes(href)}
				variant="filled"
				leftSection={icon}
			>
				{links?.map(link => getLinkTree(link))}
			</NavLink>
		);
	};

	const LINKS: LinkNode[] = [
		{ title: 'components.global.drawerList.links.projects', href: '/project', icon: <IconReport /> }
	];

	const { pathname } = useLocation();
	const { t } = useTranslation();
	const adminAccess = getAdminAccess();

	if (adminAccess === AdminAccess.LOGGED) {
		LINKS.push({
			title: 'components.global.drawerList.links.admin.title',
			href: '/admin',
			icon: <IconUserUp />,
			links: [
				{
					title: 'components.global.drawerList.links.admin.link.requests',
					href: '/admin/requests',
					icon: <IconDevicesQuestion />
				}
			]
		});
	}

	return (
		<Box className={classes.sidebar} data-opened={open}>
			<ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
				<Box px="md">{LINKS.map(link => getLinkTree(link))}</Box>
			</ScrollArea>
		</Box>
	);
};

export default DrawerList;
