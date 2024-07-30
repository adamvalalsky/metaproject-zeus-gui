import { Group, Text, Timeline } from '@mantine/core';
import dayjs from 'dayjs';

import { type RejectedComment } from '@/modules/project/model';

type CommentsTimelineProps = {
	rejectedComments: RejectedComment[];
};

const CommentsTimeline = ({ rejectedComments }: CommentsTimelineProps) => (
	<Timeline bulletSize={10} my={20} active={rejectedComments.length}>
		{rejectedComments.map(comment => (
			<Timeline.Item
				key={comment.comment}
				title={
					<Group gap={5}>
						<Text>Review by</Text>
						<Text fw="bold">{comment.author}</Text>
						<Text c="dimmed">({dayjs(comment.createdAt).format('DD.MM.YYYY HH:mm:ss')})</Text>
					</Group>
				}
			>
				<Text dangerouslySetInnerHTML={{ __html: comment.comment }} />
			</Timeline.Item>
		))}
	</Timeline>
);

export default CommentsTimeline;
