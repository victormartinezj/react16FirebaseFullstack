import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ACTION_LISTA_INICIAR, ACTION_LISTA_MAS_POSTS } from './state/actions';
import SeleccionarCategorias from './SeleccionarCategorias';
import { Link } from 'react-router-dom';
import {
	Jumbotron,
	Container,
	ListGroup,
	Spinner,
	Button,
	Alert,
} from 'react-bootstrap';

const Lista = ({ stateLista, comenzar, mas, categorias, limpiar }) => {
	useEffect(() => {
		comenzar();
		return () => limpiar();
	}, [categorias]);

	return (
		<div>
			<Jumbotron fluid>
				<Container className="text-center">
					<h1>Blog</h1>
					<p>Sobre programación, Js, React, Angular</p>
				</Container>
			</Jumbotron>
			<Container>
				{stateLista.comenzar ? (
					<Spinner animation="border" />
				) : (
					<div>
						<SeleccionarCategorias />
						<ListGroup>
							{stateLista.posts.map(({ id, titulo }) => (
								<ListGroup.Item as={Link} to={`/post/${id}`} key={id}>
									<div key={id}>{`${id} | ${titulo}`}</div>
								</ListGroup.Item>
							))}
						</ListGroup>
						{stateLista.total ? (
							<div>
								<br />
								<Alert variant="info">Son todos los posts</Alert>
							</div>
						) : (
							<div>
								<br />
								{stateLista.cargando ? (
									<Spinner animation="border" />
								) : (
									<Button block onClick={mas}>
										Cargar más posts
									</Button>
								)}
							</div>
						)}
					</div>
				)}
			</Container>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		stateLista: state.lista,
		categorias: state.categorias.lista,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		comenzar: () => {
			// dispatch({ type: 'PRUEBA' });
			dispatch(ACTION_LISTA_INICIAR);
		},
		mas: () => {
			dispatch(ACTION_LISTA_MAS_POSTS);
		},
		limpiar: () => {
			dispatch({ type: 'LIMPIAR_LISTA_AL_DESMONTAR' });
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Lista);
