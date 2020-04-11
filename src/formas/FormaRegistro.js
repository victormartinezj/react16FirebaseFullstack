import React from 'react';
import { useForm } from 'react-hook-form';

const FormaPublicacion = (props) => {
	const { register, handleSubmit, errors, watch } = useForm();

	return (
		<div>
			<form
				onSubmit={handleSubmit((values) => {
					console.log(values);
				})}
			>
				<label>Nombre</label>
				<input
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
				{errors.nombre && <p>{errors.nombre.message}</p>}
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
				<label>Confirmación</label>
				<input
					name="confirmacion"
					ref={register({
						required: 'La confirmación es requerida',
						validate: (value) =>
							value === watch('correo') || 'Los correos deben coincidir',
					})}
				/>

				{errors.confirmacion && <p>{errors.confirmacion.message}</p>}
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
export default FormaPublicacion;
