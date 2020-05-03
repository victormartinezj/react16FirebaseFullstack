import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

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

export const fs = firebase.firestore;
export const db = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
