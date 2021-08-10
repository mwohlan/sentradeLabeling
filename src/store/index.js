import { defineStore } from 'pinia'
import { projectFirestore, timestamp, increment, documentId } from "../firebase/config";
import { where, query, orderBy, limit, onSnapshot, updateDoc, doc, addDoc, collection } from '@firebase/firestore';
import getCollection from '../composables/getCollection'
import { getDocs } from 'firebase/firestore';

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    commentsWithoutSentiment: new Map(),
    commentsWithSentiment: new Map(),
    allComments: new Map(),
    commentsWithDiscussions: new Map(),
    commentsWithConflicts: new Map(),
    current_user: null,
    stats: {},
    users: [],
    linkComment: new Map(),
    loading: false,
  }),
  getters: {

    sortedCommentsWithDiscussions() {
      let sortedArrayWithDiscussions = [...this.commentsWithDiscussions.values()].sort((a, b) => b.latestDiscussion - a.latestDiscussion
      ).map(obj => [obj.id, obj]);
      return new Map(sortedArrayWithDiscussions);
    }


  }
  ,
  actions: {
    setCurrentUser(user) {
      this.current_user = user
      localStorage.setItem('current_user', JSON.stringify(user));
      this.setStats()

    },
    setCommentsWithoutSentiment(reloadAmount) {


      const watchQuery = query(collection(projectFirestore, "comments"), where("labeled", "==", false), orderBy("created"), limit(Math.max(8, this.commentsWithoutSentiment.size + reloadAmount)))
      const { unsub } = getCollection(watchQuery, this.commentsWithoutSentiment)

      return { unsub }

    },

    setCommentsWithSentiment(reloadAmount) {


      const watchQuery = query(collection(projectFirestore, "comments"), where(this.current_user.name, "==", -2), where("labeled", "==", true), orderBy("created"), limit(Math.max(8, this.commentsWithSentiment.size + reloadAmount)));
      const { unsub } = getCollection(watchQuery, this.commentsWithSentiment)

      return { unsub }

    },
    setAllComments(reloadAmount) {





      const watchQuery = query(collection(projectFirestore, "comments"), orderBy("created"), limit(Math.max(8, this.allComments.size + reloadAmount)));


      const { unsub } = getCollection(watchQuery, this.allComments)

      return { unsub }

    },
    setCommentsWithConflicts(reloadAmount) {
      const watchQuery = query(collection(projectFirestore, "comments"), where("conflict", "==", true), orderBy("created"), limit(Math.max(8, this.commentsWithConflicts.size + reloadAmount)));
      const { unsub } = getCollection(watchQuery, this.commentsWithConflicts)

      return { unsub }


    },

    setCommentsWithDiscussions() {


      const watchQuery = query(collection(projectFirestore, "comments"), where("discussionResolved", "==", false), where("latestDiscussion", ">", 0));

      const { unsub } = getCollection(watchQuery, this.commentsWithDiscussions)

      const updateLastDiscussionView = () => {
        updateDoc(doc(projectFirestore, "users", this.current_user.id), {
          lastDiscussionView: Date.now()
        })
      }



      return { unsub, updateLastDiscussionView }



    },
    setLinkComment(id) {


      const watchQuery = query(collection(projectFirestore, "comments"), where(documentId(), "==", id));


      const { unsub } = getCollection(watchQuery, this.linkComment)


      return unsub



    },





    setStats() {
      const setSentimentCount = onSnapshot(query(collection(projectFirestore, "users"), where("name", "==", this.current_user.name)), (snap) => {
        this.stats.sentimentCount = snap.docs[0].data().sentimentCount
      });



      const unlabeledComments = onSnapshot(doc(projectFirestore, "stats", "stats"), (snap) => {
        this.stats.unlabeledComments = snap.data().unlabeledComments;
      });

      const lastDiscussionView = onSnapshot(query(collection(projectFirestore, "users"), where("name", "==", this.current_user.name)), (snap) => {
        this.stats.lastDiscussionView = snap.docs[0].data().lastDiscussionView;
      });

      const unreadPostsAvailable = onSnapshot(query(collection(projectFirestore, "users"), where("name", "!=", this.current_user.name)), (snap) => {
        this.stats.unreadPostsAvailable = false
        snap.docs.forEach(doc => {
          
          if (doc.data().latestDiscussionPost > this.stats.lastDiscussionView) {
            this.stats.unreadPostsAvailable = true;
          }
        });
      })
        




      return () => { setSentimentCount(); unlabeledComments(); lastDiscussionView(); unreadPostsAvailable()}

    },
    async addSentiment(comment, sentiment) {
      let conflict = false;

      for (const user of this.users.filter((u) => u.name !== this.current_user.name)) {
        if (comment[user.name] != -2 && comment[user.name] != sentiment) {
          conflict = true;
        }
      }

      try {

        await updateDoc(doc(projectFirestore, "comments", comment.id), {
          [this.current_user.name]: sentiment
          ,
          labeled: true,
          conflict: conflict,
          updated: timestamp()
        })

        if (comment[this.current_user.name] == -2) {
          updateDoc(doc(projectFirestore, "users", this.current_user.id), {
            sentimentCount: increment(1)
          })
        }
        if (!comment.labeled) {
          updateDoc(doc(projectFirestore, "stats", "stats"), {
            unlabeledComments: increment(-1)
          })
        }

      } catch (error) {
        console.log(error.message);

      }





    },

    addUserDiscussion(comment, body) {

      const now = Date.now();

      const userComment = {
        user: this.current_user.name,
        body: body,
        created: now
      }

      if (comment.discussions) {
        comment.discussions.push(userComment)
      } else {
        comment.discussions = [userComment]
      }



      updateDoc(doc(projectFirestore, "comments", comment.id), {
        discussions: comment.discussions,
        updated: timestamp(),
        latestDiscussion: userComment.created,
        discussionResolved: false
      })

      updateDoc(doc(projectFirestore, "users", this.current_user.id), {
        latestDiscussionPost: userComment.created,
    
      })





    },

    removeUserDiscussion(comment, discussionTimestamp) {
      comment.discussions = comment.discussions.filter((discussion) => discussion.created != discussionTimestamp);

      updateDoc(doc(projectFirestore, "comments", comment.id), {
        discussions: comment.discussions,
        updated: timestamp(),
        latestDiscussion: comment.discussions.length > 0 ? comment.discussions[comment.discussions.length - 1].created : 0
      })

    },
    changeDiscussionStatus(comment) {
      let newDiscussionStatus = comment.discussionResolved ? false : true;

      updateDoc(doc(projectFirestore, "comments", comment.id), {
        discussionResolved: newDiscussionStatus,
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





      addDoc(collection(projectFirestore, "comments"), {
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

    async removeComment(comment) {
      try {
        await projectFirestore.collection("comments").doc(comment.id).delete()
        for (const user of this.users) {
          if (comment[user.name] != -2) {
            updateDoc(doc(projectFirestore, "users", user.id), {
              sentimentCount: increment(-1)
            })
          }
        }
        if (comment.labeled === false) {
          updateDoc(doc(projectFirestore, "stats", "stats"), {
            unlabeledComments: increment(-1)
          })

        }

      } catch (error) {
        console.error(error.message)
      }

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


  },
})
