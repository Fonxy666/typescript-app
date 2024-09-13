interface ICustomImageProps {
    imgSrc: string;
    pt: string;
}

export const CustomImage: React.FC<ICustomImageProps> = ({imgSrc, pt}: ICustomImageProps) => {
    return (
        <div className='custom-image' style={{paddingTop: pt}}>
            <img className='img' src={imgSrc} alt=''/>
        </div>
    )
}
