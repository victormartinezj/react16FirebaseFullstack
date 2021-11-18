import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from './firebase';
import { Navbar, Nav, Button } from 'react-bootstrap';

const Navegacion = ({ usuario, admin }) => (
	<div>
		<Navbar bg="primary" variant="dark">
			<Navbar.Brand as={Link} to="/">
				Navbar
			</Navbar.Brand>
			<Nav className="ml-auto">
				<Nav.Link as={Link} to="/">
					Home
				</Nav.Link>

				{usuario ? (
					<>
						{admin && (
							<Nav.Link as={Link} to="/publicacion">
								Publicacion
							</Nav.Link>
						)}
						<Nav.Link
							as={Button}
							onClick={() => {
								auth.signOut().catch((e) => {
									console.log(e);
								});
							}}
						>
							Logout
						</Nav.Link>
					</>
				) : (
					<>
						<Nav.Link as={Link} to="/signup">
							SignUp
						</Nav.Link>
						<Nav.Link as={Link} to="/login">
							LogIn
						</Nav.Link>
					</>
				)}
			</Nav>
		</Navbar>
	</div>
);
export default Navegacion;
