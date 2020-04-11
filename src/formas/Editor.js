import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

var toolbarOptions = [
	['bold', 'italic', 'underline', 'strike'], // toggled buttons
	['blockquote', 'code-block'],

	[{ header: 1 }, { header: 2 }], // custom button values
	[{ list: 'ordered' }, { list: 'bullet' }],
	[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
	[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
	[{ direction: 'rtl' }], // text direction

	[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
	[{ header: [1, 2, 3, 4, 5, 6, false] }],

	[{ color: [] }, { background: [] }], // dropdown with defaults from theme
	[{ font: [] }],
	[{ align: [] }],
	['image', 'video', 'link'],

	['clean'], // remove formatting button
];

let format = [
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

const miModulo = {
	toolbar: {
		container: toolbarOptions,
		//   handlers: {
		//     image: () => {
		//       var rango = this.quill.getSelection();
		//       console.log(rango);

		//       var datos = prompt("Ingresa la URL");
		//       console.log(datos);
		//       if (datos) {
		//         this.quill.insertEmbed(rango.index, "image", datos);
		//       }
		//     }
		//   }
	},
};
const Editor = (props) => {
	const { setValue } = props;
	const { quill, quillRef } = useQuill({ modules: miModulo, formats: format });
	console.log(quill);
	console.log(quillRef);

	let handlerImage = () => {
		var rango = quill.getSelection();
		console.log(rango);

		var datos = prompt('Ingresa la URL');
		console.log(datos);
		if (datos) {
			quill.insertEmbed(rango.index, 'image', datos);
		}
	};
	useEffect(() => {
		if (quill) {
			quill.getModule('toolbar').addHandler('image', handlerImage);
			quill.on('text-change', (delta, oldDelta, source) => {
				setValue('cuerpo', quill.root.innerHTML);
				console.log(quill.root.innerHTML);
			});
		}
		return () => {
			if (quill) {
				quill.off('text-change', () => {
					console.log('Se limpia');
				});
			}
		};
	}, [quill]);

	return (
		<div>
			<div ref={quillRef} />
		</div>
	);
};
export default Editor;
