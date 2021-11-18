import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import { ACTION_CATEGORIAS_CARGA, ACTION_ADMIN } from './state/actions';
import Post from './Post';
import Navegacion from './Navegacion';
import { auth } from './firebase';

function App({
	cargarCategorias,
	cargarUsuario,
	usuario,
	limpiarUsuario,
	admin,
}) {
	useEffect(() => {
		cargarCategorias();
	}, []);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				console.log(user);
				cargarUsuario(user);
			} else {
				limpiarUsuario();
			}
		});
		return () => unsubscribe();
	}, []);
	return (
		<div>
			<Router>
				<Navegacion usuario={usuario} admin={admin} />
				{usuario ? (
					<Switch>
						<Route path="/" exact>
							<Lista />
						</Route>
						{admin && (
							<Route path="/publicacion">
								<FormaPublicacion />
							</Route>
						)}
						<Route path="/post/:slug">
							<Post />
						</Route>
						<Redirect to="/" />
					</Switch>
				) : (
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

						<Route path="/post/:slug">
							<Post />
						</Route>
						<Redirect to="/" />
					</Switch>
				)}
			</Router>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		usuario: state.usuario.usuario,
		admin: state.usuario.admin,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		cargarCategorias: () => {
			dispatch(ACTION_CATEGORIAS_CARGA);
		},
		cargarUsuario: (usuario) => {
			dispatch(ACTION_ADMIN(usuario));
		},
		limpiarUsuario: () => {
			dispatch({ type: 'LIMPIAR_USUARIO' });
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
