import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Header from './components/header/Header.jsx';
import Main from './components/main/Main.jsx';
import Footer from './components/footer/Footer.jsx';

function App() {
    
   
    return (
        <div>
            <Header/>
            <Main/>
            <Footer/>
    </div >
  );
}

export default App;
