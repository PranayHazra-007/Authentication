import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAl3O4XZsFh1MQRLiR_-84GQCWCCCbyOBo",
  authDomain: "profile-app-chat.firebaseapp.com",
  projectId: "profile-app-chat",
  storageBucket: "profile-app-chat.firebasestorage.app",
  messagingSenderId: "722102601375",
  appId: "1:722102601375:web:8dfea64ad8c6d50d6984aa",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider =
  new GoogleAuthProvider();

export const db =
  getFirestore(app);

export default app;