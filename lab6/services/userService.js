import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export async function getCurrentUserProfile(uid) {
    const userRef = doc(db, 'users', uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        return null;
    }

    return snapshot.data();
}

export async function saveCurrentUserProfile(uid, profileData) {
    const userRef = doc(db, 'users', uid);

    await setDoc(
        userRef,
        {
            uid,
            ...profileData,
            updatedAt: serverTimestamp(),
        },
        { merge: true }
    );
}

export async function deleteCurrentUserProfile(uid) {
    const userRef = doc(db, 'users', uid);
    await deleteDoc(userRef);
}