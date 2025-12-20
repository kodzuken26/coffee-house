import React from 'react';
import "./catalog.scss";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000/api/'

export default function Catalog() {

    const [Data, setData] = useState([]);
        const getData = () => {
            //const dataResponce = await
            axios.get(API_URL + 'drinks')
                // console.log(dataResponce)
                .then(response => {
                    setData(response.data) 
                });
        }
    
        useEffect(() => {
            getData();
        }, []);

    return (
        <div>
            <h2 className="catalog-h2">Меню</h2>
            <div className="catalog">
                {Data.map(element => (
                <div key={element.id} className="catalog-card" >
                    <Link to={`/menu/drinks/${element.id}`}>
                         <div className="img-wrap">
                            <img src={ element.image } className="img-drink-catalog"/>
                        </div>
                            <p className="catalog-p"> {element.name} </p>
                            <p className="catalog-p"> {element.price} ₽</p>
                          
                    </Link>
                    </div> 
                
                ))}
            </div>
            
        </div>
    )
}

