import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { ACTION_CARGAR_POST, ACTION_CARGAR_COMENTARIOS } from './state/actions';
import EditorPost from './EditorPost';
import Comentarios from './Comentarios';
import { Spinner, Jumbotron, Container, Alert } from 'react-bootstrap';

const Post = ({ post, solicitarPost, limpiarPost, cargarComentarios }) => {
	console.log(useParams());
	const { slug } = useParams();
	useEffect(() => {
		solicitarPost(slug);
		return limpiarPost();
	}, []);

	return (
		<div>
			{post.cargando ? (
				<div className="text-center mt-5">
					<Spinner animation="border" />
					<p>Cargando post..</p>
				</div>
			) : (
				<div>
					{post.error ? (
						<Alert className="mt-5" variant="danger">
							Error al cargar el post
						</Alert>
					) : (
						<div>
							<Jumbotron className="text-center">
								<h2>{post.post.data.titulo}</h2>
							</Jumbotron>
							<Container className="mb-5">
								<EditorPost data={post.post.data.cuerpo} />
								<Comentarios slug={slug} />
							</Container>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		post: state.post,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		solicitarPost: (slug) => {
			dispatch(ACTION_CARGAR_POST(slug));
		},
		limpiarPost: () => {
			dispatch({ type: 'LIMPIAR_POST' });
		},
		cargarComentarios: (slug) => {
			dispatch(ACTION_CARGAR_COMENTARIOS(slug));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
