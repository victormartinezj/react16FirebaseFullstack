import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { ACTION_LOGIN_USUARIO } from '../state/actions';
import { Form, Alert, Container, Button } from 'react-bootstrap';

const FormaLogIn = ({ login }) => {
	const { register, handleSubmit, errors } = useForm();

	return (
		<div>
			<Container>
				<Form
					className="mt-5"
					onSubmit={handleSubmit((values) => {
						console.log(values);
						login(values);
					})}
				>
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
							<Alert className="my-1" variant="danger">
								{errors.correo.message}
							</Alert>
						)}
					</Form.Group>

					<Form.Group>
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
							<Alert className="my-1" variant="danger">
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
		login: (values) => {
			dispatch(ACTION_LOGIN_USUARIO(values));
		},
	};
};

export default connect(null, mapDispatchToProps)(FormaLogIn);
