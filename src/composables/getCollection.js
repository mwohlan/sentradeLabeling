import { useMainStore } from '../store'
import { onSnapshot } from '@firebase/firestore'


const getCollection = (watchQuery, storeReference) => {

    const store = useMainStore();

    function snapShotHandler(snap) {

       

        if (!snap.metadata.hasPendingWrites) {

            
               
            

            snap.docChanges().forEach((change) => {
                let { newIndex, oldIndex, doc, type } = change;
                if (type === "added") {
                    storeReference.set(doc.id, { ...doc.data(), id: doc.id });

                }
                else if (type === "modified") {
                    storeReference.set(doc.id, { ...doc.data(), id: doc.id });
                }
                else if (type === "removed") {
                    storeReference.delete(doc.id);
                }
            });

        }

                                                                                                                                                                                                                                                                                                                                                                               
       
        store.loading = false;
       
           
    }

    function errorHandler(error) {
        console.log(error.message);
    }

    const unsub = onSnapshot(watchQuery, snapShotHandler, errorHandler);

    return  unsub                   
}

export default getCollection