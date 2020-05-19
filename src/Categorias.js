import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ACTION_CREAR_NUEVA_CATEGORIA } from './state/actions';
import { Form, Button } from 'react-bootstrap';

const Categorias = ({ crearNuevaCategoria }) => {
	const [texto, setTexto] = useState('');

	return (
		<Form.Group controlId="nuevaCategoria">
			<Form.Label>Agregar nueva categoría:</Form.Label>
			<Form.Control
				type="text"
				value={texto}
				onChange={(e) => {
					setTexto(e.target.value);
				}}
			/>
			<Button
				variant="light"
				className="my-1"
				block
				type="button"
				onClick={() => {
					crearNuevaCategoria(texto);
				}}
			>
				Agregar
			</Button>
		</Form.Group>
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
