import { defineStore } from 'pinia'
import { projectFirestore, timestamp, increment, documentId } from "../firebase/config";
import getCollection from '../composables/getCollection'

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

      const watchQuery = projectFirestore.collection("comments").where("labeled", "==", false).orderBy("created").limit(Math.max(8, this.commentsWithoutSentiment.size+ reloadAmount));

      const { unsub } = getCollection(watchQuery, this.commentsWithoutSentiment)

      return { unsub }

    },

    setCommentsWithSentiment(reloadAmount) {

      const watchQuery = projectFirestore.collection("comments").where(this.current_user.name, "==", -2).where("labeled", "==", true).orderBy("created").limit(Math.max(8, this.commentsWithSentiment.size + reloadAmount));

      const { unsub } = getCollection(watchQuery, this.commentsWithSentiment)

      return { unsub }

    },
    setAllComments(reloadAmount) {
   

      const watchQuery = projectFirestore.collection("comments").orderBy("created").limit(Math.max(8, this.allComments.size + reloadAmount));

      

      const { unsub } = getCollection(watchQuery, this.allComments)

      return { unsub }

    },
    setCommentsWithConflicts(reloadAmount) {
      const watchQuery = projectFirestore.collection("comments").where("conflict", "==", true).orderBy("created").limit(Math.max(8, this.commentsWithConflicts.size + reloadAmount));

      const { unsub } = getCollection(watchQuery, this.commentsWithConflicts)

      return { unsub }


    },

    setCommentsWithDiscussions() {

      const watchQuery = projectFirestore.collection("comments").where("discussionResolved", "==", false).where("latestDiscussion", ">", 0)


      const { unsub } = getCollection(watchQuery, this.commentsWithDiscussions)

      const updateLastDiscussionView = () => {
        projectFirestore.collection("users").doc(this.current_user.id).update({
          lastDiscussionView: Date.now()
        })
      }



      return { unsub, updateLastDiscussionView }



    },
    setLinkComment(id) {

      const watchQuery = projectFirestore.collection("comments").where(documentId(), "==", id)


      const { unsub } = getCollection(watchQuery, this.linkComment)


      return unsub



    },
    




    setStats() {

      const setSentimentCount = projectFirestore.collection("users").where("name", "==", this.current_user.name).onSnapshot((snap) => {
        this.stats.sentimentCount = snap.docs[0].data().sentimentCount
      });

      const unlabeledComments = projectFirestore.collection("stats").doc("stats").onSnapshot((snap) => {
        this.stats.unlabeledComments = snap.data().unlabeledComments;
      });

      const lastDiscussionView = projectFirestore.collection("users").where("name", "==", this.current_user.name).onSnapshot((snap) => {
        this.stats.lastDiscussionView = snap.docs[0].data().lastDiscussionView;

      })



      return () => { setSentimentCount(); unlabeledComments(); lastDiscussionView(); }

    },
    async addSentiment(comment, sentiment) {
      let conflict = false;

      for (const user of this.users.filter((u) => u.name !== this.current_user.name)) {
        if (comment[user.name] != -2 && comment[user.name] != sentiment) {
          conflict = true;
        }
      }

      try {
        await projectFirestore.collection("comments").doc(comment.id).update({
          [this.current_user.name]: sentiment
          ,
          labeled: true,
          conflict: conflict,
          updated: timestamp()
        })
        if (comment[this.current_user.name] == -2) {
          projectFirestore.collection("users").doc(this.current_user.id).update({
            sentimentCount: increment(1)
          })
        }
        if (!comment.labeled) {
          projectFirestore.collection("stats").doc("stats").update({
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


      projectFirestore.collection("comments").doc(comment.id).update({
        discussions: comment.discussions,
        updated: timestamp(),
        latestDiscussion: userComment.created,
        discussionResolved: false

      })


    },

    removeUserDiscussion(comment, discussionTimestamp) {
      comment.discussions = comment.discussions.filter((discussion) => discussion.created != discussionTimestamp);
      projectFirestore.collection("comments").doc(comment.id).update({
        discussions: comment.discussions,
        updated: timestamp(),
        latestDiscussion: comment.discussions.length > 0 ? comment.discussions[comment.discussions.length-1].created : 0
      })

    },
    changeDiscussionStatus(comment) {
      let newDiscussionStatus = comment.discussionResolved ? false : true;
      projectFirestore.collection("comments").doc(comment.id).update({
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




      projectFirestore.collection("comments").add({
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
            projectFirestore.collection("users").doc(user.id).update({
              sentimentCount: increment(-1)
            })
          }
        }
        if (comment.labeled === false) {
          projectFirestore.collection("stats").doc("stats").update({
            unlabeledComments: increment(-1)
          })
        }

      } catch (error) {
        console.error(error.message)
      }

    },
    setUsers() {

      projectFirestore.collection("users").get().then((snap) => {
        snap.docs.forEach((doc) => {
          this.users.push({ ...doc.data(), id: doc.id })
        })
      })


    },


  },
})
