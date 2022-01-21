import { useEffect } from 'react';
import './home.scss';

import heroImage from '../../assets/heroImage.jpg';
import ImageSlider from '../../components/homePage/imageSlider/ImageSlider';
import EventShowcaseModule from '../../components/homePage/eventShowcase/Module';
import HeroImage from '../../components/heroImage/HeroImage';

const HomePage = (): JSX.Element => {

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, []);

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
                {/* <EventShowcaseModule title="Most Popular" eventData={availableEvents} displayFilters={false} /> */}
            </div>
        </div>
    );
}

export default HomePage;