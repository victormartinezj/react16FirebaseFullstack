import React, { useEffect, useState } from 'react';
import { db } from './firebase';

const Lista = (props) => {
	const [agregar, setAgregar] = useState(false);
	const [ultimo, setUltimo] = useState(null);
	const [total, setTotal] = useState(false);

	useEffect(() => {
		db.collection('posts')
			.where('categorias', 'array-contains-any', ['angular', 'react', 'vue'])
			.orderBy('creacion', 'desc')
			.limit(2)
			.get()
			.then((querySnapshot) => {
				let final = querySnapshot.docs[querySnapshot.docs.length - 1];
				setUltimo(final);
				querySnapshot.forEach((doc) => {
					console.log(doc.data());
				});
			})
			.catch((e) => {
				console.log(e);
			});
		// db.collection('posts')
		// 	.doc('miId')
		// 	.get()
		// 	.then((doc) => {
		// 		if (doc.exists) {
		// 			console.log(doc.data());
		// 		}
		// 	})
		// 	.catch((e) => {
		// 		console.log(e);
		// 	});
		// db.collection('posts')
		// 	.get()
		// 	.then((querySnapshot) => {
		// 		querySnapshot.forEach((doc) => {
		// 			console.log(doc.data());
		// 		});
		// 	})
		// 	.catch((e) => {
		// 		console.log(e);
		// 	});
	}, []);

	useEffect(() => {
		if (agregar) {
			db.collection('posts')
				.where('categorias', 'array-contains-any', ['angular', 'react', 'vue'])
				.orderBy('creacion', 'desc')
				.startAfter(ultimo)
				.limit(2)
				.get()
				.then((querySnapshot) => {
					setAgregar(false);
					let final = querySnapshot.docs[querySnapshot.docs.length - 1];
					// console.log(final);
					if (final === undefined) {
						setTotal(true);
					}

					setUltimo(final);
					querySnapshot.forEach((doc) => {
						console.log(doc.data());
					});
				})
				.catch((e) => {
					setAgregar(false);
					console.log(e);
				});
		}
	}, [agregar]);

	return (
		<div>
			Lista:
			<br />
			{total ? (
				<button disabled>Agregar</button>
			) : (
				<button
					onClick={() => {
						setAgregar(true);
					}}
				>
					Agregar
				</button>
			)}
		</div>
	);
};
export default Lista;
