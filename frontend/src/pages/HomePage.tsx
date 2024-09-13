import React from 'react';
import "../styles/index.scss";
import { HeroSection } from '../components/HeroSection';
import { ImproveSkills } from '../components/ImproveSkills';
import { QuoteSection } from '../components/QuoteSection';
import { TopChiefs } from '../components/TopChiefs';

const HomePage: React.FC = () => {
   
    return (
        <div>
            <div className='container main'>
                <HeroSection />
                <ImproveSkills />
                <QuoteSection />
                <TopChiefs />
            </div>
        </div>
    );
};

export default HomePage;