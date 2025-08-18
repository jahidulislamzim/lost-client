import React, { createContext, useEffect, useState } from 'react';
import {
    getAuth,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { app } from '../firebase.js';
import axios from 'axios';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Authprovider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [saveUser, setSaveUser] = useState(null);

    const createUser = (email, password, name, photo) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                return updateProfile(userCredential.user, {
                    displayName: name,
                    photoURL: photo,
                }).then(() => console.log(userCredential)
                );
            })
            .catch((error) => {
                throw error;
            });
    };

    const loginUser = (email, password) => {
        setLoading(true);
            return signInWithEmailAndPassword(auth, email, password);
    };

    const googleAuth = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const signOutUser = () => {
        return signOut(auth)
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            console.log('CurrentUser-->', currentUser?.email)
            // if (currentUser?.email) {
                setSaveUser(currentUser)

                // Get JWT token
            //     await axios.post(
            //         `https://lost-and-found-full-stack-uuaz.vercel.app/jwt`,
            //         {
            //             email: currentUser?.email,
            //         },
            //         { withCredentials: true }
            //     )
            // } else {
            //     setSaveUser(currentUser)
            //     await axios.get(`https://lost-and-found-full-stack-uuaz.vercel.app/logout`, {
            //         withCredentials: true,
            //     })
            // }
            setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    }, [])

    const userInfo = {
        googleAuth,
        saveUser,
        signOutUser,
        loading,
        setLoading,
        createUser,
        loginUser
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;