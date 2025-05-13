import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Navbar({ onCollapse }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        onCollapse(newState);
    };

    return (
        <>
            <div 
                className="sidebar bg-dark text-white" 
                style={{ 
                    width: isCollapsed ? '60px' : '150px',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    transition: 'width 0.3s ease-in-out',
                    zIndex: 1000, // make sure it's above main content
                    overflowX: 'hidden'
                }}>
                <button 
                    className="btn btn-link text-white " 
                    onClick={toggleCollapse}
                    style={{ minWidth: '30px' }}
                >
                    <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
                </button>
                <div className=" mb-4 px-2">
                    <div className="d-flex align-items-center" style={{ minWidth: isCollapsed ? '40px' : 'auto' }}>
                        {!isCollapsed && <span className="fs-5 fw-bold">Fares mohamed</span>}
                    </div>
                </div>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link 
                            className="nav-link text-white d-flex align-items-center" 
                            to="/dashboard"
                            title={isCollapsed ? "Dashboard" : ""}
                        >
                            <i className="bi bi-speedometer2 me-2"></i>
                            {!isCollapsed && "Dashboard"}
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link 
                            className="nav-link text-white d-flex align-items-center" 
                            to="/home"
                            title={isCollapsed ? "Add post" : ""}
                        >
                            <i className="bi bi-person me-2"></i>
                            {!isCollapsed && "Add post"}
                        </Link>
                        
                    </li>
                    <li className="nav-item mb-2">
                        <Link 
                            className="nav-link text-white d-flex align-items-center" 
                            to="/contact"
                            title={isCollapsed ? "contact us" : ""}
                        >
                            <i className="bi bi-person me-2"></i>
                            {!isCollapsed && "contact us"}
                        </Link>
                        </li>
                </ul>
            </div>
        </>
    );
}

export default Navbar;