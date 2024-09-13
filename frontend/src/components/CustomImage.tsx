import React from 'react'

interface CustomImageProps {
    imgSrc: string;
    pt: string;
}

export const CustomImage: React.FC<CustomImageProps> = ({imgSrc, pt}) => {
    return (
        <div className='custom-image' style={{paddingTop: pt}}>
            <img className='img' src={imgSrc} alt=''/>
        </div>
    )
}
