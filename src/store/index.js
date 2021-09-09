import { defineStore } from 'pinia'
import { projectFirestore, timestamp, increment, documentId } from "../firebase/config";
import { where, query, orderBy, limit, onSnapshot, updateDoc, doc, addDoc, collection, deleteDoc, getDocs, deleteField, getDoc } from '@firebase/firestore';
import getCollection from '../composables/getCollection'


export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    sentencesWithoutSentiment: new Map(),
    sentencesWithSentiment: new Map(),
    sentences: new Map(),
    recentlyLabeledSentences: new Map(),
    sentencesWithDiscussions: new Map(),
    sentencesWithConflicts: new Map(),
    current_user: null,
    stats: {},
    users: [],
    linkSentence: new Map(),
    loading: false,

  }),
  getters: {

    sortedSentencesWithDiscussions() {
      let sortedArrayWithDiscussions = [...this.sentencesWithDiscussions.values()].sort((a, b) => b.discussion.latestDiscussionComment - a.discussion.latestDiscussionComment
      ).map(sentence => [sentence.id, sentence]);
      return new Map(sortedArrayWithDiscussions);
    },

    unreadPostsCount() {
      let unreadPostsCount = 0

      if (!this.stats.unreadPosts) {
        return unreadPostsCount;
      }

      Object.values(this.stats.unreadPosts).forEach(value => unreadPostsCount += value.length);

      return unreadPostsCount;



    }



  }
  ,
  actions: {
    setCurrentUser(user) {
      this.current_user = user
      localStorage.setItem('current_user', JSON.stringify(user));
      this.setStats()

    },
    setSentencesWithoutSentiment(reloadAmount) {


      const watchQuery = query(collection(projectFirestore, "sentences"), where("sentiments.labeled", "==", false), orderBy("created"), limit(Math.max(8, this.sentencesWithoutSentiment.size + reloadAmount)))
      const { unsub } = getCollection(watchQuery, this.sentencesWithoutSentiment)

      return { unsub }

    },
    setRecentlyLabeledSentences(reloadAmount) {


      const watchQuery = query(collection(projectFirestore, "sentences"), orderBy(`sentiments.${this.current_user.name}.updated`, 'desc'), limit(Math.max(8, this.recentlyLabeledSentences.size + reloadAmount)))
      const { unsub } = getCollection(watchQuery, this.recentlyLabeledSentences)

      return { unsub }

    },

    setSentencesWithSentiment(reloadAmount) {




      const watchQuery = query(collection(projectFirestore, "sentences"), where(`sentiments.${this.current_user.name}.value`, "==", -2), where("sentiments.labeled", "==", true), orderBy("created"), limit(Math.max(8, this.sentencesWithSentiment.size + reloadAmount)));
      const { unsub } = getCollection(watchQuery, this.sentencesWithSentiment)

      return { unsub }

    },
    setAllSentences(reloadAmount) {

      const watchQuery = query(collection(projectFirestore, "sentences"), orderBy("created"), limit(Math.max(8, this.sentences.size + reloadAmount)));


      const { unsub } = getCollection(watchQuery, this.sentences)

      return { unsub }

    },
    setSentencesWithConflicts(reloadAmount) {
      const watchQuery = query(collection(projectFirestore, "sentences"), where("sentiments.conflict", "==", true), orderBy("created"), limit(Math.max(8, this.sentencesWithConflicts.size + reloadAmount)));
      const { unsub } = getCollection(watchQuery, this.sentencesWithConflicts)

      return { unsub }


    },

    setSentencesWithDiscussions() {


      const watchQuery = query(collection(projectFirestore, "sentences"), where("discussion.discussionResolved", "==", false), where("discussion.latestDiscussionComment", ">", 0));

      const { unsub } = getCollection(watchQuery, this.sentencesWithDiscussions)

      const updateUnreadPosts = () => {
        updateDoc(doc(projectFirestore, "users", this.current_user.id), {
          unreadPosts: {}
        })
      }



      return { unsub, updateUnreadPosts }



    },
    setLinkSentence(id) {


      const watchQuery = query(collection(projectFirestore, "sentences"), where(documentId(), "==", id));


      const { unsub } = getCollection(watchQuery, this.linkSentence)


      return unsub



    },





    setStats() {
      const unreadPosts = onSnapshot(query(collection(projectFirestore, "users"), where("name", "==", this.current_user.name)), (snap) => {
        this.stats.unreadPosts = snap.docs[0].data().unreadPosts;
      });
      const setSentimentCount = onSnapshot(query(collection(projectFirestore, "users"), where("name", "==", this.current_user.name)), (snap) => {
        this.stats.sentimentCount = snap.docs[0].data().sentimentCount
      });



      const unlabeledSentences = onSnapshot(doc(projectFirestore, "stats", "stats"), (snap) => {
        this.stats.unlabeledSentences = snap.data().unlabeledSentences;
      });

      const labeledSentences = onSnapshot(doc(projectFirestore, "stats", "stats"), (snap) => {
        this.stats.labeledSentences = snap.data().labeledSentences;
      });










      return () => { setSentimentCount(); unlabeledSentences(); unreadPosts(); labeledSentences(); }

    },


    async addSentiment(sentence, sentiment) {
      let conflict = false;


      for (const user of this.users.filter((u) => u.name !== this.current_user.name)) {
        if (sentence.sentiments[user.name].value != -2 && sentence.sentiments[user.name].value != sentiment) {
          conflict = true;
        }
      }

      try {

        await updateDoc(doc(projectFirestore, "sentences", sentence.id), {
          sentiments: {
            ...sentence.sentiments,
            [this.current_user.name]: { value: sentiment, updated: timestamp() },
            labeled: true,
            conflict: conflict
          },
          updated: timestamp()
        })

        if (sentence.sentiments[this.current_user.name].value == -2) {
          updateDoc(doc(projectFirestore, "users", this.current_user.id), {
            sentimentCount: increment(1)
          })
        }
        if (!sentence.sentiments.labeled) {
          updateDoc(doc(projectFirestore, "stats", "stats"), {
            unlabeledSentences: increment(-1)
          })

          updateDoc(doc(projectFirestore, "stats", "stats"), {
            labeledSentences: increment(1)
          })
        }

      } catch (error) {
        console.log(error.message);

      }





    },
    async removeSentence(sentence) {
      try {
        await deleteDoc(doc(projectFirestore, "sentences", sentence.id))

        updateDoc(doc(projectFirestore, "stats", "stats"), {
          labeledSentences: increment(-1)
        })

      } catch (error) {
        console.error(error.message)
      }

    },

    async addUserDiscussion(sentence, body) {

      const now = Date.now();



      const userComment = {
        user: this.current_user.name,
        body: body,
        created: now
      }

      if (sentence.discussion) {
        sentence.discussion.comments.push(userComment)
      } else {
        sentence.discussion = {}
        sentence.discussion.comments = [userComment]
      }



      updateDoc(doc(projectFirestore, "sentences", sentence.id), {
        discussion: {
          discussionResolved: false,
          comments: sentence.discussion.comments,
          latestDiscussionComment: now
        },

        updated: timestamp(),

      })

      updateDoc(doc(projectFirestore, "users", this.current_user.id), {
        latestDiscussionComment: now,

      })


      for (const user of this.users.filter((u) => u.name !== this.current_user.name)) {
        let docRef = doc(projectFirestore, "users", user.id)
        let userObject = await getDoc(docRef)
        let unreadPosts = userObject.data().unreadPosts
        if (unreadPosts[sentence.id]) {
          let unreadPostsArray = [...unreadPosts[sentence.id], now]
          unreadPosts[sentence.id] = unreadPostsArray

        } else {
          unreadPosts[sentence.id] = [now]
        }
        updateDoc(docRef, {
          unreadPosts: unreadPosts
        })


      }







    },

    async removeUserDiscussion(sentence, discussionTimestamp) {
      sentence.discussion.comments = sentence.discussion.comments.filter((discussion) => discussion.created != discussionTimestamp);

      updateDoc(doc(projectFirestore, "sentences", sentence.id), {
        discussion: {
          ...sentence.discussion,
          comments: sentence.discussion.comments,
          latestDiscussionComment: sentence.discussion.comments.length > 0 ? sentence.discussion.comments[sentence.discussion.comments.length - 1].created : 0
        },
        updated: timestamp(),

      })


      for (const user of this.users.filter((u) => u.name !== this.current_user.name)) {
        let docRef = doc(projectFirestore, "users", user.id)
        let userObject = await getDoc(docRef)
        let unreadPosts = userObject.data().unreadPosts
        if (unreadPosts[sentence.id]) {
          let unreadPostsArray = unreadPosts[sentence.id].filter(entry => entry != discussionTimestamp)
          unreadPosts[sentence.id] = unreadPostsArray
          if (unreadPostsArray.length === 0) {
            delete unreadPosts[sentence.id]
          }

          updateDoc(docRef, {
            unreadPosts: unreadPosts
          })
        }



      }

    },
    changeDiscussionStatus(sentence) {
      let newDiscussionStatus = sentence.discussion.discussionResolved ? false : true;

      updateDoc(doc(projectFirestore, "sentences", sentence.id), {
        discussion: {
          ...sentence.discussion,
          discussionResolved: newDiscussionStatus
        },
        updated: timestamp(),
      })


    },
    addRandomComment() {
      const names = ['Yannik', 'Markus']

      const phrases = [' ist doof. ', " ist cool. ", " weiss nicht, was er tut. ", " ist ein Genie, dass seinesgleichen sucht. ", " ist zum dumm zum scheissen. ", " wird Sentrade in den Olymp befördern."]

      const randomTitle = names[Math.floor(Math.random() * names.length)] + phrases[Math.floor(Math.random() * phrases.length)]

      let randomComment = ""

      for (let index = 0; index < 6; index++) {
        randomComment += names[Math.floor(Math.random() * names.length)] + phrases[Math.floor(Math.random() * phrases.length)]

      }





      addDoc(collection(projectFirestore, "sentences"), {
        submissionTitle: randomTitle,
        body: randomComment,
        labeled: false,
        permalink: "https://www.google.com",
        yanikovic: -2,
        starkus: -2,
        conflict: false,
        created: timestamp(),
        updated: timestamp(),
        subredditName: "random",
        score: -1

      })



    },


    async setUsers() {


      try {
        const querySnapshot = await getDocs(collection(projectFirestore, "users"))

        querySnapshot.forEach(doc => {

          this.users.push({ ...doc.data(), id: doc.id })

        })

      } catch (error) {
        console.log(error.message)
      }





    },


    acceptConflict(sentence) {
      updateDoc(doc(projectFirestore, "sentences", sentence.id), {
        sentiments: {
          ...sentence.sentiments,
          conflict: false
        },
        updated: timestamp(),

      })
    }


  },
})
