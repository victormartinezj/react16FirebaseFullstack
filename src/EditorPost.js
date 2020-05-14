import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.bubble.css';

let formats = [
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'code-block',
	'header',
	'list',
	'script',
	'indent',
	'direction',
	'size',
	'color',
	'font',
	'align',
	'image',
	'video',
	'link',
];

const EditorPost = ({ data }) => {
	const { quill, quillRef } = useQuill({
		theme: 'bubble',
		formats,
		readOnly: true,
	});

	useEffect(() => {
		if (quill) {
			const info = JSON.parse(data).ops;
			quill.setContents(info);
		}
	}, [quill]);
	return (
		<div>
			<div ref={quillRef} />
		</div>
	);
};
export default EditorPost;
