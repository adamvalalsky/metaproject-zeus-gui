import { useOutletContext, useParams } from 'react-router';
import { Outlet } from 'react-router-dom';

import NotFound from '@/components/global/not-found';
import { useProjectDetailQuery } from '@/modules/project/queries';
import MainContentWrapper from '@/components/global/content-wrapper';
import { type ArchivalInfo, type Project, type RejectedComment } from '@/modules/project/model';
import Loading from '@/components/global/loading';
import ErrorPage from '@/components/global/error-page';
import { ApiClientError } from '@/modules/api/model';

type ContextType = {
	project: Project;
	permissions: string[];
	archivalInfo: ArchivalInfo;
	rejectedComments: RejectedComment[];
};

export const useProjectOutletContext = () => useOutletContext<ContextType>();

const ProjectDetailGuard = () => {
	const { id } = useParams();

	if (!id || isNaN(+id)) {
		return <NotFound />;
	}

	const { data: projectData, error, isPending } = useProjectDetailQuery(+id);

	if (error) {
		if (error instanceof ApiClientError && error.response.data.code === 10002) {
			return <NotFound />;
		}

		return <ErrorPage />;
	}

	if (isPending) {
		return <Loading text="Loading project..." />;
	}

	const project = projectData.data.project;
	const permissions = projectData.data.permissions;
	const archivalInfo = projectData.data.archivalInfo;
	const rejectedComments = projectData.data.rejectedComments;

	return (
		<MainContentWrapper mt={30}>
			<Outlet context={{ project, permissions, archivalInfo, rejectedComments }} />
		</MainContentWrapper>
	);
};

export default ProjectDetailGuard;
