import React from 'react';
import "./main.scss";
import { Link } from 'react-router-dom';



export default function Main() {
     
    
    return (
        <div className="main-container">
            <div className="main-text">
                <h1>Кофейня “Catpuccino”</h1>
                <p>Радуем вас свежим кофе с 2005 года!</p>
                <button className="btn-main"><Link className="link2">Наши напитки</Link></button>
            </div>  
            <img src="./img/maincat.png" alt="cat-coffee" className="img-main"/>
        </div>
    )
}

