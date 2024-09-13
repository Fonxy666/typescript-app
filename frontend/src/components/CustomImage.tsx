interface ICustomImageProps {
    imgSrc: string;
    pt: string;
}

export const CustomImage = ({imgSrc, pt}: ICustomImageProps) => {
    return (
        <div className='custom-image' style={{paddingTop: pt}}>
            <img className='img' src={imgSrc} alt=''/>
        </div>
    )
}
