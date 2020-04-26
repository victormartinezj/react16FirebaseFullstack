import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { connect } from 'react-redux';

const Lista = (props) => {
	const [agregar, setAgregar] = useState(false);
	const [ultimo, setUltimo] = useState(null);
	const [total, setTotal] = useState(false);
	const [arrayPosts, setArrayPosts] = useState([]);
	const [eliminar, setEliminar] = useState({ value: false, id: '' });

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
					setArrayPosts((posts) => [
						...posts,
						{ id: doc.id, titulo: doc.data().titulo },
					]);
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
						setArrayPosts((posts) => [
							...posts,
							{ id: doc.id, titulo: doc.data().titulo },
						]);
						console.log(doc.data());
					});
				})
				.catch((e) => {
					setAgregar(false);
					console.log(e);
				});
		}
	}, [agregar]);

	useEffect(() => {
		if (eliminar.value) {
			db.collection('posts')
				.doc(eliminar.id)
				.delete()
				.then(() => {
					console.log('eliminación correcta');
					setEliminar({ value: false, id: '' });
				})
				.catch((e) => {
					setEliminar({ value: false, id: '' });
					console.log(e);
				});
		}
	}, [eliminar]);

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
			{arrayPosts.map(({ id, titulo }) => (
				<div key={id}>
					{`${id} | ${titulo}`}
					<button
						onClick={() => {
							setEliminar({ value: true, id: id });
						}}
					>
						eliminar
					</button>
				</div>
			))}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		todoElState: state,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		unDispatch: () => {
			dispatch({ type: 'PRUEBA' });
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Lista);
