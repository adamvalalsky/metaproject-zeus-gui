import { Group, Loader, rem } from '@mantine/core';

import MainContentWrapper from '@/components/global/content-wrapper';

const Loading = () => (
	<MainContentWrapper>
		<Group justify="center" py={rem(150)}>
			<Loader color="sky" size={rem(40)} />
		</Group>
	</MainContentWrapper>
);

export default Loading;
