import { useMainStore } from '../store'
import { onSnapshot } from '@firebase/firestore'


const getCollection = (watchQuery, storeReference) => {

    const store = useMainStore();

    function snapShotHandler(snap) {


        let t0 = performance.now();

       

        if (!snap.metadata.hasPendingWrites) {
            if (snap.docs.length > storeReference.size +1) {
                store.loading = true;
            }

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

        let loadtime = performance.now() - t0;



        setTimeout(() => {
            store.loading = false;
        },
            loadtime > 600 ? 0 : 600 - loadtime);
    }




    function errorHandler(error) {
        console.log(error.message);
    }


    const unsub = onSnapshot(watchQuery, snapShotHandler, errorHandler);





    return { unsub }
}

export default getCollection