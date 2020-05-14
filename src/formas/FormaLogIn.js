import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { ACTION_LOGIN_USUARIO } from '../state/actions';

const FormaLogIn = ({ login }) => {
	const { register, handleSubmit, errors } = useForm();

	return (
		<div>
			<form
				onSubmit={handleSubmit((values) => {
					console.log(values);
					login(values);
				})}
			>
				<label>Correo</label>
				<input
					name="correo"
					ref={register({
						required: 'El correo es requerido',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
							message: 'Debes introducir un correo válido',
						},
					})}
				/>
				<br />
				{errors.correo && <p>{errors.correo.message}</p>}

				<br />
				<label>Password</label>
				<input
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
				{errors.password && <p>{errors.password.message}</p>}
				<input type="submit" value="Submit" />
			</form>
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
