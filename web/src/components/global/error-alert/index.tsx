import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

const ErrorAlert = () => (
	<Alert variant="light" color="red" title="Alert title" icon={<IconInfoCircle />}>
		Something went wrong. Please, try again later.
	</Alert>
);

export default ErrorAlert;
