import { Group, rem } from '@mantine/core';
import { useState } from 'react';
import {
	IconCloud,
	IconComponents,
	IconCpu,
	IconDatabase,
	IconDevices2,
	IconLicense,
	IconServer
} from '@tabler/icons-react';

import { useResourceTypesQuery } from '@/modules/allocation/queries';
import Loading from '@/components/global/loading';
import ErrorAlert from '@/components/global/error-alert';
import SelectCard from '@/components/global/select-card';

// TODO will be type in the future
const getResourceTypeIcon = (name: string) => {
	const style = { width: rem(64), height: rem(64) };

	if (name === 'Cloud') {
		return <IconCloud style={style} />;
	}

	if (name === 'Server') {
		return <IconServer style={style} />;
	}

	if (name === 'Software licence') {
		return <IconLicense style={style} />;
	}

	if (name === 'Storage') {
		return <IconDatabase style={style} />;
	}

	if (name === 'Cluster partition') {
		return <IconComponents style={style} />;
	}

	if (name === 'Cluster') {
		return <IconCpu style={style} />;
	}

	if (name === 'Compute node') {
		return <IconDevices2 style={style} />;
	}
};

type ResourceTypeStepProps = {
	setComplete: () => void;
};

const ResourceTypeStep = ({ setComplete }: ResourceTypeStepProps) => {
	const [selected, setSelected] = useState<number | null>(null);
	const { data, isError, isPending } = useResourceTypesQuery();

	if (isPending) {
		return <Loading />;
	}

	if (isError) {
		return <ErrorAlert />;
	}

	const onClick = (id: number) => {
		setSelected(id);
		setComplete();
	};

	return (
		<Group justify="center">
			{data.map(resourceType => (
				<SelectCard
					key={resourceType.id}
					selected={selected === resourceType.id}
					onClick={() => onClick(resourceType.id)}
					size={200}
					icon={getResourceTypeIcon(resourceType.name)}
					label={resourceType.name}
					description={resourceType.description}
				/>
			))}
		</Group>
	);
};

export default ResourceTypeStep;
