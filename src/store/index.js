import { defineStore } from 'pinia'
import { projectFirestore } from "../firebase/config";

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    postsWithoutSentiment: [],
    postsWithSentiment: [],
    allPosts: [],
    user: null,
    sentimentCount: 0,
    users:[]
  }),
  getters: {

  }
  ,
  actions: {
    setUser(user) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user));
      this.setSentimentCount()

    },
    setPostsWithoutSentiment() {

      projectFirestore.collection("posts").where(this.user.name, "==", -1).where("labeled","==",false).onSnapshot((snap) => {
        this.postsWithoutSentiment = snap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });


    },

    setPostsWithSentiment() {

      projectFirestore.collection("posts").where(this.user.name, "==", -1).where("labeled", "==", true).onSnapshot((snap) => {
        this.postsWithSentiment = snap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });


    },
    setAllPosts() {

      projectFirestore.collection("posts").onSnapshot((snap) => {
        this.allPosts = snap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });


    },

    setSentimentCount() {
      projectFirestore.collection("posts").where(this.user.name, "!=", -1).onSnapshot((snap) => {
        this.sentimentCount = snap.docs.length
      });

    },
     addSentiment(postId, sentiment) {

       projectFirestore.collection("posts").doc(postId).update({
        [this.user.name]: sentiment
        ,
        labeled: true
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

      console.log(randomComment)
      

      projectFirestore.collection("posts").add({
        threadTitle: randomTitle,
        content: randomComment,
        labeled: false,
        link: "https://www.google.com",
        yanikovic: -1,
        starkus: -1

      })
      
     
      
     },

    removePost(postId) {
      projectFirestore.collection("posts").doc(postId).delete()
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
