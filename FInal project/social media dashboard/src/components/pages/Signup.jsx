import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import redditHeader from "../../assets/images/reddit-header-josh.jpg";

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

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Theme toggle logic
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        if (password.length < 6) {
            alert('Password should be at least 6 characters long!');
            return;
        }
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Account created successfully!');
            navigate('/');
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="  d-flex align-items-center justify-content-center bg-light mt-auto min-vh-100">
            <div className="row justify-content-center ">
                <div className=" d-flex justify-content-center align-items-center">
                    <div className="card shadow-lg w-100 border-0 mx-auto  my-5" >
                        <div className="card-header p-0 position-relative" style={{ borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem', overflow: 'hidden' }}>
                            <div className="image-container" style={{ height: '200px', overflow: 'hidden' }}>
                                <img 
                                    src={redditHeader}
                                    alt="Login Header"
                                    className="w-100 h-100 object-fit-cover"
                                />
                            </div>
                            <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0, 0, 0, 0.6)', top: 0 }}>
                                <h2 className="text-white mb-0 fw-bold" style={{ fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Sign Up</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 ">
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                placeholder="Enter first name"
                                                value={firstName}
                                                onChange={e => setFirstName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                placeholder="Enter last name"
                                                value={lastName}
                                                onChange={e => setLastName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fas fa-lock"></i></span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Create a password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fas fa-lock"></i></span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            placeholder="Confirm your password"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                        {loading ? 'Creating Account...' : 'Create Account'}
                                    </button>
                                </div>
                                <div className="text-center mt-3">
                                    <p className="mb-0">
                                        Already have an account?{' '}
                                        <Link to="/" className="text-decoration-none">Sign In</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup; 