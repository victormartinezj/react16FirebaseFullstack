import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { ACTION_CREAR_USUARIO } from '../state/actions';
import { Form, Container, Button, Alert } from 'react-bootstrap';

const FormaRegistro = ({ registroUsuario }) => {
	const { register, handleSubmit, errors, watch } = useForm();

	return (
		<div>
			<Container>
				<Form
					className="mt-5"
					onSubmit={handleSubmit((values) => {
						console.log(values);
						registroUsuario(values);
					})}
				>
					<Form.Group controlId="nombre">
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							name="nombre"
							ref={register({
								required: 'El nombre es requerido',
								minLength: {
									value: 5,
									message: 'El nombre debe ser de 5 caracteres',
								},
								maxLength: {
									value: 10,
									message: 'El nombre debe ser de 10 caracteres máximo',
								},
							})}
						/>
						{errors.nombre && (
							<Alert variant="danger" className="my-1">
								{errors.nombre.message}
							</Alert>
						)}
					</Form.Group>
					<Form.Group controlId="correo">
						<Form.Label>Correo</Form.Label>
						<Form.Control
							name="correo"
							ref={register({
								required: 'El correo es requerido',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: 'Debes introducir un correo válido',
								},
							})}
						/>

						{errors.correo && (
							<Alert variant="danger" className="my-1">
								{errors.correo.message}
							</Alert>
						)}
					</Form.Group>
					<Form.Group controlId="confirmacion">
						<Form.Label>Confirmación</Form.Label>
						<Form.Control
							name="confirmacion"
							ref={register({
								required: 'La confirmación es requerida',
								validate: (value) =>
									value === watch('correo') || 'Los correos deben coincidir',
							})}
						/>

						{errors.confirmacion && (
							<Alert variant="danger" className="my-1">
								{errors.confirmacion.message}
							</Alert>
						)}
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							name="password"
							ref={register({
								required: 'El password es requerido',
								minLength: {
									value: 8,
									message: 'El password debe contener al menos 8 caracteres',
								},
								maxLength: {
									value: 16,
									message: 'El password debe ser de máximo 16 caracteres',
								},
							})}
						/>
						{errors.password && (
							<Alert variant="danger" className="my-1">
								{errors.password.message}
							</Alert>
						)}
					</Form.Group>
					<Button block type="submit">
						Enviar
					</Button>
				</Form>
			</Container>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		registroUsuario: (values) => {
			dispatch(ACTION_CREAR_USUARIO(values));
		},
	};
};

export default connect(null, mapDispatchToProps)(FormaRegistro);
