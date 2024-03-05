import { CSSObject, styled, Theme } from '@mui/material/styles';
import { DRAWER_WIDTH } from '../AppMenu/constants.ts';

type MainContainerProps = {
	isOpen: boolean;
};

const openedMixin = (theme: Theme): CSSObject => ({
	width: `calc(100% - ${DRAWER_WIDTH}px)`,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: 'hidden',
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		width: '100%'
	}
});

export const MainContainer = styled('div')<MainContainerProps>(({ theme, isOpen }) => ({
	float: 'right',
	...(isOpen && openedMixin(theme)),
	...(!isOpen && closedMixin(theme))
}));
