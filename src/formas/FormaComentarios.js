import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { ACTION_AGREGAR_COMENTARIO } from '../state/actions';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const FormaComentarios = ({ slug, usuario, agregarComentario, envio }) => {
	const { handleSubmit, errors, register } = useForm();

	return (
		<div>
			{usuario.usuario ? (
				<div>
					{envio.exito ? (
						<Alert variant="success">
							El comentario se agrego correctamente
						</Alert>
					) : (
						<Form
							onSubmit={handleSubmit((values) => {
								console.log(values);
								const tempValues = {
									...values,
									autor: usuario.usuario.displayName,
									autorId: usuario.usuario.uid,
									slug: slug,
								};
								agregarComentario(tempValues);
							})}
						>
							<Form.Group controlId="nuevoComentario">
								<Form.Label> Nuevo comentario </Form.Label>
								<Form.Control
									name="comentario"
									ref={register({ required: true })}
								/>
							</Form.Group>
							<>
								{envio.error ? (
									<Alert variant="danger">
										Error en el envío intente más tarde
									</Alert>
								) : (
									<div>
										{envio.activo ? (
											<>
												<Spinner animation="border" />
												<Alert variant="info">Envio activo</Alert>
											</>
										) : (
											<Button block type="submit">
												Enviar nuevo comentario
											</Button>
										)}
									</div>
								)}
							</>
						</Form>
					)}
				</div>
			) : (
				<p>Necesitas registrarte para poder comentar</p>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		usuario: state.usuario,
		envio: state.envioComentario,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		agregarComentario: (values) => {
			dispatch(ACTION_AGREGAR_COMENTARIO(values));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FormaComentarios);
