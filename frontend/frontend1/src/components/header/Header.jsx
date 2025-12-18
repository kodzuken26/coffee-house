import React from 'react';
import "./header.scss";
import {  Router, Routes, Route, Link } from "react-router-dom";


export default function Header() {
    return (
        <div>
            <div className="header">
                <div href="/">
                        <img src="./img/logo.png" alt="Logo"/>
                </div>
                 <nav className="header-nav">
                        <Link className="text-link-nav link"> О нас </Link>
                        <Link className="text-link-nav link"> Меню </Link>
                        <Link className="text-link-nav link"> Аккаунт </Link>
                </nav>
            </div>
        </div>
    )
}

