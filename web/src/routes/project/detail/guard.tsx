import { useOutletContext, useParams } from 'react-router';
import { Outlet } from 'react-router-dom';

import NotFound from '@/components/global/not-found';
import { useProjectDetailQuery } from '@/modules/project/queries';
import MainContentWrapper from '@/components/global/content-wrapper';
import { type Project } from '@/modules/project/model';
import Loading from '@/components/global/loading';

type ContextType = { project: Project };

export const useProjectOutletContext = () => useOutletContext<ContextType>();

const ProjectDetailGuard = () => {
	const { id } = useParams();

	if (!id || isNaN(+id)) {
		return <NotFound />;
	}

	const { data: projectData, error, isPending } = useProjectDetailQuery(+id);

	if (error) {
		return <NotFound />;
	}

	if (isPending) {
		return <Loading text="Loading project..." />;
	}

	const project = projectData.data;

	return (
		<MainContentWrapper mt={30}>
			<Outlet context={{ project }} />
		</MainContentWrapper>
	);
};

export default ProjectDetailGuard;
