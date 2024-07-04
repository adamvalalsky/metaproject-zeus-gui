import { Link, RichTextEditor, type RichTextEditorProps } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { useFormContext } from 'react-hook-form';
import { InputWrapper, TextInput } from '@mantine/core';

import classes from './text-editor.module.css';

type TextEditorProps = Omit<RichTextEditorProps, 'editor' | 'children'> & {
	inputHtmlName: string;
	inputClearTextName?: string;
	label: string;
};

const TextEditor = ({ inputHtmlName, inputClearTextName, label, ...inputProps }: TextEditorProps) => {
	const form = useFormContext();

	const editor = useEditor({
		extensions: [StarterKit, Underline, Link],
		content: form?.getValues(inputHtmlName),
		onUpdate: ({ editor }) => {
			form.setValue(inputHtmlName, editor.getHTML());
			form.setValue(inputClearTextName, editor.getText());
		}
	});

	return (
		<InputWrapper
			label={label}
			withAsterisk
			error={form.formState.errors[inputHtmlName]?.message}
			{...form.register(inputHtmlName)}
		>
			{inputClearTextName && <TextInput display="none" {...form.register(inputClearTextName)} />}
			<RichTextEditor {...inputProps} editor={editor}>
				<RichTextEditor.Toolbar sticky stickyOffset={60}>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Bold />
						<RichTextEditor.Italic />
						<RichTextEditor.Underline />
						<RichTextEditor.Strikethrough />
						<RichTextEditor.ClearFormatting />
						<RichTextEditor.Code />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.H2 />
						<RichTextEditor.H3 />
						<RichTextEditor.H4 />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Blockquote />
						<RichTextEditor.BulletList />
						<RichTextEditor.OrderedList />
						<RichTextEditor.Subscript />
						<RichTextEditor.Superscript />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Link />
						<RichTextEditor.Unlink />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.AlignLeft />
						<RichTextEditor.AlignCenter />
						<RichTextEditor.AlignJustify />
						<RichTextEditor.AlignRight />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Undo />
						<RichTextEditor.Redo />
					</RichTextEditor.ControlsGroup>
				</RichTextEditor.Toolbar>

				<RichTextEditor.Content className={classes.content} />
			</RichTextEditor>
		</InputWrapper>
	);
};
export default TextEditor;
