import { ActionIcon, Box, Button, Divider, Group, Stack, TextInput, Title } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconClipboardPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { useProjectOutletContext } from '@/modules/auth/guards/project-detail-guard';
import { type Publication } from '@/modules/publication/model';
import { searchByDoiSchema, type SearchByDoiSchema } from '@/modules/publication/form';
import { searchByDoi } from '@/modules/publication/api/search-by-doi';
import PublicationCard from '@/components/project/publications/publication-card';

const ProjectPublicationsAddPage = () => {
	const { t } = useTranslation();
	const { project } = useProjectOutletContext();
	const [publications, setPublications] = useState<Publication[]>([]);

	const searchDoiForm = useForm<SearchByDoiSchema>({
		resolver: zodResolver(searchByDoiSchema)
	});

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

	const searchDoiSubmit = async (values: SearchByDoiSchema) => {
		const publication = await searchByDoi(values.doi);

		if (!publication) {
			searchDoiForm.setError('doi', {
				type: 'custom',
				message: 'Publication not found'
			});
			return;
		}

		handleSelect(publication);
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
				<form onSubmit={searchDoiForm.handleSubmit(searchDoiSubmit)}>
					<Stack>
						<TextInput
							label="DOI"
							placeholder="Search by DOI"
							error={searchDoiForm.formState.errors.doi?.message}
							{...searchDoiForm.register('doi')}
						/>
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
				<Box py={30}>
					<Title order={4}>{t('routes.ProjectPublicationsAddPage.table.title')}</Title>
					<DataTable
						height={500}
						withTableBorder
						striped
						records={publications}
						columns={[
							{
								accessor: 'uniqueId',
								title: t('components.project.publications.index.columns.publication_info'),
								render: publication => (
									<PublicationCard key={publication.uniqueId} publication={publication} />
								)
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
					<Button color="teal" fullWidth mt={10}>
						Add {publications.length} publication{publications.length > 1 ? 's' : ''}
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default ProjectPublicationsAddPage;
