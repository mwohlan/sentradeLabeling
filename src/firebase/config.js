
import { initializeApp } from "firebase/app"
import { getFirestore,serverTimestamp,increment,documentId } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCb3uoTn3503PLaEB7avgnvq1HeTkqQEaY",
    authDomain: "sentrade-labeling.firebaseapp.com",
    projectId: "sentrade-labeling",
    storageBucket: "sentrade-labeling.appspot.com",
    messagingSenderId: "960291792069",
    appId: "1:960291792069:web:b9fdba4a2755267826fcac"
};

//init firebase

const firebaseApp = initializeApp(firebaseConfig);
const projectFirestore = getFirestore()



// projectFirestore.enablePersistence();


const timestamp = serverTimestamp



export { projectFirestore,timestamp,increment,documentId}