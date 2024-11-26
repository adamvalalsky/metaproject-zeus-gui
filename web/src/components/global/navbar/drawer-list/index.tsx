import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, NavLink, rem, ScrollArea } from '@mantine/core';
import {
	IconActivity,
	IconArchive,
	IconBan,
	IconClockQuestion,
	IconCpu,
	IconDeviceDesktopAnalytics,
	IconDevices2,
	IconPodium,
	IconQuestionMark,
	IconReport,
	IconUserUp
} from '@tabler/icons-react';
import React from 'react';

import { useAdminContext } from '@/modules/auth/admin-context';
import { Role } from '@/modules/user/role';

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
		{
			title: 'components.global.drawerList.links.projects.title',
			href: '/project',
			icon: <IconReport />,
			links: [
				{
					title: 'components.global.drawerList.links.projects.active',
					href: '/project?status=active',
					icon: <IconActivity />
				},
				{
					title: 'components.global.drawerList.links.projects.requested',
					href: '/project?status=requested',
					icon: <IconClockQuestion />
				},
				{
					title: 'components.global.drawerList.links.projects.archived',
					href: '/project?status=archived',
					icon: <IconArchive />
				},
				{
					title: 'components.global.drawerList.links.projects.rejected',
					href: '/project?status=rejected',
					icon: <IconBan />
				}
			]
		}
	];

	const { pathname } = useLocation();
	const { t } = useTranslation();
	const { currentRole } = useAdminContext();

	if (currentRole === Role.ADMIN) {
		LINKS.push({
			title: 'components.global.drawerList.links.admin.title',
			href: '/admin',
			icon: <IconUserUp />,
			links: [
				{
					title: 'components.global.drawerList.links.admin.link.allocations',
					href: '/admin/allocations',
					icon: <IconCpu />
				},
				{
					title: 'components.global.drawerList.links.admin.link.projects',
					href: '/admin/projects',
					icon: <IconReport />
				},
				{
					title: 'components.global.drawerList.links.admin.link.requests',
					href: '/admin/requests',
					icon: <IconQuestionMark />
				},
				{
					title: 'components.global.drawerList.links.admin.link.resources',
					href: '/admin/resources',
					icon: <IconDevices2 />
				},
				{
					title: 'components.global.drawerList.links.admin.link.allocation_requests',
					href: '/admin/allocation-requests',
					icon: <IconDeviceDesktopAnalytics />
				},
				{
					title: 'components.global.drawerList.links.admin.link.stages',
					href: '/admin/stages',
					icon: <IconPodium />
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
