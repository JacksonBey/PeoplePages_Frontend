import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
      apiKey: "AIzaSyCL5XpHAD0fG6cqRLSwSNoSv4nQQ1XhmLY",
      authDomain: "peoplepages-31370.firebaseapp.com",
      databaseURL: "https://peoplepages-31370.firebaseio.com",
      projectId: "peoplepages-31370",
      storageBucket: "peoplepages-31370.appspot.com",
      messagingSenderId: "1026661234500",
      appId: "1:1026661234500:web:a8548eaa70ae3f41a38911",
      measurementId: "G-M02S8YXKBX"
    };


firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export {storage, firebase as default}