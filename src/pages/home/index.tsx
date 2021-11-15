import './index.scss';

import { eventShowcaseDataArray } from '../../data/eventShowcaseData';
import ImageSlider from '../../components/homePage/imageSlider/ImageSlider';
import EventShowcaseModule from '../../components/homePage/eventShowcase/Module';

const HomePage = (): JSX.Element => {
    
    return (
        <div className="homePage">
            <ImageSlider />
            <EventShowcaseModule title="This Week" data={eventShowcaseDataArray} displayFilters={true} />
            <EventShowcaseModule title="Recently Added" data={eventShowcaseDataArray} displayFilters={false} />
            <EventShowcaseModule title="Most Popular" data={eventShowcaseDataArray} displayFilters={false} />
        </div>
    );
}

export default HomePage;