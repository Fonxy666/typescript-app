import React from 'react';
import { Navbar } from '../components/Navbar';
import "../styles/index.scss";
import { HeroSection } from '../components/HeroSection';

const HomePage: React.FC = () => {
   
    return (
        <div>
            <Navbar/>
            <div className='container main'>
                <HeroSection />
            </div>
        </div>
    );
};

export default HomePage;