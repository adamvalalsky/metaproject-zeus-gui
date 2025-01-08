import { NumberInput, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';

type AttributeInputProps = {
	value?: string;
	label: string;
	type: string;
	onChange: (value: string | undefined) => void;
};

const AttributeInput = ({ label, type, onChange, value }: AttributeInputProps) => {
	if (type === 'Text' || type === 'Float') {
		return <TextInput value={value} onChange={event => onChange(event.currentTarget.value)} label={label} />;
	}

	if (type === 'Int') {
		return <NumberInput value={value} onChange={value => onChange(value.toString())} label={label} />;
	}

	if (type === 'Yes/No' || type === 'Active/Inactive') {
		const options =
			type === 'Yes/No'
				? [
						{ value: 'true', label: 'Yes' },
						{ value: 'false', label: 'No' }
					]
				: [
						{ value: 'true', label: 'Active' },
						{ value: 'false', label: 'Inactive' }
					];
		return <Select value={value} data={options} onChange={value => onChange(value ?? undefined)} label={label} />;
	}

	return (
		<DateInput
			value={value ? new Date(value) : undefined}
			onChange={value => onChange(value?.toISOString())}
			label={label}
		/>
	);
};

export default AttributeInput;
