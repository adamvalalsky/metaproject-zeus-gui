import { Box, Title } from '@mantine/core';

import { useProjectOutletContext } from '@/routes/project/detail/guard';
import AddMembersSelect from '@/components/project/members/add-members-select';

const ProjectDetailMembers = () => {
	const { project } = useProjectOutletContext();

	return (
		<Box>
			<Title>{project.title}</Title>
			<Title order={3} mt={20}>
				Add members
				<AddMembersSelect />
			</Title>
		</Box>
	);
};

export default ProjectDetailMembers;
