import { Box, Group, Skeleton, Stack, Text, Title } from '@mantine/core';

import { useProjectMembersQuery } from '@/modules/project/queries';
import ErrorAlert from '@/components/global/error-alert';
import AddButton from '@/components/project/members/add-button';

type ProjectMembersProps = {
	id: number;
};

const ProjectMembers = ({ id }: ProjectMembersProps) => {
	const { data: response, isPending, isError } = useProjectMembersQuery(id);

	if (isPending) {
		return <Skeleton w={300} />;
	}

	if (isError) {
		return <ErrorAlert />;
	}

	const members = response.data.members;

	return (
		<Box mt={30}>
			<Group justify="space-between">
				<Title order={3}>Project members</Title>
				{members.length > 0 && <AddButton id={id} />}
			</Group>
			{members.length === 0 && (
				<Stack mt={20} align="center" gap={5}>
					<Text>No members added yet.</Text>
					<AddButton id={id} />
				</Stack>
			)}
		</Box>
	);
};

export default ProjectMembers;
