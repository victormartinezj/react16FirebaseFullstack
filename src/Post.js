import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { ACTION_CARGAR_POST } from './state/actions';

const Post = ({ post, solicitarPost }) => {
	console.log(useParams());
	const { slug } = useParams();
	useEffect(() => {
		solicitarPost(slug);
	}, []);

	return <div>Post</div>;
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
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
