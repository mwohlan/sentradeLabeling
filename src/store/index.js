import { defineStore } from 'pinia'
import { projectFirestore, timestamp } from "../firebase/config";

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    commentsWithoutSentiment: [],
    commentsWithSentiment: [],
    allComments: [],
    commentsWithDiscussions: [],
    commentsWithConflicts: [],
    current_user: null,
    sentimentCount: 0,
    users: []
  }),
  getters: {

  }
  ,
  actions: {
    setCurrentUser(user) {
      this.current_user = user
      localStorage.setItem('current_user', JSON.stringify(user));
      this.setSentimentCount()

    },
    setCommentsWithoutSentiment() {

      projectFirestore.collection("comments").where(this.current_user.name, "==", -2).where("labeled", "==", false).onSnapshot((snap) => {
        this.commentsWithoutSentiment = snap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });


    },

    setCommentsWithSentiment() {

      projectFirestore.collection("comments").where(this.current_user.name, "==", -2).where("labeled", "==", true).onSnapshot((snap) => {
        this.commentsWithSentiment = snap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });


    },
    setAllComments() {

      projectFirestore.collection("comments").onSnapshot((snap) => {
        this.allComments = snap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });


    },
    addUserDiscussion(comment, body) {

      const userComment = {
        user: this.current_user.name,
        body: body,
        created: Date.now()
      }

      if (comment.discussions) {
        console.log(comment.discussions)
        comment.discussions.push(userComment)
      } else {
        comment.discussions = [userComment]
      }


      projectFirestore.collection("comments").doc(comment.id).update({
        discussions: comment.discussions

      })

    },
    setCommentsWithConflicts() {
      projectFirestore.collection("comments").where("conflict", "==", true).onSnapshot((snap) => {
        this.commentsWithConflicts = snap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });


    },

    setCommentsWithDiscussions() {

      projectFirestore.collection("comments").where("discussions", "!=", []).onSnapshot((snap) => {
        this.commentsWithDiscussions = snap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });


    },

    setSentimentCount() {
      projectFirestore.collection("comments").where(this.current_user.name, "!=", -2).onSnapshot((snap) => {
        this.sentimentCount = snap.docs.length
      });

    },
    addSentiment(comment, sentiment) {
      let conflict = false;

      for (const user of this.users.filter((u) => u.name !== this.current_user.name)) {
        if (comment[user.name] != -2 && comment[user.name] != sentiment) {
          conflict = true;
        }
      }

      projectFirestore.collection("comments").doc(comment.id).update({
        [this.current_user.name]: sentiment
        ,
        labeled: true,
        conflict: conflict
      })


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

    removeComment(commentId) {
      projectFirestore.collection("comments").doc(commentId).delete()
    },
    setUsers() {

      projectFirestore.collection("users").onSnapshot((snap) => {
        snap.docs.forEach((doc) => {
          this.users.push({ ...doc.data() })
        })
      })


    },
  },
})
