import firebase from 'firebase/app';

import 'firebase/firestore';

var firebaseConfig = {
	apiKey: 'AIzaSyDxYdg_JjeDlIawgjDEjG3_l1K-G2i9BdY',
	authDomain: 'blog-ba97e.firebaseapp.com',
	databaseURL: 'https://blog-ba97e.firebaseio.com',
	projectId: 'blog-ba97e',
	storageBucket: 'blog-ba97e.appspot.com',
	messagingSenderId: '946349645803',
	appId: '1:946349645803:web:3d76719bfbe9d3fb7183ae',
};

firebase.initializeApp(firebaseConfig);
