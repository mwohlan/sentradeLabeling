import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'
import { useMainStore } from '../store'

import _sortedIndexBy from 'lodash/sortedIndexBy';


const getCollection = (watchQuery, storeReference) => {

    const store = useMainStore();




    const unsub = watchQuery.onSnapshot((snap) => {
        if (!snap.metadata.hasPendingWrites) {

            if (storeReference === store.linkComment) {
                console.log("hello")
                storeReference.splice(0, 1, { ...snap.data(), id: snap.id })
            } else {

                snap.docChanges().forEach((change) => {

                    let insertIndex = _sortedIndexBy(storeReference, change.doc.data(), (o) => o.created.seconds + o.created.nanoseconds / 1000000000)
                    let findIndex = storeReference.findIndex(comment => comment.id === change.doc.id)
                    console.log(change.type + " " + insertIndex + " " + findIndex)
                    if (change.type === "added") {

                        if (findIndex !== -1) {
                            storeReference.splice(findIndex, 1, { ...change.doc.data(), id: change.doc.id });
                        } else {
                            storeReference.splice(insertIndex, 0, { ...change.doc.data(), id: change.doc.id });
                        }




                    }
                    if (change.type === "modified") {
                        storeReference.splice(findIndex, 1, { ...change.doc.data(), id: change.doc.id });
                    }
                    if (change.type === "removed") {
                        storeReference.splice(findIndex, 1);
                    }


                });

            }




        }


    }, (error) => {
        console.log(error.message);
    });


    const executeScrollQuery = (scrollQuery) => {
        scrollQuery.get().then((snap) => {
            snap.docChanges().forEach((change) => {
                if (change.type === "added") {
                    storeReference.push({ ...change.doc.data(), id: change.doc.id });
                }
                if (change.type === "modified") {
                    storeReference.splice(storeReference.findIndex(comment => comment.id === change.doc.id), 1, { ...change.doc.data(), id: change.doc.id });
                }
                if (change.type === "removed") {
                    storeReference.splice(storeReference.findIndex(comment => comment.id === change.doc.id), 1);
                }
            });
        }, (error) => {
            console.log(error.message);
        });
    }



    return { unsub, executeScrollQuery }
}

export default getCollection