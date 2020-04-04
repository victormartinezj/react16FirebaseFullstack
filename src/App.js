import React, { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase';
import Lista from './Lista';

function App() {
	const [titulo, setTitulo] = useState('');
	const [enviando, setEnviando] = useState(false);

	useEffect(() => {
		if (enviando) {
			db.collection('posts')
				.add({
					titulo,
					cuerpo: `El cuerpo es: ${titulo}`,
					categorias: ['angular', 'react'],
				})
				.then((docRef) => {
					setEnviando(false);
					console.log(`el id es: ${docRef.id}`);
				})
				.catch((e) => {
					setEnviando(false);
					console.log(`error: ${e}`);
				});
			// actualizar
			// db.collection('posts')
			// 	.doc('RGWnwhN0RlpHymP7RAXx')
			// 	.set({ cuerpo: titulo }, { merge: true })
			// 	.then(() => {
			// 		setEnviando(false);
			// 		console.log(`el id es establecido`);
			// 	})
			// 	.catch((e) => {
			// 		setEnviando(false);
			// 		console.log(`error: ${e}`);
			// 	});

			// establcer id, cambiar todos datos de un documento
			// db.collection('posts')
			// 	.doc('miId')
			// 	.set({ cuerpo: titulo })
			// 	.then(() => {
			// 		setEnviando(false);
			// 		console.log(`el id es establecido`);
			// 	})
			// 	.catch((e) => {
			// 		setEnviando(false);
			// 		console.log(`error: ${e}`);
			// 	});
			// agregar datos con id autogenerado
			// db.collection('posts')
			// 	.add({ titulo })
			// 	.then((docRef) => {
			// 		setEnviando(false);
			// 		console.log(`el id es: ${docRef.id}`);
			// 	})
			// 	.catch((e) => {
			// 		setEnviando(false);
			// 		console.log(`error: ${e}`);
			// 	});
		}
	}, [enviando]);

	return (
		<div className="App">
			App
			<br />
			<Lista />
			<input
				value={titulo}
				onChange={(e) => {
					setTitulo(e.target.value);
				}}
			/>
			{enviando ? (
				<button disabled>Enviando</button>
			) : (
				<button
					onClick={() => {
						setEnviando(true);
					}}
				>
					Enviar
				</button>
			)}
		</div>
	);
}

export default App;
