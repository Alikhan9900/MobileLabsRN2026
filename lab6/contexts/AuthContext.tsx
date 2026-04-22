import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';
import {
    deleteDoc,
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';

type ProfileData = {
    uid: string;
    email: string | null;
    name: string;
    age: string;
    city: string;
    createdAt?: unknown;
    updatedAt?: unknown;
};

type SaveProfileInput = {
    name: string;
    age: string;
    city: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    register: (email: string, password: string) => Promise<User>;
    login: (email: string, password: string) => Promise<User>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    getProfile: () => Promise<ProfileData | null>;
    saveProfile: (data: SaveProfileInput) => Promise<void>;
    removeAccount: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const register = async (email: string, password: string): Promise<User> => {
        const result = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, 'users', result.user.uid), {
            uid: result.user.uid,
            email: result.user.email,
            name: '',
            age: '',
            city: '',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        return result.user;
    };

    const login = async (email: string, password: string): Promise<User> => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    };

    const logout = async (): Promise<void> => {
        await signOut(auth);
    };

    const resetPassword = async (email: string): Promise<void> => {
        await sendPasswordResetEmail(auth, email);
    };

    const getProfile = async (): Promise<ProfileData | null> => {
        if (!auth.currentUser) return null;

        const ref = doc(db, 'users', auth.currentUser.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) return null;

        return snap.data() as ProfileData;
    };

    const saveProfile = async ({ name, age, city }: SaveProfileInput): Promise<void> => {
        if (!auth.currentUser) {
            throw new Error('Користувач не авторизований');
        }

        const ref = doc(db, 'users', auth.currentUser.uid);

        await updateDoc(ref, {
            name,
            age,
            city,
            updatedAt: serverTimestamp(),
        });
    };

    const removeAccount = async (email: string, password: string): Promise<void> => {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            throw new Error('Користувач не авторизований');
        }

        const credential = EmailAuthProvider.credential(email, password);

        await reauthenticateWithCredential(currentUser, credential);
        await deleteDoc(doc(db, 'users', currentUser.uid));
        await deleteUser(currentUser);
    };

    const value = useMemo<AuthContextType>(
        () => ({
            user,
            loading,
            register,
            login,
            logout,
            resetPassword,
            getProfile,
            saveProfile,
            removeAccount,
        }),
        [user, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
}