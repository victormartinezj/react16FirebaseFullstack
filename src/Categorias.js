import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ACTION_CREAR_NUEVA_CATEGORIA } from './state/actions';

const Categorias = ({ crearNuevaCategoria }) => {
	const [texto, setTexto] = useState('');

	return (
		<div>
			Agregar nueva categoría:
			<input
				type="text"
				value={texto}
				onChange={(e) => {
					setTexto(e.target.value);
				}}
			/>
			<button
				type="button"
				onClick={() => {
					crearNuevaCategoria(texto);
				}}
			>
				Enviar
			</button>
		</div>
	);
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		crearNuevaCategoria: (texto) => {
			dispatch(ACTION_CREAR_NUEVA_CATEGORIA(texto));
		},
	};
};

export default connect(null, mapDispatchToProps)(Categorias);
