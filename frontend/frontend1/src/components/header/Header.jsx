import React, {useState, useEffect} from 'react';
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Header() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    
    useEffect(() => {
        checkAuth();
        
        
        window.addEventListener('storage', checkAuth);
        
        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem('access_token');
        const userStr = localStorage.getItem('user');
        
        if (token && userStr) {
            setIsLoggedIn(true);
            try {
                setUser(JSON.parse(userStr));
            } catch (error) {
                console.error('Ошибка при парсинге данных пользователя:', error);
            }
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        navigate('/');
        window.location.reload(); 
    };

    return (
        <div>
            <div className="header">
                <Link to="/"> 
                    <img src="/img/logo.png" alt="Logo"/>
                </Link>

                 <nav className="header-nav">
                        <Link to="/about" className="text-link-nav link"> О нас </Link>
                        <Link to="/menu" className="text-link-nav link"> Меню </Link>
                          {isLoggedIn ? (
                        <div className="user-menu">
                            <Link to="/account" className="text-link-nav link account-link">
                                {user?.nickname || 'Аккаунт'}
                            </Link>
                        </div>
                    ) : (
                        <Link to="/login" className="text-link-nav link">Аккаунт</Link>
                    )}
                </nav>
            </div>
        </div>
    )
}

