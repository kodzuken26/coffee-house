import React from "react";
import './about.scss';
import { Link } from 'react-router-dom';

export default function About() {

    return (
        <div>
            <div className="about-container">
                <div className="text-about">
                    <div className="text-about-block">
                        <h2 className="text-about-h2">Мы находимся по адресу:</h2>
                        <p className="text-about-punkt"> <span classname="circle">  </span>г.Ульяновск, ул.Московское шоссе, д.108</p>
                    </div>
                    <div className="text-about-block">
                        <h2 className="text-about-h2">Если хочешь связаться с нами:</h2>
                        <p className="text-about-punkt"> <span classname="circle">  </span>Наша почта: catpuccino@mail.ru</p>
                        <p className="text-about-punkt"> <p classname="circle">  </p>Мы в телеграм: @catpuccino</p>
                        <p className="text-about-punkt"> <div classname="circle"> </div>Наш номер: +7-936-463-21-34</p>
                    </div>
                    <button className="btn-about"><Link to="/menu" className="link-about">Заказать доставку</Link></button>
                </div>
                <div className="map-container">
                    <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2327.8608731671575!2d48.357431776790904!3d54.306410772583305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x415d371feb01bc9b%3A0x10bfef1228f30588!2z0JzQotCg0Jog0JDQutCy0LDQvNC-0LvQuw!5e0!3m2!1sru!2sru!4v1766143677133!5m2!1sru!2sru"   allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    )
}