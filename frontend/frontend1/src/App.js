import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Header from './components/header/Header.jsx';
import Main from './components/main/Main.jsx';
import Footer from './components/footer/Footer.jsx';
import About from './components/about/About.jsx';
import Catalog from './components/catalog/Catalog.jsx';
import Card from './components/card/Card.jsx';


function App() {
    
    return (
        <div>
            <BrowserRouter>
           
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/menu" element={<Catalog />} />
                    <Route path="/menu/drinks/:id" element={<Card />} />
                </Routes>
                {/* <Main/> */}
                <Footer />
           
            </BrowserRouter>
    </div >
  );
}

export default App;
