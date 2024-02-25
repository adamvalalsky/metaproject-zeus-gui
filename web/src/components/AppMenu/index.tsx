import { Divider, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DrawerList from '../DrawerList';
import { AppBar, Drawer, DrawerHeader } from './styled.tsx';

type AppMenuProps = {
	open?: boolean;
};

const AppMenu = ({ open }: AppMenuProps) => {
	const shouldHaveDrawer = open !== undefined;
	const [isOpen, setIsOpen] = useState(open);

	return (
		<>
			<AppBar position="fixed" open={isOpen}>
				<Toolbar>
					{shouldHaveDrawer && (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={() => setIsOpen(true)}
							sx={{ mr: 5, ...(isOpen && { display: 'none' }) }}
						>
							<MenuIcon />
						</IconButton>
					)}
					<Typography variant="h6" color="inherit" noWrap>
						Resource manager
					</Typography>
				</Toolbar>
			</AppBar>
			{shouldHaveDrawer && (
				<Drawer variant="permanent" open={isOpen}>
					<DrawerHeader>
						<IconButton onClick={() => setIsOpen(false)}>
							<ChevronLeftIcon />
						</IconButton>
					</DrawerHeader>
					<Divider />
					<DrawerList open={isOpen} />
				</Drawer>
			)}
		</>
	);
};

export default AppMenu;
