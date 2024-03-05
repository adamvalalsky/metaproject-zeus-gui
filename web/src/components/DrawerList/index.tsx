import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { CollectionsBookmark } from '@mui/icons-material';

type DrawerListProps = {
	open: boolean;
};

const DrawerList = ({ open }: DrawerListProps) => {
	return (
		<List>
			<ListItem disablePadding sx={{ display: 'block' }}>
				<ListItemButton
					sx={{
						minHeight: 48,
						justifyContent: open ? 'initial' : 'center',
						px: 2.5
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
					<ListItemText primary="Projekty" sx={{ opacity: open ? 1 : 0 }} />
				</ListItemButton>
			</ListItem>
		</List>
	);
};

export default DrawerList;
