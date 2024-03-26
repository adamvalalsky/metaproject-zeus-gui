import { Alert, Divider, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { useContext, useState } from 'react';
import DrawerList from '../DrawerList';
import UserMenu from '../UserMenu';
import AdministratorToggle from '../AdministratorToggle';
import { AuthContext } from '../../modules/auth/context.tsx';
import { isAdminLoggedIn } from '../../modules/user/utils/admin.ts';
import { AppBar, Drawer, DrawerHeader } from './styled.tsx';
import { ADMIN_WARNING_HEIGHT, MENU_HEIGHT } from './constants.ts';

type AppMenuProps = {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	shouldHaveDrawer: boolean;
};

const AppMenu = ({ isOpen, setIsOpen, shouldHaveDrawer }: AppMenuProps) => {
	const { getAdminAccess } = useContext(AuthContext);
	const [adminAccess, setAdminMenu] = useState(getAdminAccess());

	const { t } = useTranslation();

	return (
		<>
			<AppBar open={isOpen}>
				{isAdminLoggedIn(adminAccess) && (
					<Alert
						variant="filled"
						severity="warning"
						sx={{ padding: '1px', borderRadius: 0, justifyContent: 'center', height: ADMIN_WARNING_HEIGHT }}
					>
						{t('components.AppMenu.adminWarning')}
					</Alert>
				)}
				<Toolbar sx={{ display: 'grid', gridAutoFlow: 'column', height: MENU_HEIGHT }}>
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
						<AdministratorToggle adminAccess={adminAccess} setAdminMenu={setAdminMenu} />
						<UserMenu />
					</Box>
				</Toolbar>
			</AppBar>
			{shouldHaveDrawer && (
				<Drawer variant="permanent" open={isOpen}>
					<DrawerHeader hasAdminWarning={isAdminLoggedIn(adminAccess)} />
					<Divider />
					<DrawerList open={isOpen} />
				</Drawer>
			)}
		</>
	);
};

export default AppMenu;
