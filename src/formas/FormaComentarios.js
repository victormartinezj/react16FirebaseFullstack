import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { ACTION_AGREGAR_COMENTARIO } from '../state/actions';

const FormaComentarios = ({ slug, usuario, agregarComentario }) => {
	const { handleSubmit, errors, register } = useForm();

	return (
		<div>
			{usuario.usuario ? (
				<form
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
					<input name="comentario" ref={register({ required: true })} />
					<input type="submit" />
				</form>
			) : (
				<p>Necesitas registrarte para poder comentar</p>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		usuario: state.usuario,
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
