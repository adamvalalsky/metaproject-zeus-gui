// eslint-disable-next-line import/named
import { CSSObject, styled, Theme } from '@mui/material/styles';
// eslint-disable-next-line import/named
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// eslint-disable-next-line import/named
import { BoxProps } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { ADMIN_WARNING_HEIGHT, DRAWER_WIDTH } from './constants.ts';

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

interface DrawerHeaderProps extends BoxProps {
	hasAdminWarning: boolean;
}

const openedMixin = (theme: Theme): CSSObject => ({
	width: DRAWER_WIDTH,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: 'hidden',
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: 'hidden',
	width: 0,
	[theme.breakpoints.up('sm')]: {
		width: 0
	}
});

export const DrawerHeader = styled('div', {
	shouldForwardProp: (prop) => prop !== 'open'
})<DrawerHeaderProps>(({ theme, hasAdminWarning }) => ({
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	marginTop: hasAdminWarning ? ADMIN_WARNING_HEIGHT : 0
}));

export const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
		marginLeft: DRAWER_WIDTH,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	width: DRAWER_WIDTH,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme)
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme)
	})
}));
