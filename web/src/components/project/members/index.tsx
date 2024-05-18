import { Box, Button, Group, Skeleton, Stack, Text, Title } from '@mantine/core';

import { useProjectMembersQuery } from '@/modules/project/queries';
import ErrorAlert from '@/components/global/error-alert';

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
				{members.length > 0 && <Button>Add members</Button>}
			</Group>
			{members.length === 0 && (
				<Stack mt={20} align="center" gap={5}>
					<Text>No members found yet.</Text>
					<Button>Add members</Button>
				</Stack>
			)}
		</Box>
	);
};

export default ProjectMembers;
