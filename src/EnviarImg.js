import React, { useState, useEffect } from 'react';
import { storage } from './firebase';

const EnviarImg = (props) => {
	const [enviar, setEnviar] = useState({ activo: false, archivo: null });
	const [listaItems, setListaItems] = useState([]);
	const [eliminar, setEliminar] = useState({ activo: false, id: null });

	useEffect(() => {
		if (eliminar.activo) {
			storage
				.ref()
				.child(`blog/${eliminar.id}`)
				.delete()
				.then(() => {
					console.log('Eliminación adecuada');
					setEliminar({ activo: false, id: null });
				})
				.catch((e) => {
					setEliminar({ activo: false, id: null });
					console.log(e);
				});
		}
	}, [eliminar]);

	useEffect(() => {
		storage
			.ref()
			.child('blog')
			.listAll()
			.then((res) => {
				let tempArray = [];
				res.items.forEach((item) => {
					tempArray.push(item.name);
					console.log(item);
					console.log(item.name);
				});
				setListaItems((values) => [...values, ...tempArray]);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	useEffect(() => {
		if (enviar.activo) {
			storage
				.ref(`blog/${Date.now().toString()}${enviar.archivo.name}`)
				.put(enviar.archivo)
				.then((v) => {
					console.log(v);
					v.ref.getDownloadURL().then((v) => {
						console.log(v);
					});
					console.log('carga correcta');

					setEnviar({ activo: false, archivo: null });
				})
				.catch((e) => {
					console.log(e);
					setEnviar({ activo: false, archivo: null });
				});
		}
	}, [enviar]);
	return (
		<div>
			<input
				type="file"
				accept="image/*"
				onChange={(e) => {
					console.log(e.target.files[0]);
					setEnviar({ activo: true, archivo: e.target.files[0] });
				}}
			/>
			<br />
			{listaItems.map((item) => (
				<div key={item}>
					{item}
					<button
						onClick={() => {
							setEliminar({ activo: true, id: item });
						}}
					>
						eliminar
					</button>
				</div>
			))}
		</div>
	);
};
export default EnviarImg;
