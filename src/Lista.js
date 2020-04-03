import React, { useEffect } from 'react';
import { db } from './firebase';

const Lista = (props) => {
	useEffect(() => {
		db.collection('posts')
			.doc('miId')
			.get()
			.then((doc) => {
				if (doc.exists) {
					console.log(doc.data());
				}
			})
			.catch((e) => {
				console.log(e);
			});
		// db.collection('posts')
		// 	.get()
		// 	.then((querySnapshot) => {
		// 		querySnapshot.forEach((doc) => {
		// 			console.log(doc.data());
		// 		});
		// 	})
		// 	.catch((e) => {
		// 		console.log(e);
		// 	});
	}, []);

	return <div></div>;
};
export default Lista;
