import React, { useState, useEffect } from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom';
import FormaRegistro from './formas/FormaRegistro';
import FormaLogIn from './formas/FormaLogIn';
import Lista from './Lista';
import FormaPublicacion from './formas/FormaPublicacion';
import { connect } from 'react-redux';
import { ACTION_CATEGORIAS_CARGA } from './state/actions';
import Post from './Post';

function App({ cargarCategorias }) {
	useEffect(() => {
		cargarCategorias();
	}, []);
	return (
		<div>
			<Router>
				<Switch>
					<Route path="/" exact>
						<Lista />
					</Route>
					<Route path="/signup">
						<FormaRegistro />
					</Route>
					<Route path="/login">
						<FormaLogIn />
					</Route>
					<Route path="/publicacion">
						<FormaPublicacion />
					</Route>
					<Route path="/post/:slug">
						<Post />
					</Route>
					<Redirect to="/" />
				</Switch>
			</Router>
		</div>
	);
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		cargarCategorias: () => {
			dispatch(ACTION_CATEGORIAS_CARGA);
		},
	};
};

export default connect(null, mapDispatchToProps)(App);
