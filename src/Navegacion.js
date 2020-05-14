import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from './firebase';

const Navegacion = ({ usuario }) => (
	<div>
		<ul>
			<li>
				<Link to="/">home</Link>
			</li>

			{usuario ? (
				<>
					<li>
						<Link to="/publicacion">publicacion</Link>
					</li>
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
				</>
			) : (
				<>
					<li>
						<Link to="/signup">signup</Link>
					</li>
					<li>
						<Link to="/login">login</Link>
					</li>
				</>
			)}
		</ul>
	</div>
);
export default Navegacion;
