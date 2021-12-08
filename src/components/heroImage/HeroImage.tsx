import './HeroImage.scss';

interface IHeroImageProps {
    imageUrl: string
}

const HeroImage = (props: IHeroImageProps): JSX.Element => {
    const { imageUrl } = props;

    return (
        <div className="heroImageContainer">
            <div className="heroImage">
                <div className="heroImage-image" style={{ backgroundImage: `url("${imageUrl}")` }}/>
                <div className="heroImage-imageOverlay"/>
            </div>
        </div>
    );
}

export default HeroImage;