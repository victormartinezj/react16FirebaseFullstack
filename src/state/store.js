import { createStore, combineReducers } from 'redux';

const reducerLista = (state = { posts: [] }, action) => {
	return state;
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
