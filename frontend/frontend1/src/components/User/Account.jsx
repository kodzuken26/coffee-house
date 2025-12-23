import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './account.scss';
import { getAvatarUrl, getBannerUrl } from '../../utils/urls'; 

export default function Account() {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    // ПРОСТАЯ функция загрузки картинки
    const uploadImage = async (file, type) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('type', type);  // 'avatar' или 'banner'

        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post(
                'http://127.0.0.1:8000/api/upload-image/',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            // Обновляем пользователя
            const updatedUser = {
                ...user,
                avatar_url: response.data.avatar_url,
                banner_url: response.data.banner_url
            };

            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            alert('Картинка загружена!');

        } catch (error) {
            alert('Ошибка загрузки: ' + error.message);
        }
    };

    if (!user) return <div>Загрузка...</div>;

    return (
        <div className="simple-account">
            {/* Баннер */}
            <div className="banner"
                style={{
                    backgroundImage: `url(${getBannerUrl(user?.banner_url)})` // ← ВОССТАНОВИЛ
                }}>
                <img
                    src={getBannerUrl(user?.banner_url)}
                    alt="Баннер"
                    className="banner-img"
                />
                
                
                {editMode && (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files[0]) uploadImage(e.target.files[0], 'banner');
                            }}
                            style={{ display: 'none' }}
                            id="banner-input"
                        />
                        <label htmlFor="banner-input" className="upload-btn">
                            ✎
                        </label>
                    </>
                )}
            </div>

            {/* Аватар и информация */}
            <div className="profile">
                <div className="avatar-container">
                    <img
                        src={getAvatarUrl(user?.avatar_url)} 
                        alt="Аватар"
                        className="avatar"
                    />
                    
                    {editMode && (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files[0]) uploadImage(e.target.files[0], 'avatar');
                                }}
                                style={{ display: 'none' }}
                                id="avatar-input"
                            />
                            <label htmlFor="avatar-input" className="upload-btn small">
                                ✎
                            </label>
                        </>
                    )}
                </div>


                <div className="info-container">
                    <div className="info">
                        <p>{user.first_name} {user.last_name}</p>
                        <p><strong>Ник:</strong> {user.nickname}</p>
                        <p><strong>Роль:</strong> {user.role}</p>
                        
                       
                    </div>
                     <button 
                            onClick={() => setEditMode(!editMode)}
                            className="edit-btn"
                        >
                            {editMode ? 'Применить изменения' : 'Редактировать профиль'}
                        </button>
                </div>
            </div>
            <div className="response-container">
                <h2>Мои отзывы</h2>
                <div className="response">
                    <div className="response-top">
                        <p>{user.nickname}</p>
                        <p classname="star"><span>⭐</span> <span>⭐</span> <span>☆</span> <span>☆</span> <span>☆</span></p>
                    </div>
                    <form>
                        <textarea></textarea>
                    </form>
                </div>
            </div>

            <button
                onClick={() => {
                    localStorage.clear();
                    navigate('/');
                }}
                className="logout-btn"
            >
                Выйти
            </button>
        </div>
    );
}