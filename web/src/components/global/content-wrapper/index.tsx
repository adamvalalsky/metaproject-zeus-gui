import React from 'react';
import { Container, type ContainerProps } from '@mantine/core';

const MainContentWrapper = ({
	children,
	...props
}: Readonly<
	{
		children: React.ReactNode;
	} & ContainerProps
>) => (
	<Container size="xl" {...props}>
		{children}
	</Container>
);

export default MainContentWrapper;
