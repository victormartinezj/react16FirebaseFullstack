import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Editor from './Editor';
import { db } from '../firebase';
import slugify from 'react-slugify';

const FormaPublicacion = (props) => {
	const {
		register,
		handleSubmit,
		errors,
		setValue,
		triggerValidation,
	} = useForm();

	const [enviar, setEnviar] = useState(false);
	const [values, setValues] = useState(null);
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

	useEffect(() => {
		if (enviar) {
			const miBatch = db.batch();
			const miSlug = slugify(values.slug);

			const slugs = db.collection('slugs').doc(miSlug);
			miBatch.set(slugs, { activo: true });
			const posts = db.collection('posts').doc(miSlug);
			miBatch.set(posts, { titulo: values.titulo, resumen: values.resumen });
			const completos = db.collection('completos').doc(miSlug);
			miBatch.set(completos, { titulo: values.titulo, cuerpo: values.cuerpo });

			miBatch
				.commit()
				.then(() => {
					console.log('El batch fue correcto');
					setEnviar(false);
				})
				.catch((e) => {
					setEnviar(false);
					console.log(e);
				});
		}
	}, [enviar]);
	useEffect(() => {
		let seleccion = [];
		categorias.forEach(({ nombre, activa }) => {
			if (activa) {
				seleccion.push(nombre);
			}
		});
		setValue('categorias', seleccion);
		triggerValidation('categorias');
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
					setValues(values);
					setEnviar(true);
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
				<label htmlFor="resumen">Resumen</label>
				<br />
				<textarea
					id="resumen"
					name="resumen"
					ref={register({
						required: 'El resumen es requerido',
						minLength: {
							value: 50,
							message: 'El mínimo es de 50 caracteres',
						},
						maxLength: {
							value: 200,
							message: 'El máximo es de 200 caracteres',
						},
					})}
				/>
				<br />
				{errors.resumen && <p>{errors.resumen.message}</p>}
				<br />
				<label htmlFor="slug">Slug:</label>
				<br />
				<input
					id="slug"
					name="slug"
					ref={register({
						required: 'El slug es requerido',
						minLength: {
							value: 20,
							message: 'El mínimo es de 20',
						},
						validate: async (value) => {
							try {
								const miSlug = slugify(value);

								const doc = await db.collection('slugs').doc(miSlug).get();
								if (doc.exists) {
									return 'El slug ya existe utiliza otro';
								} else {
									return true;
								}
							} catch (e) {
								console.log(e);
							}
							// db.collection('slugs')
							// 	.doc(value)
							// 	.get()
							// 	.then((doc) => {
							// 		if (doc.exists) {
							// 			console.log('El slug ya existe');
							// 		} else {
							// 			console.log('realizar lógica');
							// 		}
							// 	})
							// 	.catch((e) => {
							// 		console.log(e);
							// 	});
						},
					})}
				/>
				<br />
				{errors.slug && <p>{errors.slug.message}</p>}
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
