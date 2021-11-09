import './HomePage.scss';

import ImageSlider from '../../components/homePage/imageSlider/ImageSlider';
import ThisWeekModule from '../../components/homePage/thisWeekModule/ThisWeekModule';

const HomePage = (): JSX.Element => {

    return (
        <div className="homePage">
            <ImageSlider />
            <ThisWeekModule />
        </div>
    );
}

export default HomePage;