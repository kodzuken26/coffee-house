import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './user.scss';
import axios from "axios";

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",  
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Отправляемые данные для входа:", formData);
    
        if (isLoading) return;
        setIsLoading(true);
        setError(null);

    try {
        const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);
        console.log("Успешный вход!", response.data);
        setSuccessMessage("Вы успешно вошли в аккаунт!");
        
        
        localStorage.setItem('access_token', response.data.tokens.access);
        localStorage.setItem('refresh_token', response.data.tokens.refresh);
        
        
        localStorage.setItem('user', JSON.stringify({
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            nickname: response.data.nickname,
            phone: response.data.phone,
            gender: response.data.gender,
            role: response.data.role,
        }));
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.tokens.access}`;
        
        setTimeout(() => {
            navigate('/account'); 
        }, 1500);
        
        } catch (error) {
            console.log("Ошибка при входе!", error.response?.data || error.message);
            if (error.response && error.response.data) {
                
                const errorData = error.response.data;
                
                
                if (typeof errorData === 'string') {
                    setError(errorData);
                }
                
                else if (typeof errorData === 'object') {
                    
                    const firstErrorKey = Object.keys(errorData)[0];
                    const firstErrorMessage = errorData[firstErrorKey];
                    
                    if (Array.isArray(firstErrorMessage)) {
                        setError(`${firstErrorKey}: ${firstErrorMessage[0]}`);
                    } else {
                        setError(`${firstErrorKey}: ${firstErrorMessage}`);
                    }
                }
            } else if (error.request) {
                setError("Не удалось подключиться к серверу. Проверьте подключение к интернету.");
            } else {
                setError("Произошла ошибка. Попробуйте позже.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    

    return (
        <div className="login-container">
            <h1>Вход в аккаунт</h1>
            
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            
            <form className="form-board" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Логин *</label> <br />
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        placeholder="Введите ваш логин"
                    />
                </div>
                <br />
                <div className="form-group">
                    <label>Пароль *</label> <br />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="8"
                        placeholder="Введите ваш пароль"
                    />
                </div>
                <br />
                
                <button type="submit" disabled={isLoading} className="submit-btn">
                    {isLoading ? 'Вход...' : 'Войти'}
                </button>
            </form>

            <p className="register-link">
                Нет аккаунта? <Link to="/registration">Зарегистрируйтесь</Link>
            </p>
        </div>
    );
}