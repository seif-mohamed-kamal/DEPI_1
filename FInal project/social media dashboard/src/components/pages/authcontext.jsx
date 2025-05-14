import React, { useContext, useState, useEffect, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const AuthContext = createContext();

const firebaseConfig = {
    apiKey: "AIzaSyD2gYbl1MP6-qcwT7kW_WRhXeQB3Er_qRs",
    authDomain: "depi-login.firebaseapp.com",
    projectId: "depi-login",
    storageBucket: "depi-login.firebasestorage.app",
    messagingSenderId: "172933699874",
    appId: "1:172933699874:web:c560f85e50bda901996d7b",
    measurementId: "G-R099WVR4N5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();


export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    }); 

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;