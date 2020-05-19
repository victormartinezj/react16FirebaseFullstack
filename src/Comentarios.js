import React from 'react';
import { connect } from 'react-redux';
import { ACTION_CARGAR_COMENTARIOS } from './state/actions';
import FormaComentarios from './formas/FormaComentarios';
import { Alert, Spinner, ListGroup, Card, Button } from 'react-bootstrap';

const Comentarios = ({ slug, cargarComentarios, informacion }) => (
	<div>
		<Alert variant="dark">Comentarios</Alert>
		{informacion.visible ? (
			<div>
				{' '}
				{informacion.cargando ? (
					<div>
						<Spinner animation="border" />

						<p>Cargando...</p>
					</div>
				) : (
					<div>
						{informacion.error ? (
							<Alert variant="danger">Error al cargar los comentarios</Alert>
						) : (
							<ListGroup variant="flush">
								{informacion.comentarios.map((com) => (
									<ListGroup.Item key={com.id}>
										<Card.Body>
											<Card.Title>
												{com.data.autor}
												<p>
													<small>{com.data.fecha}</small>
												</p>
											</Card.Title>
											<Card.Text>{com.data.comentario}</Card.Text>
										</Card.Body>
									</ListGroup.Item>
								))}
								<FormaComentarios slug={slug} />
							</ListGroup>
						)}
					</div>
				)}
			</div>
		) : (
			<Button
				block
				onClick={() => {
					cargarComentarios(slug);
				}}
			>
				Cargar comentarios
			</Button>
		)}
	</div>
);

const mapStateToProps = (state, ownProps) => {
	return {
		informacion: state.comentarios,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		cargarComentarios: (slug) => {
			dispatch(ACTION_CARGAR_COMENTARIOS(slug));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Comentarios);
