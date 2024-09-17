import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { LoadingComponent } from './LoadingComponent';

const Layout: React.FC = () => {
    const [loading, setLoading] = useState(true);

    return (
        <div className='wrapper'>
            <Navbar />
            <main>
                { loading? <LoadingComponent /> : <Outlet />}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;