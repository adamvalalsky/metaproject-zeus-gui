import { Badge, Box, Group, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { useState } from 'react';
import { IconLibrary } from '@tabler/icons-react';

import AddPublication from '@/components/project/publications/add-publication';
import { useProjectPublicationsQuery } from '@/modules/publication/queries';
import { getSortQuery } from '@/modules/api/sorting/utils';
import ErrorAlert from '@/components/global/error-alert';
import { type Publication } from '@/modules/publication/model';
import PublicationCard from '@/components/project/publications/publication-card';
import { PUBLICATION_PAGE_SIZES } from '@/modules/publication/constants';

type ProjectPublicationsType = {
	id: number;
};

const ProjectPublications = ({ id }: ProjectPublicationsType) => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(PUBLICATION_PAGE_SIZES[0]);
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Publication>>({
		columnAccessor: 'id',
		direction: 'asc'
	});

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

	if (isError) {
		return <ErrorAlert />;
	}

	const metadata = response?.data?.metadata;
	const publications = response?.data?.publications ?? [];

	const { t } = useTranslation();

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
				<AddPublication id={id} />
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
						accessor: 'title',
						render: publication => <PublicationCard publication={publication} />
					},
					{
						accessor: 'year',
						title: t('components.project.publications.index.columns.year'),
						width: 150,
						sortable: true
					}
				]}
			/>
		</Box>
	);
};

export default ProjectPublications;
