import React from 'react'

interface ICustomImageProps {
    imgSrc: string;
    pt: string;
}

export const CustomImage: React.FC<ICustomImageProps> = ({imgSrc, pt}) => {
    return (
        <div className='custom-image' style={{paddingTop: pt}}>
            <img className='img' src={imgSrc} alt=''/>
        </div>
    )
}
