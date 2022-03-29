import { useScrollToTop } from '../../customHooks/useScrollToTop';
import './home.scss';

import heroImage from '../../assets/hero.jpg';
import ImageSlider from '../../components/homePage/imageSlider/ImageSlider';
import EventShowcaseModule from '../../components/homePage/eventShowcase/Module';
import HeroImage from '../../components/heroImage/HeroImage';

const HomePage = (): JSX.Element => {

    useScrollToTop();

    return (
        <div className="homePage">
            <HeroImage imageUrl={heroImage} />
            <div className="homePage-content">
                <ImageSlider />
                <EventShowcaseModule 
                    title="This Week" 
                    moduleType="this-week" 
                    displayFilters={true} 
                />
                <EventShowcaseModule 
                    title="Recently Added" 
                    moduleType="recently-added"  
                    displayFilters={false} 
                />
                <EventShowcaseModule 
                    title="Buy Now"
                    moduleType="buy-now" 
                    displayFilters={false} 
                />
            </div>
        </div>
    );
}

export default HomePage;