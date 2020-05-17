import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { storage } from '../firebase';

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
	'background',
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

	let insertToEditor = (datos) => {
		var rango = quill.getSelection();
		quill.insertEmbed(rango.index, 'image', datos);
	};

	const saveToServer = (file) => {
		storage
			.ref()
			.child(`blog/${Date.now()}${file.name}`)
			.put(file)
			.then((snapshot) => {
				snapshot.ref
					.getDownloadURL()
					.then((url) => {
						insertToEditor(url);
					})
					.catch((e) => {
						console.log(e);
					});
			})
			.catch((e) => {
				console.log(e);
			});
	};

	let handlerImage = () => {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();

		input.onchange = () => {
			const file = input.files[0];
			saveToServer(file);
		};
	};

	useEffect(() => {
		if (quill) {
			quill.getModule('toolbar').addHandler('image', handlerImage);
			quill.on('text-change', (delta, oldDelta, source) => {
				setValue('cuerpo', JSON.stringify(quill.getContents()));
				// console.log(quill.root.innerHTML);
				// console.log(JSON.stringify(quill.root.innerHTML));
				// console.log(JSON.stringify(quill.getContents()));
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
