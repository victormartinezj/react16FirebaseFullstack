import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { ACTION_CARGAR_POST } from './state/actions';
import EditorPost from './EditorPost';

const Post = ({ post, solicitarPost, limpiarPost }) => {
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
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
