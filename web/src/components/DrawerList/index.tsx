import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { CollectionsBookmark } from '@mui/icons-material';

type DrawerListProps = {
	toggleDrawer: () => void;
};

const DrawerList = ({ toggleDrawer }: DrawerListProps) => {
	return (
		<Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
			<List>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<CollectionsBookmark />
						</ListItemIcon>
						<ListItemText primary={'Projekty'} />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);
};

export default DrawerList;
