import { db, auth, fs } from '../firebase';
import slugify from 'react-slugify';

export const ACTION_ADMIN = (usuario) => (dispatch, getState) => {
	try {
		auth.currentUser
			.getIdTokenResult()
			.then((idTokenResult) => {
				console.log(idTokenResult);
				if (idTokenResult.claims.admin) {
					dispatch({ type: 'ESTABLECER_ADMIN' });
				}
			})
			.catch((e) => {
				console.log(e);
			});
	} catch (error) {
		console.log(error);
	} finally {
		dispatch({ type: 'ESTABLECER_USUARIO', payload: usuario });
	}
};

export const ACTION_AGREGAR_COMENTARIO = ({
	slug,
	autor,
	autorId,
	comentario,
}) => (dispatch, getState) => {
	try {
		dispatch({ type: 'ENVIO_COMENTARIO_ACTIVO' });
		db.collection('completos')
			.doc(slug)
			.collection('comentarios')
			.add({
				autor: autor,
				autorId: autorId,
				comentario: comentario,
				fecha: fs.Timestamp.now(),
			})
			.then(() => {
				console.log('El comentario se agregó correctamente');
				dispatch({ type: 'ENVIO_COMENTARIO_EXITO' });
			})
			.catch((e) => {
				console.log(e);
				dispatch({ type: 'ENVIO_COMENTARIO_ERROR' });
			});
	} catch (error) {
		console.log(error);
		dispatch({ type: 'ENVIO_COMENTARIO_ERROR' });
	}
};

export const ACTION_CARGAR_COMENTARIOS = (slug) => (dispatch, getState) => {
	try {
		dispatch({ type: 'CARGA_INICIAL_COMENTARIOS' });
		db.collection('completos')
			.doc(slug)
			.collection('comentarios')
			.orderBy('fecha')
			.get()
			.then((querySnapshot) => {
				let tempArray = [];
				querySnapshot.forEach((doc) => {
					let tempData = doc.data();
					tempData.fecha = new Date(doc.data().fecha.toDate()).toLocaleString(
						'es-MX'
					);
					tempArray = tempArray.concat([{ id: doc.id, data: tempData }]);
					console.log(doc.id);
					console.log(doc.data());
				});
				dispatch({ type: 'CARGA_CORRECTA_COMENTARIOS', payload: tempArray });
			})
			.catch((e) => {
				console.log(e);
				dispatch({ type: 'ERROR_CARGA_COMENTARIOS' });
			});
	} catch (error) {
		dispatch({ type: 'ERROR_CARGA_COMENTARIOS' });
		console.log(error);
	}
};

export const ACTION_CREAR_NUEVA_CATEGORIA = (texto) => (dispatch, getState) => {
	try {
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
							dispatch({ type: 'AGREGAR_NUEVA_CATEGORIA', payload: texto });
						})
						.catch((e) => {
							console.log(e);
						});
				}
			})
			.catch((e) => {
				console.log(e);
			});
	} catch (error) {
		console.log(error);
	}
};

export const ACTION_CREAR_NUEVO_POST = (values) => (dispatch, getState) => {
	try {
		dispatch({ type: 'ENVIO_PUBLICACION_ACTIVO' });
		const miBatch = db.batch();
		const miSlug = slugify(values.slug);
		const fechaCreacion = fs.Timestamp.now();

		const slugs = db.collection('slugs').doc(miSlug);
		miBatch.set(slugs, { activo: true });
		const posts = db.collection('posts').doc(miSlug);
		miBatch.set(posts, {
			titulo: values.titulo,
			resumen: values.resumen,
			categorias: values.categorias,
			creacion: fechaCreacion,
			autor: values.usuario,
		});
		const completos = db.collection('completos').doc(miSlug);
		miBatch.set(completos, {
			titulo: values.titulo,
			cuerpo: values.cuerpo,
			categorias: values.categorias,
			creacion: fechaCreacion,
			autor: values.usuario,
		});

		miBatch
			.commit()
			.then(() => {
				dispatch({ type: 'ENVIO_PUBLICACION_EXITO' });
				console.log('El batch fue correcto');
			})
			.catch((e) => {
				dispatch({ type: 'ENVIO_PUBLICACION_ERROR' });
				console.log(e);
			});
	} catch (error) {
		dispatch({ type: 'ENVIO_PUBLICACION_ERROR' });
		console.log(error);
	}
};

export const ACTION_LOGIN_USUARIO = ({ correo, password }) => (
	dispatch,
	getState
) => {
	auth
		.signInWithEmailAndPassword(correo, password)
		.then((datos) => {
			console.log('login exitoso');
			console.log(datos);
		})
		.catch((e) => {
			console.log(e);
		});
};
export const ACTION_CREAR_USUARIO = ({ correo, password, nombre }) => (
	dispatch,
	getState
) => {
	auth
		.createUserWithEmailAndPassword(correo, password)
		.then((datos) => {
			console.log('registro exitoso');
			console.log(datos);
			if (datos.user) {
				datos.user
					.updateProfile({ displayName: nombre })
					.then(() => {
						console.log('Perfil actualizado');
					})
					.catch((e) => {
						console.log(e);
						console.log('Perfil sin actualizar');
					});
			}
		})
		.catch((e) => {
			console.log(e);
		});
};

export const ACTION_CARGAR_POST = (slug) => async (dispatch, getState) => {
	try {
		console.log(slug);
		const doc = await db.collection('completos').doc(slug).get();
		console.log(doc.id);
		console.log(doc.data());
		if (doc.exists) {
			dispatch({
				type: 'ESTABLECER_POST',
				payload: { data: doc.data(), slug: doc.id },
			});
		} else {
			dispatch({ type: 'ERROR_AL_CARGAR_EL_POST' });
		}
	} catch (error) {
		dispatch({ type: 'ERROR_AL_CARGAR_EL_POST' });
		console.log(error);
	}
};
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
