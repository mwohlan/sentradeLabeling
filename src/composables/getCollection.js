import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'
import { useMainStore } from '../store'

import _sortedIndexBy from 'lodash/sortedIndexBy';


const getCollection = (watchQuery, storeReference) => {

    const store = useMainStore();

    // function snapShotHandler(snap) {
    //     if (!snap.metadata.hasPendingWrites) {


    //         console.log("hello")

    //         if (storeReference === store.linkComment) {
    //             storeReference.splice(0, 1, { ...snap.data(), id: snap.id })
    //         } else {

    //             snap.docChanges().forEach((change) => {

    //                 let insertIndex = _sortedIndexBy(storeReference, change.doc.data(), (o) => o.created.seconds + o.created.nanoseconds / 1000000000)
    //                 let findIndex = storeReference.findIndex(comment => comment.id === change.doc.id)
    //                 // console.log(change.type + " " + insertIndex + " " + findIndex)
    //                 if (change.type === "added") {

    //                     if (findIndex !== -1) {
    //                         storeReference.splice(findIndex, 1, { ...change.doc.data(), id: change.doc.id });
    //                     } else {
    //                         storeReference.splice(insertIndex, 0, { ...change.doc.data(), id: change.doc.id });
    //                     }




    //                 }
    //                 if (change.type === "modified") {
    //                     storeReference.splice(findIndex, 1, { ...change.doc.data(), id: change.doc.id });
    //                 }
    //                 if (change.type === "removed") {
    //                     storeReference.splice(findIndex, 1);
    //                 }


    //             });

    //         }

    //     }
    // }

    function snapShotHandler(snap) {


        if (!snap.metadata.hasPendingWrites) {
            snap.forEach((doc) => {
                console.log(doc.data())
            })

            if (storeReference === store.linkComment) {
                storeReference.splice(0, 1, { ...snap.data(), id: snap.id })
            } else {

                let docChanges = snap.docChanges();


                if (docChanges.length < 5) {


                    docChanges.forEach((change) => {

                        let insertIndex = _sortedIndexBy(storeReference, change.doc.data(), (o) => o.created.seconds + o.created.nanoseconds / 1000000000)
                        let findIndex = storeReference.findIndex(comment => comment.id === change.doc.id)

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

                } else {
                    let tempData = []


                    snap.forEach((doc) => {
                        tempData.push({ ...doc.data(), id: doc.id });
                    })
                    storeReference.splice(0, storeReference.length, ...tempData);
                }

            }



        }
    }


    function errorHandler(error) {
        console.log(error.message);
    }


    const unsub = watchQuery.onSnapshot(snapShotHandler, errorHandler);


    const executeScrollQuery = (scrollQuery) => {
        scrollQuery.get().then(snapShotHandler, errorHandler)
    }



    return { unsub, executeScrollQuery }
}

export default getCollection