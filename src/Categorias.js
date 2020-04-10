import React, { useState, useEffect } from 'react';
import { db } from './firebase';

const Categorias = (props) => {
	const [texto, setTexto] = useState('');
	const [enviar, setEnviar] = useState(false);

	useEffect(() => {
		if (enviar) {
			db.collection('categorias')
				.doc(texto)
				.get()
				.then((doc) => {
					console.log(doc);

					if (doc.exists) {
						console.log('la categoría existe');
					} else {
						console.log('la categoría no existe');
						db.collection('categorias')
							.doc(texto)
							.set({ activa: true })
							.then(() => {
								console.log('la categoría se creo correctamente');
							})
							.catch((e) => {
								console.log(e);
							});
					}
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [enviar]);
	return (
		<div>
			Lista de categorias:
			<br />
			Agregar nueva categoría:
			<input
				type="text"
				value={texto}
				onChange={(e) => {
					setTexto(e.target.value);
				}}
			/>
			<button
				onClick={() => {
					setEnviar(true);
				}}
			>
				Enviar
			</button>
		</div>
	);
};
export default Categorias;
