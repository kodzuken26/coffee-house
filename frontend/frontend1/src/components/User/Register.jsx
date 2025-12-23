// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import './user.scss';
// import axios from "axios";

// export default function Register() {
//     const [formData, setFormData] = useState({
//         username: "",        // логин (будет использоваться как username)
//         email: "",
//         password: "",
//         password2: "",       // подтверждение пароля
//         first_name: "",      // имя (отправляется как first_name)
//         last_name: "",       // фамилия (отправляется как last_name)
//         patronymic: "",      // отчество
//         nickname: "",        // никнейм
//         phone: "",           // телефон
//         gender: "none-gender", // пол по умолчанию
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const [isLoading, setIsLoading] = useState(false);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const formatPhoneNumber = (value) => {
//     let phone = value.replace(/\D/g, '');
    
//     if (phone.length > 0) {
//         if (phone[0] !== '8' && phone[0] !== '7') {
//             phone = '8' + phone;
//         }
//         phone = phone.substring(0, 11);
        
//         let formatted = phone[0] || '8';
//         if (phone.length > 1) formatted += '(' + phone.substring(1, 4);
//         if (phone.length > 4) formatted += ')' + phone.substring(4, 7);
//         if (phone.length > 7) formatted += '-' + phone.substring(7, 9);
//         if (phone.length > 9) formatted += '-' + phone.substring(9, 11);
        
//         return formatted;
//     }
//     return '';
// };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Отправляемые данные:", formData);
        
//         if (isLoading) return;
//         setIsLoading(true);
//         setError(null);

//         try {
//             const response = await axios.post("http://127.0.0.1:8000/api/register/", formData);
//             console.log("Success!", response.data);
//             setSuccessMessage("Регистрация успешна! Вы будете перенаправлены...");
            
//             // Сохраняем токены в localStorage
//             if (response.data.tokens) {
//                 localStorage.setItem('access_token', response.data.tokens.access);
//                 localStorage.setItem('refresh_token', response.data.tokens.refresh);
//                 localStorage.setItem('user', JSON.stringify(response.data));
//             }
            
//            // После регистрации перенаправляем на вход
//         setTimeout(() => {
//             navigate('/login'); // Изменено с '/' на '/login'
//         }, 2000);
            
//         } catch (error) {
//             console.log("Error during registration!", error.response?.data);
//             if (error.response && error.response.data) {
//                 // Показываем первую ошибку
//                 const firstErrorKey = Object.keys(error.response.data)[0];
//                 const firstErrorMessage = error.response.data[firstErrorKey];
//                 if (Array.isArray(firstErrorMessage)) {
//                     setError(`${firstErrorKey}: ${firstErrorMessage[0]}`);
//                 } else {
//                     setError(`${firstErrorKey}: ${firstErrorMessage}`);
//                 }
//             } else {
//                 setError("Ошибка сервера. Попробуйте позже.");
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="register-container">
//             <h1>Регистрация</h1>
            
//             {error && <div className="error-message">{error}</div>}
//             {successMessage && <div className="success-message">{successMessage}</div>}
            
//             <form onSubmit={handleSubmit}>
//                 {/* Имя (отправляется как first_name) */}
//                 <div className="form-group">
//                     <label>Имя *</label> <br />
//                     <input
//                         type="text"
//                         name="first_name"
//                         value={formData.first_name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <br />
//                 {/* Фамилия (отправляется как last_name) */}
//                 <div className="form-group">
//                     <label>Фамилия *</label> <br />
//                     <input
//                         type="text"
//                         name="last_name"
//                         value={formData.last_name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <br />
//                 {/* Отчество */}
//                 <div className="form-group">
//                     <label>Отчество</label> <br />
//                     <input
//                         type="text"
//                         name="patronymic"
//                         value={formData.patronymic}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <br />
//                 {/* Имя пользователя (username) */}
//                 <div className="form-group">
//                     <label>Логин *</label> <br />
//                     <input
//                         type="text"
//                         name="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <br />
//                 {/* Никнейм */}
//                 <div className="form-group">
//                     <label>Никнейм *</label> <br />
//                     <input
//                         type="text"
//                         name="nickname"
//                         value={formData.nickname}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <br />
//                 {/* Email */}
//                 <div className="form-group">
//                     <label>Эл. почта *</label> <br />
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <br />
//                 {/* Телефон */}
//                 <div className="form-group">
//                     <label>Телефон *</label> <br />
//                     <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <br />
//                 {/* Пол */}
//                 <div className="form-group">
//                     <label>Пол *</label> <br />
//                     <div className="radio-group">
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="gender"
//                                 value="woman"
//                                 checked={formData.gender === 'woman'}
//                                 onChange={handleChange}
//                             />
//                             Женский
//                         </label> <br />
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="gender"
//                                 value="man"
//                                 checked={formData.gender === 'man'}
//                                 onChange={handleChange}
//                             />
//                             Мужской
//                         </label> <br />
//                         <label>
//                             <input
//                                 className="radio-input"
//                                 type="radio"
//                                 name="gender"
//                                 value="none-gender"
//                                 checked={formData.gender === 'none-gender'}
//                                 onChange={handleChange}
//                             />
//                             Не указан
//                         </label>
//                     </div>
//                 </div>
//                 <br />
//                 {/* Пароль */}
//                 <div className="form-group">
//                     <label>Пароль *</label> <br />
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                         minLength="8"
//                     />
//                 </div>
//                 <br />
//                 {/* Подтверждение пароля */}
//                 <div className="form-group">
//                     <label>Подтверждение пароля *</label> <br />
//                     <input
//                         type="password"
//                         name="password2"
//                         value={formData.password2}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <br />
//                 <br />
//                 <button type="submit" disabled={isLoading} className="submit-btn">
//                     {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
//                 </button>
//             </form>

//             <p className="login-link">
//                 Уже есть аккаунт? <Link to="/login">Войти</Link>
//             </p>
//         </div>
//     );
// }


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './user.scss';
import axios from "axios";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",        // логин (будет использоваться как username)
        email: "",
        password: "",
        password2: "",       // подтверждение пароля
        first_name: "",      // имя (отправляется как first_name)
        last_name: "",       // фамилия (отправляется как last_name)
        patronymic: "",      // отчество
        nickname: "",        // никнейм
        phone: "",           // телефон
        gender: "none-gender", // пол по умолчанию
        privacyPolicy: false,  // Политика конфиденциальности
        personalData: false,   // Согласие на обработку данных
    });

    // Маска для телефона
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
            // Применяем маску только для телефона
            setFormData({
                ...formData,
                [name]: formatPhoneNumber(value),
            });
        } else if (type === 'checkbox') {
            // Для чекбоксов
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else {
            // Для всех остальных полей
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
        
        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("email: Введите корректный email адрес");
            return;
        }
        
        // Проверка радио-кнопок
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
            
            // Сохраняем токены в localStorage
            if (response.data.tokens) {
                localStorage.setItem('access_token', response.data.tokens.access);
                localStorage.setItem('refresh_token', response.data.tokens.refresh);
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            
           // После регистрации перенаправляем на вход
           setTimeout(() => {
               navigate('/login');
           }, 2000);
            
        } catch (error) {
            console.log("Error during registration!", error.response?.data);
            if (error.response && error.response.data) {
                // Показываем первую ошибку
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
                {/* Имя (отправляется как first_name) */}
                <div className="form-group">
                    <label>Имя *</label> <br />
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br /> 
                
                {/* Фамилия (отправляется как last_name) */}
                <div className="form-group">
                    <label>Фамилия *</label> <br />
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br /> 
                
                {/* Отчество */}
                <div className="form-group">
                    <label>Отчество</label> <br />
                    <input
                        type="text"
                        name="patronymic"
                        value={formData.patronymic}
                        onChange={handleChange}
                    />
                </div>
                <br /> 
                
                {/* Имя пользователя (username) */}
                <div className="form-group">
                    <label>Логин *</label> <br />
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br /> 
                
                {/* Никнейм */}
                <div className="form-group">
                    <label>Никнейм *</label> <br />
                    <input
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br /> 
                
                {/* Email */}
                <div className="form-group">
                    <label>Эл. почта *</label> <br />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br /> 
                
                {/* Телефон с маской */}
                <div className="form-group">
                    <label>Телефон *</label> <br />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="8(999)999-99-99"
                        pattern="8\(\d{3}\)\d{3}-\d{2}-\d{2}"
                    />
                    <div className="phone-hint">Формат: 8(999)999-99-99</div>
                </div>
                <br /> 
                
                {/* Пол */}
                <div className="form-group">
                    <label>Пол *</label> <br />
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="woman"
                                checked={formData.gender === 'woman'}
                                onChange={handleChange}
                            />
                            Женский
                        </label> <br />
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="man"
                                checked={formData.gender === 'man'}
                                onChange={handleChange}
                            />
                            Мужской
                        </label> <br />
                        <label>
                            <input
                                className="radio-input"
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
                
                {/* Политика конфиденциальности */}
                <div className="form-group required-checkbox-group">
                    <label className="required-checkbox">
                        <input
                            type="checkbox"
                            name="privacyPolicy"
                            checked={formData.privacyPolicy}
                            onChange={handleChange}
                        />
                        Я соглашаюсь с правилами "Политики конфиденциальности" *
                    </label>
                </div>
                
                {/* Согласие на обработку данных */}
                <div className="form-group required-checkbox-group">
                    <label className="required-checkbox">
                        <input
                            type="checkbox"
                            name="personalData"
                            checked={formData.personalData}
                            onChange={handleChange}
                        />
                        Я даю согласие на обработку персональных данных *
                    </label>
                </div>
                <br />
                
                {/* Пароль */}
                <div className="form-group">
                    <label>Пароль *</label> <br />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="8"
                    />
                </div>
                <br /> 
                
                {/* Подтверждение пароля */}
                <div className="form-group">
                    <label>Подтверждение пароля *</label> <br />
                    <input
                        type="password"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
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