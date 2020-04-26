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

function App() {
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
					<Redirect to="/" />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
