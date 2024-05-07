import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, ThemeIcon, Title } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import { AuthContext } from '../../modules/auth/context.tsx';
import MuniIcon from '../../components/global/icons/muni-icon';

const Index: React.FC = () => {
	const { signInRedirect, isAuthenticated } = useContext(AuthContext);
	const { t } = useTranslation();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated()) {
			navigate('/project', { replace: true });
		}
	}, []);

	// TODO just temporary real OIDC will be implemented by callbacks
	const signIn = () => {
		signInRedirect();
		navigate('/project', { replace: true });
	};

	return (
		<>
			<Flex mt={200} direction="column" align="center">
				<ThemeIcon color="grape" radius="lg" size="lg">
					<IconLock />
				</ThemeIcon>
				<Title order={2}>{t('routes.index.title')}</Title>
				<Box>
					<Button variant="outline" mt={20} w={300} leftSection={<MuniIcon size={20} />} onClick={signIn}>
						{t('routes.index.buttons.MUNI')}
					</Button>
				</Box>
			</Flex>
		</>
	);
};

export default Index;
