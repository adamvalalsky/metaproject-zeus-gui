import { Anchor, Divider, Flex, Group, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

import { sanitize } from '@/modules/html/sanitize';
import { type Project } from '@/modules/project/model';

type ProjectInfoProps = {
	project: Project;
	showFullDescription: boolean;
};

const ProjectInfo = ({ project, showFullDescription }: ProjectInfoProps) => {
	const textRef = useRef<HTMLParagraphElement>(null);
	const [isClamped, setIsClamped] = useState(false);
	const [isShownMore, setIsShownMore] = useState(false);

	useEffect(() => {
		if (!textRef.current) {
			return;
		}

		setIsClamped(textRef.current.scrollHeight > textRef.current.clientHeight);
	}, [textRef.current]);

	return (
		<Stack mt={15}>
			<Group justify="space-between">
				<Group gap={10}>
					<Title order={4}>Principal investigator:</Title>
					<Text size="lg">{project.user.name}</Text>
				</Group>
				<Text c="dimmed" size="sm">
					Created at: {dayjs(project.createdAt).format('DD.MM.YYYY')}
				</Text>
			</Group>
			<Divider />
			<Flex direction="column">
				<Title order={4}>Description:</Title>
				<Text
					ref={textRef}
					lineClamp={showFullDescription || isShownMore ? undefined : 4}
					dangerouslySetInnerHTML={{ __html: sanitize(project.description) }}
				/>
				{isClamped && !isShownMore && <Anchor onClick={() => setIsShownMore(true)}>Show more</Anchor>}
				{isShownMore && <Anchor onClick={() => setIsShownMore(false)}>Hide</Anchor>}
			</Flex>
		</Stack>
	);
};

export default ProjectInfo;
