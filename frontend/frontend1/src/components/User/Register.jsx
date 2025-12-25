import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './user.scss';
import axios from "axios";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",        
        email: "",
        password: "",
        password2: "",       
        first_name: "",      
        last_name: "",       
        patronymic: "",      
        nickname: "",        
        phone: "",           
        gender: "none-gender", 
        privacyPolicy: false,  
        personalData: false,   
    });

    
    const formatPhoneNumber = (value) => {
        let phone = value.replace(/\D/g, '');
        
        if (phone.length > 0) {
            if (phone[0] !== '8' && phone[0] !== '7') {
                phone = '8' + phone;
            }
            phone = phone.substring(0, 11);
            
            let formatted = phone[0] || '8';
            if (phone.length > 1) formatted += '(' + phone.substring(1, 4);
            if (phone.length > 4) formatted += ')' + phone.substring(4, 7);
            if (phone.length > 7) formatted += '-' + phone.substring(7, 9);
            if (phone.length > 9) formatted += '-' + phone.substring(9, 11);
            
            return formatted;
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name === 'phone') {
            
            setFormData({
                ...formData,
                [name]: formatPhoneNumber(value),
            });
        } else if (type === 'checkbox') {
            
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else {
            
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Отправляемые данные:", formData);
        
        if (isLoading) return;
        
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("email: Введите корректный email адрес");
            return;
        }
        
        
        if (!formData.privacyPolicy) {
            setError("Вы должны согласиться с Политикой конфиденциальности");
            return;
        }
        
        if (!formData.personalData) {
            setError("Вы должны дать согласие на обработку персональных данных");
            return;
        }
        
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register/", formData);
            console.log("Success!", response.data);
            setSuccessMessage("Регистрация успешна! Вы будете перенаправлены...");
            
            
            if (response.data.tokens) {
                localStorage.setItem('access_token', response.data.tokens.access);
                localStorage.setItem('refresh_token', response.data.tokens.refresh);
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            
           
           setTimeout(() => {
               navigate('/login');
           }, 2000);
            
        } catch (error) {
            console.log("Error during registration!", error.response?.data);
            if (error.response && error.response.data) {
                
                const firstErrorKey = Object.keys(error.response.data)[0];
                const firstErrorMessage = error.response.data[firstErrorKey];
                if (Array.isArray(firstErrorMessage)) {
                    setError(`${firstErrorKey}: ${firstErrorMessage[0]}`);
                } else {
                    setError(`${firstErrorKey}: ${firstErrorMessage}`);
                }
            } else {
                setError("Ошибка сервера. Попробуйте позже.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h1>Регистрация</h1>
            
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            
            <form onSubmit={handleSubmit}>
                
                <div className="form-group">
                    <label>Имя </label> <br />
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="Введите имя"
                        required
                    />
                </div>
                <br /> 
                
                
                <div className="form-group">
                    <label>Фамилия </label> <br />
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Введите фамилию"
                        required
                    />
                </div>
                <br /> 
                
               
                <div className="form-group">
                    <label>Отчество</label> <br />
                    <input
                        type="text"
                        name="patronymic"
                        value={formData.patronymic}
                        onChange={handleChange}
                        placeholder="Введите отчество"
                    />
                </div>
                <br /> 
                
                
                <div className="form-group">
                    <label>Логин </label> <br />
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Введите логин"
                        required
                    />
                </div>
                <br /> 
                
                
                <div className="form-group">
                    <label>Никнейм </label> <br />
                    <input
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        placeholder="Введите никнейм"
                        required
                    />
                </div>
                <br /> 
                
                
                <div className="form-group">
                    <label>Эл. почта </label> <br />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Введите эл.почту"
                        required
                    />
                </div>
                <br /> 
                
                
                <div className="form-group">
                    <label>Телефон </label> <br />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Введите номер телефона"
                        pattern="8\(\d{3}\)\d{3}-\d{2}-\d{2}"
                    />
                </div>
                <br /> 
                
                
                <div className="form-group">
                    <label>Пол </label> <br />
                    <div className="radio-group">
                        <label className="radio-input">
                            <input
                                type="radio"
                                name="gender"
                                value="woman"
                                checked={formData.gender === 'woman'}
                                onChange={handleChange}
                            />
                            Женский
                        </label> <br />
                        <label className="radio-input">
                            <input
                                type="radio"
                                name="gender"
                                value="man"
                                checked={formData.gender === 'man'}
                                onChange={handleChange}
                            />
                            Мужской
                        </label> <br />
                        <label className="radio-input">
                            <input
                                type="radio"
                                name="gender"
                                value="none-gender"
                                checked={formData.gender === 'none-gender'}
                                onChange={handleChange}
                            />
                            Не указан
                        </label>
                    </div>
                </div>
                <br /> 
                
                
                <div className="form-group required-checkbox-group">
                    <label className="required-checkbox">
                        <input
                            type="checkbox"
                            name="privacyPolicy"
                            checked={formData.privacyPolicy}
                            onChange={handleChange}
                        />
                        Я соглашаюсь с правилами "Политики конфиденциальности" 
                    </label>
                </div>
                
                <div className="form-group required-checkbox-group">
                    <label className="required-checkbox">
                        <input
                            type="checkbox"
                            name="personalData"
                            checked={formData.personalData}
                            onChange={handleChange}
                        />
                        Я даю согласие на обработку персональных данных 
                    </label>
                </div>
                <br />
                
                
                <div className="form-group">
                    <label>Пароль </label> <br />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Введите пароль"
                        required
                        minLength="8"
                    />
                </div>
                <br /> 
                
                
                <div className="form-group">
                    <label>Подтверждение пароля</label> <br />
                    <input
                        type="password"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                        placeholder="Повторите пароль"
                        required
                    />
                </div>
                <br />
                <br />
                
                <button type="submit" disabled={isLoading} className="submit-btn">
                    {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
            </form>

            <p className="login-link">
                Уже есть аккаунт? <Link to="/login">Войти</Link>
            </p>
        </div>
    );
}