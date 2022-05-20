import { defineStore } from 'pinia'
import { isConflict, updateUserLabelCounts, updateLabelCounts, wasConflict } from '../helper/storeHelpers';
import { projectFirestore, timestamp, documentId } from "../firebase/config";
import { where, query, orderBy, limit, onSnapshot, updateDoc, doc, collection, getDocs, getDoc } from '@firebase/firestore';
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
    userStats: new Map(),
    generalStats: {},
    users: [],
    linkSentence: new Map(),
    loading: false,
    openMobileMenu: false,
    filterTerm: "",
    isMobileDevice: false,
    hideSentiments: false
   

  }),
  getters: {

    sortedSentencesWithDiscussions() {
      let sortedArrayWithDiscussions = [...this.sentencesWithDiscussions.values()].sort((a, b) => b.discussion.latestDiscussionComment - a.discussion.latestDiscussionComment
      ).map(sentence => [sentence.id, sentence]);
      return new Map(sortedArrayWithDiscussions);
    },

    unreadPostsCount() {
      let unreadPostsCount = 0

      if (!this.userStats.get(this.current_user?.id)?.unreadPosts) {
        return unreadPostsCount;
      }

      Object.values(this.userStats.get(this.current_user?.id)?.unreadPosts).forEach(value => unreadPostsCount += value.length);

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

      const watchQuery = query(collection(projectFirestore, "sentences"), where("sentiments.labeled", "==", false), orderBy("created"), limit(Math.max(8, reloadAmount)))
      const unsub = getCollection(watchQuery, this.sentencesWithoutSentiment)

      return unsub

    },
    setRecentlyLabeledSentences(reloadAmount) {

      const watchQuery = query(collection(projectFirestore, "sentences"), orderBy(`sentiments.${this.current_user.name}.updated`, 'desc'), limit(Math.max(8, reloadAmount)))
      const unsub = getCollection(watchQuery, this.recentlyLabeledSentences)

      return unsub

    },

    setSentencesWithSentiment(reloadAmount) {

      const watchQuery = query(collection(projectFirestore, "sentences"), where(`sentiments.${this.current_user.name}.value`, "==", -2), where("sentiments.labeled", "==", true), orderBy("created"), limit(Math.max(8, reloadAmount)));
      const unsub = getCollection(watchQuery, this.sentencesWithSentiment)

      return unsub

    },
    setAllSentences(reloadAmount) {


      const watchQuery = query(collection(projectFirestore, "sentences"), orderBy("created"), limit(Math.max(8, reloadAmount)));


      const unsub = getCollection(watchQuery, this.sentences)

      return unsub

    },
    setSentencesWithConflicts(reloadAmount) {
      const watchQuery = query(collection(projectFirestore, "sentences"), where("sentiments.conflict", "==", true), orderBy("created"), limit(Math.max(8, reloadAmount)));
      const unsub = getCollection(watchQuery, this.sentencesWithConflicts)

      return unsub


    },

    setSentencesWithDiscussions(reloadAmount) {

      const watchQuery = query(collection(projectFirestore, "sentences"), where("discussion.discussionResolved", "==", false), where("discussion.latestDiscussionComment", ">", 0), orderBy("discussion.latestDiscussionComment", "desc"), limit(Math.max(8, reloadAmount)));
      const unsub = getCollection(watchQuery, this.sentencesWithDiscussions)

      const updateUnreadPosts = () => {
        updateDoc(doc(projectFirestore, "users", this.current_user.id), {
          unreadPosts: {}
        })
      }
      return { unsub, updateUnreadPosts }

    },
    setLinkSentence(id) {

      const watchQuery = query(collection(projectFirestore, "sentences"), where(documentId(), "==", id));
      const unsub = getCollection(watchQuery, this.linkSentence)

      return unsub

    },

    setStats() {





      const userStats = onSnapshot(collection(projectFirestore, "users"), (snap) => {
        snap.forEach(doc => {
          let stats = {}
          stats.unreadPosts = doc.data().unreadPosts;
          stats.sentimentCounts = doc.data().sentimentCounts
          stats.sentimentCountHistory = doc.data().sentimentCountHistory
          stats.name = doc.data().name
          this.userStats.set(doc.id, stats)
        })

      });


      const generalStats = onSnapshot(doc(projectFirestore, "stats", "stats"), (snap) => {
        this.generalStats.unlabeledSentences = snap.data().unlabeledSentences
        this.generalStats.labeledSentences = snap.data().labeledSentences
        this.generalStats.conflictHistory = snap.data().conflictHistory
      });

      return () => { userStats(); generalStats(); }

    },


    async addSentiment(sentence, sentiment) {


      try {

        const conflict = isConflict(sentence, sentiment, this.current_user, this.users)
        const pastConflict = wasConflict(sentence,this.users)

        await updateDoc(doc(projectFirestore, "sentences", sentence.id), {
          sentiments: {
            ...sentence.sentiments,
            [this.current_user.name]: { value: sentiment, updated: timestamp() },
            labeled: true,
            conflict: conflict
          },
          updated: timestamp()
        })

        if (conflict && !pastConflict) {
          this.addBotDiscussion(sentence)
        }

        updateLabelCounts(sentence, this.current_user, this.users, sentiment)
        updateUserLabelCounts(sentence, this.current_user, sentiment)

      } catch (error) {
        console.log(error.message);

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

    async addBotDiscussion(sentence) {

      const now = Date.now();

      const botComment = {
        user: 'Sentrade',
        body: 'This comment was generated because of a new conflict',
        created: now
      }

      if (sentence.discussion) {
        sentence.discussion.comments.push(botComment)
      } else {
        sentence.discussion = {}
        sentence.discussion.comments = [botComment]
      }



      updateDoc(doc(projectFirestore, "sentences", sentence.id), {
        discussion: {
          discussionResolved: false,
          comments: sentence.discussion.comments,
          latestDiscussionComment: now
        },

        updated: timestamp(),

      })


      for (const user of this.users) {
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
    },

      renewConflict(sentence) {
      updateDoc(doc(projectFirestore, "sentences", sentence.id), {
        sentiments: {
          ...sentence.sentiments,
          conflict: true
        },
        updated: timestamp(),

      })
    }
  },
})

