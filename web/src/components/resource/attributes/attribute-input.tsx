import { NumberInput, TextInput } from '@mantine/core';

type AttributeInputProps = {
	label: string;
	type: string;
	onChange: (value: string) => void;
};

const AttributeInput = ({ label, type, onChange }: AttributeInputProps) => {
	if (type === 'Text') {
		return <TextInput onChange={event => onChange(event.currentTarget.value)} label={label} />;
	}

	if (type === 'Int') {
		return <NumberInput onChange={value => onChange(value.toString())} label={label} />;
	}

	return (
		<div>
			<input type="text" />
		</div>
	);
};

export default AttributeInput;
