import { createStore, combineReducers } from 'redux';

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
		case 'LISTA_COMENZAR_CORRECT':
			tempState.posts = action.payload.posts;
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
let store = createStore(root);

console.log(store.getState());

export default store;
