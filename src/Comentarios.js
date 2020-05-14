import React from 'react';
import { connect } from 'react-redux';
import { ACTION_CARGAR_COMENTARIOS } from './state/actions';
import FormaComentarios from './formas/FormaComentarios';

const Comentarios = ({ slug, cargarComentarios, informacion }) => (
	<div>
		Comentarios
		{informacion.visible ? (
			<div>
				{' '}
				{informacion.cargando ? (
					<p>Cargando...</p>
				) : (
					<div>
						{informacion.error ? (
							<p>Error al cargar los comentarios</p>
						) : (
							<div>
								{informacion.comentarios.map((com) => (
									<p key={com.id}>{com.id}</p>
								))}
								<FormaComentarios slug={slug} />
							</div>
						)}
					</div>
				)}
			</div>
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
