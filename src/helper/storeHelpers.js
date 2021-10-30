import { projectFirestore, increment, } from "../firebase/config";
import {  updateDoc, doc,  } from '@firebase/firestore';




export function isConflict(sentence, sentiment, current_user, users) {
    let conflict = false;
    for (const user of users.filter((u) => u.name !== current_user.name)) {
        if (!isWithoutSentiment(sentence, user) && sentence.sentiments[user.name].value != sentiment) {
            conflict = true;
        }
    }
    return conflict;
}


export function wasConflict(sentence, users) {
    let conflict = false;
    let sentiments = new Set();
    for (const user of users) {

        if (!isWithoutSentiment(sentence, user) && sentiments.size > 0 && !sentiments.has(sentence.sentiments[user.name].value)) {
            conflict = true;
        }
        if (!isWithoutSentiment(sentence, user)) {
            sentiments.add(sentence.sentiments[user.name].value)
        }
    }
    return conflict;
}

export function isFullyLabeled(sentence, current_user, users) {
    let isFullyLabeled = true;
    for (const user of users.filter((u) => u.name !== current_user.name)) {
        if (isWithoutSentiment(sentence, user)) {
            isFullyLabeled = false;
        }
    }
    return isFullyLabeled;
}

export function wasFullyLabeled(sentence, users) {
    let isFullyLabeled = true;
    for (const user of users) {
        if (isWithoutSentiment(sentence, user)) {
            isFullyLabeled = false;
        }
    }
    return isFullyLabeled;
}

export function isWithoutSentiment(sentence, current_user) {
    return sentence.sentiments[current_user.name].value == -2;
}


export function updateUserLabelCounts(sentence, current_user, sentiment) {
    if (isWithoutSentiment(sentence, current_user)) {
        updateDoc(doc(projectFirestore, 'users', current_user.id), {
            [`sentimentCountHistory.${todayInMillis()}.${sentiment}`]: increment(1),
            [`sentimentCountHistory.${todayInMillis()}.total`]: increment(1),
            [`sentimentCountHistory.${todayInMillis()}.newTotal`]: sentence.sentiments.labeled ? increment(0): increment(1),
            [`sentimentCounts.${sentiment}`]: increment(1),
            ['sentimentCounts.total']: increment(1),

        })
    } else {
        updateDoc(doc(projectFirestore, 'users', current_user.id), {
            [`sentimentCounts.${sentiment}`]: increment(1),
            [`sentimentCounts.${sentence.sentiments[current_user.name].value}`]: increment(-1),


        })
    }
}


export function updateLabelCounts(sentence, current_user, users, sentiment) {

    if (!sentence.sentiments.labeled) {
        updateDoc(doc(projectFirestore, 'stats', 'stats'), {
            [`labeledSentences.total`]: increment(1),
            [`unlabeledSentences`]: increment(-1),
        })
    }
    if (isFullyLabeled(sentence, current_user, users) && !wasFullyLabeled(sentence,users)) {
        updateDoc(doc(projectFirestore, 'stats', 'stats'), {
            [`labeledSentences.totalFullyLabeled`]: increment(1),
            [`conflictHistory.${todayInMillis()}.fullyLabeled`]: increment(1),


        })
    }
    if (isConflict(sentence, sentiment, current_user, users) && !wasConflict(sentence,users)) {
        updateDoc(doc(projectFirestore, 'stats', 'stats'), {
            [`labeledSentences.totalConflicts`]: increment(1),
            [`conflictHistory.${todayInMillis()}.conflicts`]: increment(1),


        })
    }
    if (wasConflict(sentence, users) && !isConflict(sentence,sentiment,current_user,users) ) {
        updateDoc(doc(projectFirestore, 'stats', 'stats'), {
            [`labeledSentences.totalConflicts`]: increment(-1),


        })
    }



}

export function todayInMillis() {

    return new Date().setHours(0, 0, 0, 0);

}

export function oneWeekAgoInMillis() {


    return new Date().setDate(new Date().getDate()-7)

}


export function oneMonthAgoInMillis() {


    return new Date().setDate(new Date().getDate() - 30)

}







