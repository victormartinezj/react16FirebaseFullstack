import React from 'react';
import { connect } from 'react-redux';
import { ACTION_CARGAR_COMENTARIOS } from './state/actions';

const Comentarios = ({ slug, cargarComentarios, informacion }) => (
	<div>
		Comentarios
		{informacion.visible ? (
			<div> Comentarios</div>
		) : (
			<button
				onClick={() => {
					cargarComentarios(slug);
				}}
			>
				Cargar comentarios
			</button>
		)}
	</div>
);

const mapStateToProps = (state, ownProps) => {
	return {
		informacion: state.comentarios,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		cargarComentarios: (slug) => {
			dispatch(ACTION_CARGAR_COMENTARIOS(slug));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Comentarios);
