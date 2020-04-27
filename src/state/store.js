import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

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
});
let store = createStore(root, applyMiddleware(thunk));

console.log(store.getState());

export default store;
