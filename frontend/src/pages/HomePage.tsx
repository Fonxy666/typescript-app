import React from 'react';
import { Navbar } from '../components/Navbar';
import "../styles/index.scss";
import { HeroSection } from '../components/HeroSection';
import { ImproveSkills } from '../components/ImproveSkills';
import { QuoteSection } from '../components/QuoteSection';
import { TopChiefs } from '../components/TopChiefs';
import { Footer } from '../components/Footer';

const HomePage: React.FC = () => {
   
    return (
        <div>
            <Navbar/>
            <div className='container main'>
                <HeroSection />
                <ImproveSkills />
                <QuoteSection />
                <TopChiefs />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;