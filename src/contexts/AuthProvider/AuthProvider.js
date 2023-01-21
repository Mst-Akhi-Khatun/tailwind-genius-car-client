import React, { createContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { useEffect } from 'react';

export const AuthContext = createContext();
const auth = getAuth(app);


// const user = {displayName:'akhi'};


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create a user using email and password
    const createUser = (email, password) =>{
       return createUserWithEmailAndPassword(auth, email, password)
    }

    // manage uer
    useEffect( () => {
        const unSubsCribe =  onAuthStateChanged(auth, (currentUser) => {
          setLoading(false)
              console.log('user inside state change', currentUser);
              setUser(currentUser)
              
          });
          return () =>{
              unSubsCribe();
          }
    }, [])
    
    // login using email and password
    const signIn = (email, password) =>{
        setLoading(false)
       return signInWithEmailAndPassword(auth, email, password)
    }

    const authInfo = {user, loading, createUser, signIn}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;