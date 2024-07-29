import { ActionIcon, Box, Button, Divider, Group, NumberInput, Stack, TextInput, Title } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconClipboardPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { useProjectOutletContext } from '@/modules/auth/guards/project-detail-guard';
import { type Publication } from '@/modules/publication/model';
import {
	manualPublicationSchema,
	type ManualPublicationSchema,
	searchByDoiSchema,
	type SearchByDoiSchema
} from '@/modules/publication/form';
import { searchByDoi } from '@/modules/publication/api/search-by-doi';
import PublicationCard from '@/components/project/publications/publication-card';
import { useAddPublicationsMutation } from '@/modules/publication/mutations';

const ProjectPublicationsAddPage = () => {
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { project } = useProjectOutletContext();

	const [publications, setPublications] = useState<Publication[]>([]);
	const [isSearching, setIsSearching] = useState(false);

	const searchDoiForm = useForm<SearchByDoiSchema>({
		resolver: zodResolver(searchByDoiSchema)
	});
	const addPublicationManuallyForm = useForm<ManualPublicationSchema>({
		resolver: zodResolver(manualPublicationSchema)
	});

	const { mutate, isPending } = useAddPublicationsMutation();

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
		setIsSearching(true);
		const publication = await searchByDoi(values.doi);
		setIsSearching(false);

		if (!publication) {
			searchDoiForm.setError('doi', {
				type: 'custom',
				message: 'Publication not found'
			});
			return;
		}

		searchDoiForm.reset();
		handleSelect({
			...publication,
			source: 'doi'
		});
	};

	const onManualAddSubmit = (values: ManualPublicationSchema) => {
		const publication: Publication = {
			title: values.title,
			year: +values.year,
			authors: values.authors,
			journal: values.journal,
			source: 'manual'
		};

		handleSelect(publication);
		addPublicationManuallyForm.reset();
		modals.closeAll();
	};

	const openManualPublicationAdd = () => {
		modals.open({
			title: t('routes.ProjectPublicationsAddPage.modal.title'),
			centered: true,
			size: 'xl',
			children: (
				<form onSubmit={addPublicationManuallyForm.handleSubmit(onManualAddSubmit)}>
					<TextInput
						label={t('routes.ProjectPublicationsAddPage.modal.form.title')}
						{...addPublicationManuallyForm.register('title')}
						error={addPublicationManuallyForm.formState.errors.title?.message}
						withAsterisk
						placeholder="Interaction effects in topological superconducting wires supporting Majorana fermions"
					/>
					<TextInput
						label={t('routes.ProjectPublicationsAddPage.modal.form.authors')}
						withAsterisk
						{...addPublicationManuallyForm.register('authors')}
						error={addPublicationManuallyForm.formState.errors.authors?.message}
						placeholder="E. M. Stoudenmire and Jason Alicea and Oleg A. Starykh and Matthew P.A. Fisher"
					/>
					<Controller
						control={addPublicationManuallyForm.control}
						name="year"
						render={({ field }) => (
							<NumberInput
								label={t('routes.ProjectPublicationsAddPage.modal.form.year')}
								placeholder="2011"
								name={field.name}
								withAsterisk
								min={0}
								max={2200}
								error={addPublicationManuallyForm.formState.errors.year?.message}
								onChange={e => field.onChange(+e)}
							/>
						)}
					/>
					<TextInput
						label={t('routes.ProjectPublicationsAddPage.modal.form.journal')}
						placeholder="Physical Review B"
						withAsterisk
						{...addPublicationManuallyForm.register('journal')}
						error={addPublicationManuallyForm.formState.errors.journal?.message}
					/>
					<Group mt={15} justify="center">
						<Button type="submit">{t('routes.ProjectPublicationsAddPage.modal.form.submit')}</Button>
					</Group>
				</form>
			)
		});
	};

	const addPublications = () => {
		mutate(
			{
				projectId: project.id,
				publications
			},
			{
				onSuccess: () => {
					notifications.show({
						message: t('routes.ProjectPublicationsAddPage.success.message')
					});
					queryClient
						.refetchQueries({
							queryKey: ['project', project.id]
						})
						.then(() => {
							navigate(`/project/${project.id}`);
						});
				},
				onError: () => {
					notifications.show({
						message: t('routes.ProjectPublicationsAddPage.error.message'),
						color: 'red'
					});
				}
			}
		);
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
						<Button fullWidth type="submit" leftSection={<IconSearch />} loading={isSearching}>
							{t('routes.ProjectPublicationsAddPage.search_by_doi')}
						</Button>
					</Stack>
				</form>
				<Divider label="or" />
				<Button
					onClick={openManualPublicationAdd}
					variant="outline"
					color="teal"
					leftSection={<IconClipboardPlus />}
				>
					{t('routes.ProjectPublicationsAddPage.add_manually')}
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
								accessor: 'title',
								title: t('components.project.publications.index.columns.publication_info'),
								render: publication => (
									<PublicationCard key={publication.title} publication={publication} />
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
					<Button onClick={addPublications} color="teal" fullWidth mt={10} loading={isPending}>
						{t('routes.ProjectPublicationsAddPage.add_button', { count: publications.length })}
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default ProjectPublicationsAddPage;
