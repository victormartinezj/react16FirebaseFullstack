import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducerUsuario = (state = { usuario: null }, action) => {
	let tempState = { ...state };
	switch (action.type) {
		case 'ESTABLECER_USUARIO':
			tempState.usuario = action.payload;
			return tempState;

		default:
			return state;
	}
};

const reducerCategorias = (state = { servidor: [], lista: [] }, action) => {
	let tempState = { ...state };
	switch (action.type) {
		case 'ESTABLECER_CATEGORIAS':
			tempState = {
				servidor: action.payload,
				lista: action.payload.map((cat) => {
					return { nombre: cat, activa: false };
				}),
			};
			return tempState;
		case 'ACTIVAR_CATEGORIA':
			tempState = {
				...tempState,
				lista: state.lista.map((cat) => {
					if (cat.nombre === action.payload) {
						return { ...cat, activa: true };
					} else {
						return cat;
					}
				}),
			};
			return tempState;
		case 'DESACTIVAR_CATEGORIA':
			tempState = {
				...tempState,
				lista: state.lista.map((cat) => {
					if (cat.nombre === action.payload) {
						return { ...cat, activa: false };
					} else {
						return cat;
					}
				}),
			};
			return tempState;

		default:
			return state;
	}
};

const reducerLista = (
	state = {
		posts: [],
		ultimo: null,
		cargando: false,
		total: false,
		comenzar: true,
	},
	action
) => {
	let tempState = { ...state };
	switch (action.type) {
		case 'LISTA_COMENZAR_CORRECTO':
			tempState.posts = action.payload.posts;
			tempState.ultimo = action.payload.ultimo;
			tempState.comenzar = false;
			return tempState;
		case 'LISTA_SON_TODOS':
			tempState.total = true;
			return tempState;
		case 'ACTIVAR_CATEGORIA':
		case 'DESACTIVAR_CATEGORIA':
			tempState = {
				posts: [],
				ultimo: null,
				cargando: false,
				total: false,
				comenzar: true,
			};
			// tempState.total = false;
			return tempState;
		case 'LISTA_AGREGAR_MAS':
			tempState.posts = [...state.posts, ...action.payload.posts];
			tempState.ultimo = action.payload.ultimo;
			tempState.cargando = false;
			return tempState;
		case 'LISTA_CARGANDO_MAS':
			tempState.cargando = true;
			return tempState;

		default:
			return state;
	}
};

const reducerPost = (
	state = { cargando: true, post: {}, error: false },
	action
) => {
	let tempState = state;
	switch (action.type) {
		case 'ESTABLECER_POST':
			tempState = { ...tempState, cargando: false, post: action.payload };
			return tempState;
		case 'ERROR_AL_CARGAR_EL_POST':
			tempState = { ...tempState, cargando: false, error: true };
			return tempState;
		case 'LIMPIAR_POST':
			tempState = { cargando: true, post: {}, error: false };
			return tempState;

		default:
			return state;
	}
};

const root = combineReducers({
	lista: reducerLista,
	post: reducerPost,
	categorias: reducerCategorias,
	usuario: reducerUsuario,
});
let store = createStore(root, applyMiddleware(thunk));

console.log(store.getState());

export default store;
