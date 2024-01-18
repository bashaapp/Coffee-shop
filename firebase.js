// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCD8rB9GcrjSyqUluPpp01cl10swr217yc",
  authDomain: "coffee-shop2023.firebaseapp.com",
  projectId: "coffee-shop2023",
  storageBucket: "coffee-shop2023.appspot.com",
  messagingSenderId: "655801008034",
  appId: "1:655801008034:web:b378d4e79748ab6d17bcfb"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

//export { app, auth, getApp, getAuth };


export default app;
