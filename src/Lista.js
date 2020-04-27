import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { connect } from 'react-redux';

const Lista = ({ stateLista, comenzar }) => {
	// const [agregar, setAgregar] = useState(false);
	// const [ultimo, setUltimo] = useState(null);
	// const [total, setTotal] = useState(false);
	// const [arrayPosts, setArrayPosts] = useState([]);
	useEffect(() => {
		comenzar();
	}, []);

	// useEffect(() => {
	// async function cargaInicial() {
	// 	try {
	// 		const querySnapshot = await db
	// 			.collection('posts')
	// 			.where('categorias', 'array-contains-any', [
	// 				'angular',
	// 				'react',
	// 				'vue',
	// 			])
	// 			.orderBy('creacion', 'desc')
	// 			.limit(2)
	// 			.get();
	// 		let final = querySnapshot.docs[querySnapshot.docs.length - 1];
	// 		setUltimo(final);
	// 		let tempArray = [];
	// 		querySnapshot.forEach((doc) => {
	// 			tempArray = tempArray.concat([
	// 				{ id: doc.id, titulo: doc.data().titulo },
	// 			]);
	// 			console.log(doc.data());
	// 		});
	// 		setArrayPosts((posts) => [...posts, ...tempArray]);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }
	// 	cargaInicial();
	// }, []);

	// useEffect(() => {
	// 	if (agregar) {
	// 		async function cargaNueva() {
	// 			try {
	// 				const querySnapshot = await db
	// 					.collection('posts')
	// 					.where('categorias', 'array-contains-any', [
	// 						'angular',
	// 						'react',
	// 						'vue',
	// 					])
	// 					.orderBy('creacion', 'desc')
	// 					.startAfter(ultimo)
	// 					.limit(2)
	// 					.get();
	// 				setAgregar(false);
	// 				let final = querySnapshot.docs[querySnapshot.docs.length - 1];
	// 				// console.log(final);
	// 				if (final === undefined) {
	// 					setTotal(true);
	// 				}

	// 				setUltimo(final);
	// 				let tempArray = [];
	// 				querySnapshot.forEach((doc) => {
	// 					tempArray = tempArray.concat([
	// 						{ id: doc.id, titulo: doc.data().titulo },
	// 					]);
	// 					console.log(doc.data());
	// 				});
	// 				setArrayPosts((posts) => [...posts, ...tempArray]);
	// 			} catch (error) {
	// 				console.log(error);
	// 				setAgregar(false);
	// 			}
	// 		}
	// 		cargaNueva();
	// 	}
	// }, [agregar]);

	return (
		<div>
			{stateLista.comenzar ? (
				<p>Cargando...</p>
			) : (
				<div>
					Lista:
					{/* <br />
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
					)} */}
					{stateLista.posts.map(({ id, titulo }) => (
						<div key={id}>{`${id} | ${titulo}`}</div>
					))}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		stateLista: state.lista,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		comenzar: () => {
			// dispatch({ type: 'PRUEBA' });
			dispatch(async () => {
				try {
					const querySnapshot = await db
						.collection('posts')
						.where('categorias', 'array-contains-any', [
							'angular',
							'react',
							'vue',
						])
						.orderBy('creacion', 'desc')
						.limit(2)
						.get();
					let final = querySnapshot.docs[querySnapshot.docs.length - 1];
					let tempArray = [];
					querySnapshot.forEach((doc) => {
						tempArray = tempArray.concat([
							{ id: doc.id, titulo: doc.data().titulo },
						]);
						console.log(doc.data());
					});
					// setUltimo(final);
					// setArrayPosts((posts) => [...posts, ...tempArray]);
					dispatch({
						type: 'LISTA_COMENZAR_CORRECTO',
						payload: { ultimo: final, posts: tempArray },
					});
				} catch (error) {
					console.log(error);
					// dispatch
				}
			});
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Lista);
