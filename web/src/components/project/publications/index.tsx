import { ActionIcon, Badge, Box, Group, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { useState } from 'react';
import { IconLibrary, IconTrash } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

import AddPublication from '@/components/project/publications/add-publication';
import { useProjectPublicationsQuery } from '@/modules/publication/queries';
import { getSortQuery } from '@/modules/api/sorting/utils';
import ErrorAlert from '@/components/global/error-alert';
import { type Publication } from '@/modules/publication/model';
import PublicationCard from '@/components/project/publications/publication-card';
import { PUBLICATION_PAGE_SIZES } from '@/modules/publication/constants';
import { useRemovePublicationMutation } from '@/modules/publication/mutations';
import Loading from '@/components/global/loading';
import { useProjectOutletContext } from '@/modules/auth/guards/project-detail-guard';

type ProjectPublicationsType = {
	id: number;
};

const ProjectPublications = ({ id }: ProjectPublicationsType) => {
	const { t } = useTranslation();

	const { permissions } = useProjectOutletContext();
	const [currentPublication, setCurrentPublication] = useState<number | null>(null);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(PUBLICATION_PAGE_SIZES[0]);
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Publication>>({
		columnAccessor: 'id',
		direction: 'asc'
	});

	const { mutate, isPending: isRemovePending } = useRemovePublicationMutation();
	const {
		data: response,
		isPending,
		isError,
		refetch
	} = useProjectPublicationsQuery(
		id,
		{
			page,
			limit
		},
		getSortQuery(sortStatus.columnAccessor, sortStatus.direction)
	);

	if (isPending) {
		return <Loading />;
	}

	if (isError) {
		return <ErrorAlert />;
	}

	const metadata = response.metadata;
	const publications = response.data ?? [];

	const onPageChange = async (newPage: number) => {
		setPage(newPage);
		await refetch();
	};

	const onRecordsPerPageChange = async (newRecordsPerPage: number) => {
		setLimit(newRecordsPerPage);
		await refetch();
	};

	const onSortStatusChange = async (sortStatus: DataTableSortStatus<Publication>) => {
		setSortStatus(sortStatus);
		await refetch();
	};

	const removePublication = (publicationId: number | undefined) => {
		if (publicationId === undefined) {
			return;
		}

		setCurrentPublication(publicationId);

		mutate(publicationId, {
			onSuccess: () => {
				notifications.show({
					message: t('components.project.publications.index.notifications.publication_removed')
				});
				refetch().then();
			},
			onError: () => {
				notifications.show({
					message: t('components.project.publications.index.notifications.error'),
					color: 'red'
				});
			},
			onSettled: () => {
				setCurrentPublication(null);
			}
		});
	};

	return (
		<Box mt={30}>
			<Group justify="space-between" mb={5}>
				<Group>
					<Title order={3}>
						<IconLibrary /> {t('components.project.publications.index.title')}
					</Title>
					<Badge variant="filled" color="gray">
						{metadata?.totalRecords ?? 0}
					</Badge>
				</Group>
				{permissions.includes('edit_publications') && <AddPublication id={id} />}
			</Group>
			<DataTable
				height={300}
				withTableBorder
				textSelectionDisabled
				page={page}
				totalRecords={metadata?.totalRecords}
				recordsPerPage={limit}
				fetching={isPending}
				records={publications}
				noRecordsText={t('components.project.publications.index.no_records_text')}
				onPageChange={onPageChange}
				recordsPerPageOptions={PUBLICATION_PAGE_SIZES}
				onRecordsPerPageChange={onRecordsPerPageChange}
				sortStatus={sortStatus}
				onSortStatusChange={onSortStatusChange}
				columns={[
					{
						title: t('components.project.publications.index.columns.publication_info'),
						accessor: 'info',
						render: publication => <PublicationCard publication={publication} />
					},
					{
						accessor: 'year',
						title: t('components.project.publications.index.columns.year'),
						width: 150,
						sortable: true
					},
					{
						accessor: 'actions',
						title: t('components.project.publications.index.columns.actions'),
						textAlign: 'center',
						width: 120,
						render: publication => (
							<Group gap={4} justify="space-between" wrap="nowrap">
								<ActionIcon
									size="sm"
									variant="subtle"
									color="red"
									loading={isRemovePending && currentPublication === publication.id}
									onClick={() => removePublication(publication?.id)}
								>
									<IconTrash size={24} />
								</ActionIcon>
							</Group>
						)
					}
				]}
			/>
		</Box>
	);
};

export default ProjectPublications;
