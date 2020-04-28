import { db } from '../firebase';

export const ACTION_LISTA_INICIAR = async (dispatch, getState) => {
	try {
		const querySnapshot = await db
			.collection('posts')
			.where('categorias', 'array-contains-any', ['angular', 'react', 'vue'])
			.orderBy('creacion', 'desc')
			.limit(2)
			.get();
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
		const querySnapshot = await db
			.collection('posts')
			.where('categorias', 'array-contains-any', ['angular', 'react', 'vue'])
			.orderBy('creacion', 'desc')
			.startAfter(lista.ultimo)
			.limit(2)
			.get();
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
