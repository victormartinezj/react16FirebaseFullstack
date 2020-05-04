import React from 'react';
import { Link } from 'react-router-dom';

const Navegacion = ({ usuario }) => (
	<div>
		<ul>
			<li>
				<Link to="/">home</Link>
			</li>
			<li>
				<Link to="/signup">signup</Link>
			</li>
			<li>
				<Link to="/login">login</Link>
			</li>
			<li>
				<Link to="/publicacion">publicacion</Link>
			</li>
			{usuario ? <li>Logout</li> : null}
		</ul>
	</div>
);
export default Navegacion;
