import firebase from "firebase";

import 'firebase/firebase-firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCb3uoTn3503PLaEB7avgnvq1HeTkqQEaY",
    authDomain: "sentrade-labeling.firebaseapp.com",
    projectId: "sentrade-labeling",
    storageBucket: "sentrade-labeling.appspot.com",
    messagingSenderId: "960291792069",
    appId: "1:960291792069:web:b9fdba4a2755267826fcac"
};

//init firebase

firebase.initializeApp(firebaseConfig);


//init firestore service

const projectFirestore = firebase.firestore();

// projectFirestore.enablePersistence();


const timestamp = firebase.firestore.FieldValue.serverTimestamp
const increment = firebase.firestore.FieldValue.increment
const documentId = firebase.firestore.FieldPath.documentId


export { projectFirestore,timestamp,increment,documentId}