import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { Link } from 'react-router-dom';
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

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError('Please enter your email address');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await sendPasswordResetEmail(auth, email, {
                url: window.location.origin + '/',
                handleCodeInApp: false
            });
            setSuccess(true);
        } catch (error) {
            let errorMessage = 'An error occurred while sending the reset email. ';
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Please enter a valid email address.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'No account found with this email address.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many attempts. Please try again later.';
                    break;
                default:
                    errorMessage += error.message;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center min-vh-100 align-items-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                    <div className="card shadow-lg">
                        <div className="card-header p-0 position-relative">
                            <div className="image-container" style={{ height: '250px', overflow: 'hidden' }}>
                                <img src={redditHeader} alt="Login Header" className="w-100 h-100 object-fit-cover" />
                            </div>
                            <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0, 0, 0, 0.6)', top: 0 }}>
                                <h2 className="text-white mb-0 fw-bold" style={{ fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Reset Password</h2>
                            </div>
                        </div>
                        <div className="card-body p-4">
                            {!success ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
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
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Sending...
                                                </>
                                            ) : (
                                                'Send Reset Link'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="text-center py-4">
                                    <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
                                    <h3 className="mt-3 mb-2">Check Your Email</h3>
                                    <p className="text-muted mb-4">We've sent a password reset link to {email}</p>
                                    <p className="text-muted small">If you don't see the email, please check your spam folder.</p>
                                    <Link to="/" className="btn btn-primary">Return to Login</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword; 