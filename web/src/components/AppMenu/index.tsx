import { Divider, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerList from '../DrawerList';
import { AppBar, Drawer, DrawerHeader } from './styled.tsx';

type AppMenuProps = {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	shouldHaveDrawer: boolean;
};

const AppMenu = ({ isOpen, setIsOpen, shouldHaveDrawer }: AppMenuProps) => {
	return (
		<>
			<AppBar position="fixed" open={isOpen}>
				<Toolbar>
					{shouldHaveDrawer && (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={() => setIsOpen(!isOpen)}
							sx={{ mr: 5 }}
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
					<DrawerHeader />
					<Divider />
					<DrawerList open={isOpen} />
				</Drawer>
			)}
		</>
	);
};

export default AppMenu;
