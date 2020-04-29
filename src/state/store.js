import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducerCategorias = (state = { servidor: [], lista: [] }, action) => {
	let tempState = { ...state };
	switch (action.type) {
		case 'ESTABLECER_CATEGORIAS':
			tempState = { servidor: action.payload, lista: action.payload };
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

const reducerPost = (state = { id: null }, action) => {
	return state;
};

const root = combineReducers({
	lista: reducerLista,
	post: reducerPost,
	categorias: reducerCategorias,
});
let store = createStore(root, applyMiddleware(thunk));

console.log(store.getState());

export default store;
