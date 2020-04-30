import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ACTION_LISTA_INICIAR, ACTION_LISTA_MAS_POSTS } from './state/actions';
import SeleccionarCategorias from './SeleccionarCategorias';

const Lista = ({ stateLista, comenzar, mas, categorias }) => {
	useEffect(() => {
		comenzar();
	}, [categorias]);

	return (
		<div>
			{stateLista.comenzar ? (
				<p>Cargando...</p>
			) : (
				<div>
					Lista:
					<SeleccionarCategorias />
					{stateLista.posts.map(({ id, titulo }) => (
						<div key={id}>{`${id} | ${titulo}`}</div>
					))}
					{stateLista.total ? (
						<p>Son todos los posts</p>
					) : (
						<div>
							{stateLista.cargando ? (
								<p>Cargando más posts</p>
							) : (
								<button onClick={mas}>Cargar más posts</button>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		stateLista: state.lista,
		categorias: state.categorias.lista,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		comenzar: () => {
			// dispatch({ type: 'PRUEBA' });
			dispatch(ACTION_LISTA_INICIAR);
		},
		mas: () => {
			dispatch(ACTION_LISTA_MAS_POSTS);
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Lista);
