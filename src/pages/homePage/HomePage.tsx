import './HomePage.scss';

import heroImage from '../../assets/heroImage.jpg';
import ImageSlider from '../../components/homePage/imageSlider/ImageSlider';

const HomePage = (): JSX.Element => {

    return (
        <div className="homePage">
            <div className="homePage-heroImage" style={{ backgroundImage: `url("${heroImage}")` }} />
            <div className="homePage-content">
                <ImageSlider />
            </div>
        </div>
    );
}

export default HomePage;