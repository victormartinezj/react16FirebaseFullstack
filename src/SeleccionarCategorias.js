import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import queryString from 'query-string';
const SeleccionarCategorias = ({
	categorias,
	activar,
	desactivar,
	cargadas,
}) => {
	let location = useLocation();
	let history = useHistory();

	console.log(location);
	let search = queryString.parse(location.search, { arrayFormat: 'comma' });
	console.log(search);

	console.log(search['categorias']);

	let tempUrl = [];
	if (search['categorias']) {
		if (Array.isArray(search['categorias'])) {
			tempUrl = [...search['categorias']];
		} else {
			tempUrl = [search['categorias']];
		}
	}

	useEffect(() => {
		if (cargadas) {
			console.log('fuera forEach');
			let tempActivas = categorias.filter((cat) => cat.activa);
			console.log(tempActivas);

			if (
				tempActivas.length === 0 &&
				search['categorias'] &&
				search['categorias'].length !== 0
			) {
				tempUrl.forEach((loc) => {
					console.log('forEach');
					activar(loc);
				});
			}
		}
	}, [cargadas]);

	return (
		<div>
			Categorias seleccionadas:{' '}
			{categorias
				.filter((cat) => cat.activa)
				.map((cat) => {
					return (
						<button
							key={cat.nombre}
							onClick={() => {
								desactivar(cat.nombre);
								let buttonCat = tempUrl
									.filter((ele) => ele !== cat.nombre)
									.join();
								if (buttonCat.length !== 0) {
									history.push(`?categorias=${buttonCat}`);
								} else {
									history.push('/');
								}
							}}
						>
							{cat.nombre}
						</button>
					);
				})}
			Lista de categorias:{' '}
			{categorias
				.filter((cat) => !cat.activa)
				.map((cat) => {
					return (
						<button
							key={cat.nombre}
							onClick={() => {
								activar(cat.nombre);
								let buttonCat = tempUrl.concat([cat.nombre]).join();
								history.push(`?categorias=${buttonCat}`);
							}}
						>
							{cat.nombre}
						</button>
					);
				})}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		categorias: state.categorias.lista,
		cargadas: state.categorias.cargadas,
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
