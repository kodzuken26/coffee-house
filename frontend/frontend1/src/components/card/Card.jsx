import React from 'react';
import './card.scss';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export default function Card() {

    const { id } = useParams();  
    const [drink, setDrink] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}drinks/${id}/`)
            .then(response => {
                setDrink(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching drink:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Загрузка...</div>;
    if (!drink) return <div>Товар не найден</div>;

    return (
        <div>
            <div className="card-page">
                <div className="img-wrap2">
                    <img src={drink.image} alt={drink.name} />
                </div>
                
                <div className="text-card">
                    <h1 className="drink-name">{drink.name}</h1>
                    <p className="drink-price">Цена: {drink.price} ₽</p>
                    <p className="drink-text">Состав: {drink.ingredients}</p>
                </div>
            </div>
            <Link to="/menu" className="return"> ← Назад</Link>
        </div>
    )
}