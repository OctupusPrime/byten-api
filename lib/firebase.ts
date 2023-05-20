import { initializeApp } from "https://cdn.skypack.dev/firebase@9.22.0/app";
import { getFirestore } from "https://cdn.skypack.dev/firebase@9.22.0/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBpH4O-0_k-uj12LGo3T433xMUwuBowPRg",
  authDomain: "byten-8d3c3.firebaseapp.com",
  projectId: "byten-8d3c3",
  storageBucket: "byten-8d3c3.appspot.com",
  messagingSenderId: "342456981981",
  appId: "1:342456981981:web:f1c698c76ad49da0e77e34",
};

const app = initializeApp(firebaseConfig, "api");

const db = getFirestore(app);

export { db };
