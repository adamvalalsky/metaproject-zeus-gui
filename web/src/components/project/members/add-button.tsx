import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type AddButtonProps = {
	id: number;
};

const AddButton = ({ id }: AddButtonProps) => {
	const { t } = useTranslation();
	return (
		<Button component={Link} to={`/project/${id}/members`} color="green" leftSection={<IconPlus size={14} />}>
			{t('components.project.members.add_button.title')}
		</Button>
	);
};

export default AddButton;
