import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Editor from './Editor';

const FormaPublicacion = (props) => {
	const {
		register,
		handleSubmit,
		errors,
		setValue,
		triggerValidation,
	} = useForm();
	console.log(errors);
	const [categorias, setCategorias] = useState([
		{ nombre: 'react', activa: false },
		{ nombre: 'angular', activa: false },
		{ nombre: 'django', activa: false },
		{ nombre: 'vue', activa: false },
		{ nombre: 'rails', activa: false },
		{ nombre: 'node', activa: false },
		{ nombre: 'ruby', activa: false },
		{ nombre: 'js', activa: false },
		{ nombre: 'python', activa: false },
	]);
	console.log(categorias);
	useEffect(() => {
		let seleccion = [];
		categorias.forEach(({ nombre, activa }) => {
			if (activa) {
				seleccion.push(nombre);
			}
		});
		setValue('categorias', seleccion);
		triggerValidation('categorias');
		console.log(seleccion);
	}, [categorias]);

	useEffect(() => {
		register(
			{ name: 'categorias' },
			{
				// required: 'Tienes que seleccionar al menos una categoría',
				validate: (value = []) =>
					value.length !== 0 || 'Debes seleccionar al menos una categoría',
			}
		);
		register({ name: 'cuerpo' });
	}, []);

	return (
		<div>
			<form
				onSubmit={handleSubmit((values) => {
					console.log(values);
				})}
			>
				<label htmlFor="titulo">Título</label>
				<input
					name="titulo"
					ref={register({
						required: 'El título es requerido',
						minLength: {
							value: 10,
							message: 'El mínimo de longitud es de 10 letras',
						},
						maxLength: {
							value: 20,
							message: 'El máximo de longitud es de 20 letras',
						},
					})}
					id="titulo"
				/>
				<br />
				{errors.titulo && <p>{errors.titulo.message}</p>}
				<br />
				<h5>Las categorias seleccionadas son:</h5>
				{errors.categorias && <p>{errors.categorias.message}</p>}
				{categorias.map(({ nombre, activa }, index) => {
					if (activa) {
						return (
							<div key={`seleccionada${nombre}`}>
								<h5>{nombre}</h5>
								<button
									onClick={() => {
										let tempArr = [...categorias];
										tempArr[index] = { nombre, activa: false };
										setCategorias(tempArr);
									}}
								>
									cancelar
								</button>
							</div>
						);
					}
				})}
				<br />
				<h5>Categorias:</h5>
				{categorias.map(({ nombre, activa }, index) => {
					if (activa) {
						return (
							<button
								disabled
								type="button"
								key={nombre}
								onClick={() => {
									let tempArr = [...categorias];
									tempArr[index] = { nombre, activa: true };
									setCategorias(tempArr);
								}}
							>
								{nombre}
							</button>
						);
					} else {
						return (
							<button
								type="button"
								key={nombre}
								onClick={() => {
									const tempArr = [...categorias];
									tempArr[index] = { nombre, activa: true };
									setCategorias(tempArr);
								}}
							>
								{nombre}
							</button>
						);
					}
				})}
				<br />

				<label htmlFor="cuerpo">Cuerpo</label>
				<Editor setValue={setValue} />

				<br />
				{errors.cuerpo && <p>{errors.cuerpo.message}</p>}
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
};
export default FormaPublicacion;
