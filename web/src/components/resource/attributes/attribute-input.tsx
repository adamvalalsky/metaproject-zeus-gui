import { NumberInput, TextInput } from '@mantine/core';

type AttributeInputProps = {
	value?: string;
	label: string;
	type: string;
	onChange: (value: string) => void;
};

const AttributeInput = ({ label, type, onChange, value }: AttributeInputProps) => {
	if (type === 'Text') {
		return <TextInput value={value} onChange={event => onChange(event.currentTarget.value)} label={label} />;
	}

	if (type === 'Int') {
		return <NumberInput value={value} onChange={value => onChange(value.toString())} label={label} />;
	}

	return (
		<div>
			<input type="text" />
		</div>
	);
};

export default AttributeInput;
