import React, { useEffect, useState } from 'react';
import { BeatLoader, ClimbingBoxLoader, ClipLoader, DotLoader, FadeLoader } from 'react-spinners';

export const LoadingComponent: React.FC = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, [])
    
    return (
        <div className='loading-container'>
            { loading? <FadeLoader color='red' loading={loading} width={5} /> : <div>notloading</div>}
        </div>
    )
}
