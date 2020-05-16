import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Editor from './Editor';
import { db } from '../firebase';
import slugify from 'react-slugify';
import { connect } from 'react-redux';
import { ACTION_CREAR_NUEVO_POST } from '../state/actions';
import Categorias from '../Categorias';
import { Form, Container, Alert } from 'react-bootstrap';

const FormaPublicacion = ({ categoriasServidor, autor, nuevaPublicacion }) => {
	const {
		register,
		handleSubmit,
		errors,
		setValue,
		triggerValidation,
	} = useForm();

	const [categorias, setCategorias] = useState([]);

	useEffect(() => {
		setCategorias(() => {
			return categoriasServidor.map((cat) => {
				return { nombre: cat, activa: false };
			});
		});
	}, [categoriasServidor]);

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
			<Container>
				<Form
					className="mt-5"
					onSubmit={handleSubmit((values) => {
						nuevaPublicacion({
							...values,
							usuario: { nombre: autor.displayName, id: autor.uid },
						});
					})}
				>
					<Form.Group controlId="titulo">
						<Form.Label>Título</Form.Label>
						<Form.Control
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
						/>
						{errors.titulo && (
							<Alert className="my-1" variant="danger">
								{errors.titulo.message}
							</Alert>
						)}
					</Form.Group>
					<Form.Group controlId="resumen">
						<Form.Label>Resumen</Form.Label>
						<Form.Control
							as="textarea"
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
						{errors.resumen && (
							<Alert className="my-1" variant="danger">
								{errors.resumen.message}
							</Alert>
						)}
					</Form.Group>
					<Form.Group controlId="slug">
						<Form.Label>Slug:</Form.Label>

						<Form.Control
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
								},
							})}
						/>

						{errors.slug && (
							<Alert className="my-1" variant="danger">
								{errors.slug.message}
							</Alert>
						)}
					</Form.Group>
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
					<Categorias />
					<br />

					<label htmlFor="cuerpo">Cuerpo</label>
					<Editor setValue={setValue} />

					<br />
					{errors.cuerpo && <p>{errors.cuerpo.message}</p>}
					<input type="submit" value="Submit" />
				</Form>
			</Container>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		categoriasServidor: state.categorias.servidor,
		autor: state.usuario.usuario,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		nuevaPublicacion: (values) => {
			dispatch(ACTION_CREAR_NUEVO_POST(values));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FormaPublicacion);
