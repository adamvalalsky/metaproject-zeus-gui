import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

type AppMenuProps = {
	open?: boolean;
	toggleDrawer: (() => void) | null;
};

const AppMenu = ({ open, toggleDrawer }: AppMenuProps) => {
	return (
		<AppBar position="absolute" color="primary" elevation={0}>
			<Toolbar>
				{toggleDrawer && (
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={toggleDrawer}
						sx={{ mr: 2, ...(open && { display: 'none' }) }}
					>
						<MenuIcon />
					</IconButton>
				)}
				<Typography variant="h6" color="inherit" noWrap>
					Resource manager
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default AppMenu;
