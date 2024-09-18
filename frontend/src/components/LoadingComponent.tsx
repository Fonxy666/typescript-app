import React from 'react';
import { PropagateLoader } from 'react-spinners';

export const LoadingComponent: React.FC<{ loading: boolean }> = ({ loading }) => {
    const storedColor = localStorage.getItem('--primary-color');
    
    return (
        <div className='loading-container'>
            { loading? <PropagateLoader color={storedColor!} loading={loading} size={15}  /> : <div>notloading</div>}
        </div>
    )
}
