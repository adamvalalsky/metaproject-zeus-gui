import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { CollectionsBookmark } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

type DrawerListProps = {
	open: boolean;
};

const DrawerList = ({ open }: DrawerListProps) => {
	return (
		<List disablePadding>
			<ListItem disablePadding sx={{ display: 'block' }}>
				<ListItemButton
					component={NavLink}
					to="/project"
					sx={{
						minHeight: 48,
						justifyContent: open ? 'initial' : 'center',
						px: 2.5,
						'&.active': {
							backgroundColor: 'primary.dark'
						},
						'&:hover': {
							backgroundColor: 'primary.light'
						}
					}}
				>
					<ListItemIcon
						sx={{
							minWidth: 0,
							mr: open ? 3 : 'auto',
							justifyContent: 'center',
							color: 'primary.contrastText'
						}}
					>
						<CollectionsBookmark />
					</ListItemIcon>
					<ListItemText primary="Projects" sx={{ opacity: open ? 1 : 0 }} />
				</ListItemButton>
			</ListItem>
		</List>
	);
};

export default DrawerList;
