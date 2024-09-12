import React, { FormEvent, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import "../styles/index.scss";

const HomePage: React.FC = () => {
   
    return (
        <div>
            <Navbar/>
            Hello World!
        </div>
    );
};

export default HomePage;