import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authcontext';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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


const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;