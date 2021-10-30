
import { initializeApp } from "firebase/app"
import { getFirestore, serverTimestamp, increment, documentId } from "firebase/firestore";




//init firebase

const firebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
});
const projectFirestore = getFirestore()



// projectFirestore.enablePersistence();




export { projectFirestore, serverTimestamp as timestamp, increment, documentId }