import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Loading from '@/components/global/loading';

import Navbar from '../../components/global/navbar';
import MainContentWrapper from '../../components/global/content-wrapper';

const Root: React.FC = () => (
	<Navbar>
		<Suspense fallback={<Loading />}>
			<MainContentWrapper>
				<Outlet />
			</MainContentWrapper>
		</Suspense>
	</Navbar>
);

export default Root;
