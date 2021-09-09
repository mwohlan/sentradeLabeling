import firebaseConfig from './secret'
import { initializeApp } from "firebase/app"
import { getFirestore,serverTimestamp,increment,documentId } from "firebase/firestore";




//init firebase

const firebaseApp = initializeApp(firebaseConfig);
const projectFirestore = getFirestore()



// projectFirestore.enablePersistence();




export { projectFirestore, serverTimestamp as timestamp ,increment,documentId}