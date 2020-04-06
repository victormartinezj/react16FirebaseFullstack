import React, { useState, useEffect } from 'react';
import { storage } from './firebase';

const EnviarImg = (props) => {
	const [enviar, setEnviar] = useState({ activo: false, archivo: null });

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
		</div>
	);
};
export default EnviarImg;
