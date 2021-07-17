import { defineStore } from 'pinia'
import { projectFirestore, timestamp, increment } from "../firebase/config";
import getCollection from '../composables/getCollection'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    commentsWithoutSentiment: [],
    commentsWithSentiment: [],
    allComments: [],
    commentsWithDiscussions: [],
    commentsWithConflicts: [],
    current_user: null,
    stats: {},
    users: [],
    linkComment: []
  }),
  getters: {

    sortedCommentsWithDiscussions() {
      return this.commentsWithDiscussions.sort(function (a, b) {
        return b.discussions[b.discussions.length - 1].created - a.discussions[a.discussions.length - 1].created
      });

    }

  }
  ,
  actions: {
    setCurrentUser(user) {
      this.current_user = user
      localStorage.setItem('current_user', JSON.stringify(user));
      this.setSentimentCount()

    },
    setCommentsWithoutSentiment(reloadAmount) {

      const watchQuery = projectFirestore.collection("comments").where("labeled", "==", false).orderBy("created").limit(Math.max(5, this.commentsWithoutSentiment.length + reloadAmount));

      const { unsub, executeScrollQuery } = getCollection(watchQuery, this.commentsWithoutSentiment)

      return { unsub, executeScrollQuery: () => { executeScrollQuery(projectFirestore.collection("comments").where("labeled", "==", false).where("created", ">", this.commentsWithoutSentiment[this.commentsWithoutSentiment.length - 1].created).orderBy("created").limit(5)) } }

    },

    setCommentsWithSentiment(reloadAmount) {

      const watchQuery = projectFirestore.collection("comments").where(this.current_user.name, "==", -2).where("labeled", "==", true).orderBy("created").limit(Math.max(5, this.commentsWithSentiment.length + reloadAmount))

      const { unsub, executeScrollQuery } = getCollection(watchQuery, this.commentsWithSentiment)

      return { unsub, executeScrollQuery: () => { executeScrollQuery(projectFirestore.collection("comments").where(this.current_user.name, "==", -2).where("labeled", "==", true).where("created", ">", this.commentsWithSentiment[this.commentsWithSentiment.length - 1].created).orderBy("created").limit(5)) } }

    },
    setAllComments(reloadAmount) {

      const watchQuery = projectFirestore.collection("comments").orderBy("created").limit(Math.max(5, this.allComments.length+reloadAmount))

      const { unsub, executeScrollQuery } = getCollection(watchQuery, this.allComments)

      return { unsub, executeScrollQuery: () => { executeScrollQuery(projectFirestore.collection("comments").where("created", ">", this.allComments[this.allComments.length - 1].created).orderBy("created").limit(5)) } }

    },
    setCommentsWithConflicts(reloadAmount) {
      const watchQuery = projectFirestore.collection("comments").where("conflict", "==", true).orderBy("created").limit(Math.max(5, this.commentsWithConflicts.length + reloadAmount))

      const { unsub, executeScrollQuery } = getCollection(watchQuery, this.commentsWithConflicts)

      return { unsub, executeScrollQuery: () => { executeScrollQuery(projectFirestore.collection("comments").where("conflict", "==", true).where("created", ">", this.commentsWithConflicts[this.commentsWithConflicts.length - 1].created).orderBy("created").limit(5)) } }


    },

    setCommentsWithDiscussions() {

      const watchQuery = projectFirestore.collection("comments").where("discussions", "!=", []).orderBy("discussions").orderBy("created")


      const { unsub } = getCollection(watchQuery, this.commentsWithDiscussions)


      return unsub



    },
    setLinkComment(id) {

      const watchQuery = projectFirestore.collection("comments").doc(id)


      const { unsub } = getCollection(watchQuery, this.linkComment)


      return unsub



    },
    addUserDiscussion(comment, body) {

      const userComment = {
        user: this.current_user.name,
        body: body,
        created: Date.now()
      }

      if (comment.discussions) {
        comment.discussions.push(userComment)
      } else {
        comment.discussions = [userComment]
      }


      projectFirestore.collection("comments").doc(comment.id).update({
        discussions: comment.discussions,
        updated: timestamp()

      })

    },


    setSentimentCount() {

      const setSentimentCount = projectFirestore.collection("users").where("name", "==", this.current_user.name).onSnapshot((snap) => {
        this.stats.sentimentCount = snap.docs[0].data().sentimentCount
      });

      const unlabeledComments = projectFirestore.collection("stats").doc("stats").onSnapshot((snap) => {
        this.stats.unlabeledComments = snap.data().unlabeledComments;
      });

      return () => { setSentimentCount(); unlabeledComments();}

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
        if (!comment.labeled ) {
          projectFirestore.collection("stats").doc("stats").update({
            unlabeledComments: increment(-1)
          })
        }

      } catch (error) {
        console.log(error.message);

      }





    },

    removeUserDiscussion(comment, timestamp) {
      comment.discussions = comment.discussions.filter((discussion) => discussion.created != timestamp);
      projectFirestore.collection("comments").doc(comment.id).update({
        discussions: comment.discussions
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
