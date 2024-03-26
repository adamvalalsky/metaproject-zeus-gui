import { Divider, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import DrawerList from '../DrawerList';
import UserMenu from '../UserMenu';
import AdministratorToggle from '../AdministratorToggle';
import { AppBar, Drawer, DrawerHeader } from './styled.tsx';

type AppMenuProps = {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	shouldHaveDrawer: boolean;
};

const AppMenu = ({ isOpen, setIsOpen, shouldHaveDrawer }: AppMenuProps) => {
	const { t } = useTranslation();

	return (
		<>
			<AppBar position="fixed" open={isOpen}>
				<Toolbar sx={{ display: 'grid', gridAutoFlow: 'column' }}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
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
							{t('components.AppMenu.header')}
						</Typography>
					</Box>
					<Box sx={{ justifySelf: 'end', display: 'flex', alignItems: 'center' }}>
						<AdministratorToggle />
						<UserMenu />
					</Box>
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
