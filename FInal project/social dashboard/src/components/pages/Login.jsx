import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Logged in user:", user.email);
            navigate('/dashboard');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                    <div className="card shadow-lg border-0">
                        <div className="card-header p-0 position-relative" style={{ borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem', overflow: 'hidden' }}>
                            <div className="image-container" style={{ height: '200px', overflow: 'hidden' }}>
                                <img 
                                    src={redditHeader}
                                    alt="Login Header"
                                    className="w-100 h-100 object-fit-cover"
                                />
                            </div>
                            <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center" 
                                style={{ background: 'rgba(0, 0, 0, 0.6)', top: 0 }}>
                                <h2 className="text-white mb-0 fw-bold" 
                                    style={{ fontSize: '2rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                                    Sign In
                                </h2>
                            </div>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
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
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="rememberMe"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="rememberMe">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link to="/forget-password" className="text-decoration-none small">Forgot Password?</Link>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Login
                                    </button>
                                    <p className="text-center mt-3 mb-0">
                                        Don't have an account?{' '}
                                        <Link to="/signup" className="text-decoration-none">Sign Up</Link>
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

export default Login;