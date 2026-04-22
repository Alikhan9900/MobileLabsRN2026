import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBadhzaqSwRzBWw1Pw4ZnZi5gwjg60jkAw",
    authDomain: "lab6-b5e21.firebaseapp.com",
    projectId: "lab6-b5e21",
    storageBucket: "lab6-b5e21.firebasestorage.app",
    messagingSenderId: "115912642498",
    appId: "1:115912642498:web:beecaa00f7b4123ecc105b",
    measurementId: "G-H6R2F8QLVY"
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);