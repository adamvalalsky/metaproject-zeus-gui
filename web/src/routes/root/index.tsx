import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../../components/global/navbar';
import MainContentWrapper from '../../components/global/content-wrapper';

const Root: React.FC = () => (
	<Navbar>
		<MainContentWrapper>
			<Outlet />
		</MainContentWrapper>
	</Navbar>
);

export default Root;
