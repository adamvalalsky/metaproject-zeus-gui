import { useParams } from 'react-router';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';

import { useAcceptInvitationMutation } from '@/modules/project/api/accept-invitation';
import Loading from '@/components/global/loading';

const ProjectInvitation = () => {
	const { token } = useParams();
	const navigate = useNavigate();

	const { mutate, isPending } = useAcceptInvitationMutation();

	useEffect(() => {
		if (!token || isNaN(+token)) {
			return;
		}

		mutate(+token, {
			onSuccess: () => {
				navigate('/project');
			},
			onError: () => {
				notifications.show({
					color: 'red',
					message: 'Failed to accept invitation'
				});
				navigate('/project');
			}
		});
	}, []);

	if (!token) {
		return <Navigate to="/project" />;
	}

	if (isPending) {
		return <Loading text="Accepting invitation..." />;
	}

	return <Loading />;
};

export default ProjectInvitation;
