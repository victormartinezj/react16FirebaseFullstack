import { db } from '../firebase';

export const ACTION_CATEGORIAS_CARGA = async (dispatch, getState) => {
	try {
		const documents = await db.collection('categorias').get();
		let tempArray = [];
		documents.forEach((doc) => {
			tempArray = tempArray.concat([doc.id]);
			// tempArray.push(doc.id);
		});
		dispatch({ type: 'ESTABLECER_CATEGORIAS', payload: tempArray });
		// .then((documents) => {
		//     setCategorias((values) => [...values, ...tempArray]);
		// })
		// .catch((e) => {
		//     console.log(e);
		// });
	} catch (error) {
		console.log(error);
	}
};

export const ACTION_LISTA_INICIAR = async (dispatch, getState) => {
	try {
		let querySnapshot;
		let categoriasActivas = getState()
			.categorias.lista.filter((cat) => {
				return cat.activa;
			})
			.map((cat) => cat.nombre);
		if (categoriasActivas.length !== 0) {
			querySnapshot = await db
				.collection('posts')
				.where('categorias', 'array-contains-any', [...categoriasActivas])
				.orderBy('creacion', 'desc')
				.limit(2)
				.get();
		} else {
			querySnapshot = await db
				.collection('posts')
				.orderBy('creacion', 'desc')
				.limit(2)
				.get();
		}
		let final = querySnapshot.docs[querySnapshot.docs.length - 1];
		let tempArray = [];
		querySnapshot.forEach((doc) => {
			tempArray = tempArray.concat([{ id: doc.id, titulo: doc.data().titulo }]);
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
};

export const ACTION_LISTA_MAS_POSTS = async (dispatch, getState) => {
	console.log(getState());
	const { lista } = getState();
	dispatch({ type: 'LISTA_CARGANDO_MAS' });

	try {
		let querySnapshot;
		let categoriasActivas = getState()
			.categorias.lista.filter((cat) => {
				return cat.activa;
			})
			.map((cat) => cat.nombre);
		if (categoriasActivas.length !== 0) {
			querySnapshot = await db
				.collection('posts')
				.where('categorias', 'array-contains-any', [...categoriasActivas])
				.orderBy('creacion', 'desc')
				.startAfter(lista.ultimo)
				.limit(2)
				.get();
		} else {
			querySnapshot = await db
				.collection('posts')
				.orderBy('creacion', 'desc')
				.startAfter(lista.ultimo)
				.limit(2)
				.get();
		}
		// const querySnapshot = await db
		// .collection('posts')
		// .where('categorias', 'array-contains-any', ['angular', 'react', 'vue'])
		// .orderBy('creacion', 'desc')
		// .startAfter(lista.ultimo)
		// .limit(2)
		// .get();
		// setAgregar(false);
		let final = querySnapshot.docs[querySnapshot.docs.length - 1];
		// console.log(final);
		if (final === undefined) {
			// setTotal(true);
			dispatch({ type: 'LISTA_SON_TODOS' });
		}

		let tempArray = [];
		querySnapshot.forEach((doc) => {
			tempArray = tempArray.concat([{ id: doc.id, titulo: doc.data().titulo }]);
			console.log(doc.data());
		});
		// setUltimo(final);
		// setArrayPosts((posts) => [...posts, ...tempArray]);
		dispatch({
			type: 'LISTA_AGREGAR_MAS',
			payload: { ultimo: final, posts: tempArray },
		});
	} catch (error) {
		console.log(error);
		// setAgregar(false);
		// dispatch
	}
};
