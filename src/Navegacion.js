import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from './firebase';

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
			{usuario ? (
				<li>
					<button
						onClick={() => {
							auth.signOut().catch((e) => {
								console.log(e);
							});
						}}
					>
						Logout
					</button>
				</li>
			) : null}
		</ul>
	</div>
);
export default Navegacion;
