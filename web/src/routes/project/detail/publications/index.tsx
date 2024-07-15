import { ActionIcon, Box, Button, Divider, Group, Stack, TextInput, Title } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconClipboardPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { useProjectOutletContext } from '@/modules/auth/guards/project-detail-guard';
import { type Publication } from '@/modules/publication/model';

const ProjectPublicationsAddPage = () => {
	const { t } = useTranslation();
	const { project } = useProjectOutletContext();
	const [publications, setPublications] = useState<Publication[]>([]);

	const handleSelect = (pickedPublication: Publication) => {
		// publication is picked - remove
		if (publications.some(publication => publication.uniqueId === pickedPublication.uniqueId)) {
			setPublications(publications =>
				publications.filter(publication => publication.uniqueId !== pickedPublication.uniqueId)
			);
		} else {
			setPublications(publications => [...publications, pickedPublication]);
		}
	};

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: 'Projects', href: '/project' },
					{ title: project.title, href: `/project/${project.id}` },
					{ title: t('routes.ProjectPublicationsAddPage.title'), href: `/project/${project.id}/publications` }
				]}
			/>
			<Title>{project.title}</Title>
			<Title order={3} mt={20}>
				{t('routes.ProjectPublicationsAddPage.title')}
			</Title>
			<Stack mt={20}>
				<form>
					<Stack>
						<TextInput label="DOI" placeholder="Search by DOI" />
						<Button fullWidth type="submit" leftSection={<IconSearch />}>
							Search by DOI
						</Button>
					</Stack>
				</form>
				<Divider label="or" />
				<Button variant="outline" color="teal" leftSection={<IconClipboardPlus />}>
					Add publication manually
				</Button>
			</Stack>
			{publications.length > 0 && (
				<Box mt={30}>
					<Title order={4}>{t('routes.ProjectPublicationsAddPage.table.title')}</Title>
					<DataTable
						height={500}
						withTableBorder
						striped
						records={publications}
						columns={[
							{
								accessor: 'title',
								title: t('components.project.publications.index.columns.publication_info'),
								render: publication => publication.uniqueId
							},
							{
								accessor: 'year',
								title: t('components.project.publications.index.columns.year'),
								width: 150
							},
							{
								accessor: 'actions',
								title: '',
								textAlign: 'center',
								width: 120,
								render: userInfo => (
									<Group gap={4} justify="space-between" wrap="nowrap">
										<ActionIcon
											size="sm"
											variant="subtle"
											color="red"
											onClick={() => handleSelect(userInfo)}
										>
											<IconTrash size={24} />
										</ActionIcon>
									</Group>
								)
							}
						]}
					/>
					<Button color="teal" fullWidth mt={10} onClick={onClick} loading={isPending}>
						Add {pickedMembers.length} member{pickedMembers.length > 1 ? 's' : ''}
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default ProjectPublicationsAddPage;
