import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Config data exposed but db has security measures implemented
// Only signed up users can read/write specific data
const firebaseConfig = {
  apiKey: "AIzaSyDXgQYUOWagxWuZsNh4XXGdHLAlnnIiiVE",
  authDomain: "flashcard-ts-app.firebaseapp.com",
  projectId: "flashcard-ts-app",
  storageBucket: "flashcard-ts-app.appspot.com",
  messagingSenderId: "592498049253",
  appId: "1:592498049253:web:04be34a1e735517a6f140c",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
