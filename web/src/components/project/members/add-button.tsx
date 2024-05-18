import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

type AddButtonProps = {
	id: number;
};

const AddButton = ({ id }: AddButtonProps) => (
	<Button component={Link} to={`/project/${id}/members`} color="green" leftSection={<IconPlus size={14} />}>
		Add members
	</Button>
);

export default AddButton;
