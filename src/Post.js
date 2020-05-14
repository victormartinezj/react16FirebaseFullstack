import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { ACTION_CARGAR_POST, ACTION_CARGAR_COMENTARIOS } from './state/actions';
import EditorPost from './EditorPost';
import Comentarios from './Comentarios';

const Post = ({ post, solicitarPost, limpiarPost, cargarComentarios }) => {
	console.log(useParams());
	const { slug } = useParams();
	useEffect(() => {
		solicitarPost(slug);
		return limpiarPost();
	}, []);

	return (
		<div>
			Post
			{post.cargando ? (
				<p>Cargando post..</p>
			) : (
				<div>
					{post.error ? (
						<p>Error al cargar el post</p>
					) : (
						<div>
							<div>{post.post.data.titulo}</div>
							<EditorPost data={post.post.data.cuerpo} />
							<Comentarios slug={slug} />
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
