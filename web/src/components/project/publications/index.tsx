import { Badge, Box, Group, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { useState } from 'react';
import { IconLibrary } from '@tabler/icons-react';

import { PAGE_SIZES } from '@/modules/api/pagination/constants';
import AddPublication from '@/components/project/publications/add-publication';
import type { ProjectMember } from '@/modules/project/model';

type ProjectPublicationsType = {
	id: number;
};

const ProjectPublications = ({ id }: ProjectPublicationsType) => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(PAGE_SIZES[0]);
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus<ProjectMember>>({
		columnAccessor: 'id',
		direction: 'asc'
	});

	const metadata = undefined;
	const publications = [];
	const { t } = useTranslation();

	const onPageChange = async (newPage: number) => {
		setPage(newPage);
	};

	const onRecordsPerPageChange = async (newRecordsPerPage: number) => {
		setLimit(newRecordsPerPage);
	};

	const onSortStatusChange = async (sortStatus: DataTableSortStatus<ProjectMember>) => {
		setSortStatus(sortStatus);
	};

	return (
		<Box mt={30}>
			<Group justify="space-between" mb={5}>
				<Group>
					<Title order={3}>
						<IconLibrary /> {t('components.project.publications.index.title')}
					</Title>
					<Badge variant="filled" color="gray">
						0
					</Badge>
				</Group>
				<AddPublication id={id} />
			</Group>
			<DataTable
				height={300}
				withTableBorder
				textSelectionDisabled
				page={page}
				totalRecords={0}
				recordsPerPage={limit}
				records={publications}
				noRecordsText={t('components.project.publications.index.no_records_text')}
				onPageChange={onPageChange}
				recordsPerPageOptions={PAGE_SIZES}
				onRecordsPerPageChange={onRecordsPerPageChange}
				sortStatus={sortStatus}
				onSortStatusChange={onSortStatusChange}
				columns={[
					{
						title: t('components.project.publications.index.columns.publication_info'),
						render: publication => publication.id
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
