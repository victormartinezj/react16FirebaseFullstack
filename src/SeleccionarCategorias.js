import React from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

const SeleccionarCategorias = ({ categorias, activar, desactivar }) => (
	<div className="mb-5">
		<ButtonToolbar>
			<ButtonGroup>
				{categorias
					.filter((cat) => cat.activa)
					.map((cat) => {
						return (
							<Button
								variant="outline-primary"
								key={cat.nombre}
								onClick={() => {
									desactivar(cat.nombre);
								}}
							>
								{cat.nombre}
							</Button>
						);
					})}
			</ButtonGroup>

			<ButtonGroup>
				{categorias
					.filter((cat) => !cat.activa)
					.map((cat) => {
						return (
							<Button
								key={cat.nombre}
								onClick={() => {
									activar(cat.nombre);
								}}
							>
								{cat.nombre}
							</Button>
						);
					})}
			</ButtonGroup>
		</ButtonToolbar>
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
