import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import React, { useState } from 'react';
import { Box } from '@mantine/core';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import NotFound from '@/components/global/not-found';
import { useResourceDetailQuery } from '@/modules/allocation/queries';
import Loading from '@/components/global/loading';
import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import ResourceForm from '@/components/resource/resource-form';
import { addResourceSchema, type AddResourceSchema } from '@/modules/allocation/form';
import { type Attribute } from '@/modules/attribute/model';

const ResourceEditPage = () => {
	const { t } = useTranslation();
	const { id } = useParams();

	if (!id || isNaN(+id)) {
		return <NotFound />;
	}

	const { data, isPending, isError } = useResourceDetailQuery(+id);
	const [attributes, setAttributes] = useState<Attribute[]>([]);

	const form = useForm<AddResourceSchema>({
		resolver: zodResolver(addResourceSchema)
	});

	if (isPending) {
		return <Loading />;
	}

	if (isError) {
		return <NotFound />;
	}

	const onSubmit = (data: AddResourceSchema) => {
		console.log(data);
	};

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: t('components.global.drawerList.links.admin.title'), href: '/admin' },
					{ title: t('components.global.drawerList.links.admin.link.resources'), href: '/admin/resources' },
					{ title: data.name, href: `/admin/resources/${id}` },
					{ title: 'Edit resource', href: `/admin/resources/${id}/edit` }
				]}
			/>
			<h1>Edit resource</h1>
			<Box mt={15}>
				<FormProvider {...form}>
					<ResourceForm
						defaultValues={data}
						isPending={isPending}
						setAttributes={setAttributes}
						attributes={attributes}
						onSubmit={onSubmit}
					/>
				</FormProvider>
			</Box>
		</Box>
	);
};

export default ResourceEditPage;
