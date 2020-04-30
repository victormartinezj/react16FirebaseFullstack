import React from 'react';
import { connect } from 'react-redux';

const SeleccionarCategorias = ({ categorias, activar, desactivar }) => (
	<div>
		Categorias seleccionadas:{' '}
		{categorias
			.filter((cat) => cat.activa)
			.map((cat) => {
				return (
					<button
						key={cat.nombre}
						onClick={() => {
							desactivar(cat.nombre);
						}}
					>
						{cat.nombre}
					</button>
				);
			})}
		Lista de categorias:{' '}
		{categorias
			.filter((cat) => !cat.activa)
			.map((cat) => {
				return (
					<button
						key={cat.nombre}
						onClick={() => {
							activar(cat.nombre);
						}}
					>
						{cat.nombre}
					</button>
				);
			})}
	</div>
);

const mapStateToProps = (state) => {
	return {
		categorias: state.categorias.lista,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		activar: (nombre) => {
			dispatch({ type: 'ACTIVAR_CATEGORIA', payload: nombre });
		},
		desactivar: (nombre) => {
			dispatch({ type: 'DESACTIVAR_CATEGORIA', payload: nombre });
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SeleccionarCategorias);
