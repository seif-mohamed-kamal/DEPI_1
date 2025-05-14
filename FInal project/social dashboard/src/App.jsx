import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/pages/dashboard';
import Navbar from './components/shared/navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/pages/Login';
import Signup from './components/pages/SignUp';
import ForgetPassword from './components/pages/ForgetPassword';
import  Contact  from './components/pages/contact';
function App() {
  const [userData, setUserData] = useState(null);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  return (
    <div className="position-relative min-vh-100">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/dashboard" element={
          <>
            <Navbar onCollapse={setIsNavCollapsed} isCollapsed={isNavCollapsed} />
            <main className="main-content" style={{ 
              marginLeft: isNavCollapsed ? '60px' : '150px',
              transition: 'margin-left 0.3s ease-in-out',
              padding: '20px'
            }}>
              <Dashboard />
            </main>
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar onCollapse={setIsNavCollapsed} isCollapsed={isNavCollapsed} />
            <main className="main-content" style={{ 
              marginLeft: isNavCollapsed ? '60px' : '150px',
              transition: 'margin-left 0.3s ease-in-out',
              padding: '20px'
            }}>
              <Contact  />
            </main>
          </>

        } />

      </Routes>
    </div>
  );
}

export default App; 