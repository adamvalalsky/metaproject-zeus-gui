import { Group, Stack, Text } from '@mantine/core';

import { type Publication } from '@/modules/publication/model';

type PublicationCardProps = {
	publication: Publication;
};

const PublicationCard = ({ publication }: PublicationCardProps) => (
	<Stack gap={0}>
		<Group gap={1}>
			<Text mb={0} fw="bold">
				Title:
			</Text>
			<Text>{publication.title}</Text>
		</Group>
		<Group gap={1}>
			<Text mb={0} fw="bold">
				Authors:
			</Text>
			<Text>{publication.authors}</Text>
		</Group>
		<Group gap={1}>
			<Text mb={0} fw="bold">
				Journal:
			</Text>
			<Text>{publication.journal}</Text>
		</Group>
	</Stack>
);

export default PublicationCard;
