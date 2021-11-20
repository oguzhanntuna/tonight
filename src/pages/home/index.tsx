import { useSelector } from 'react-redux';
import './index.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';

import ImageSlider from '../../components/homePage/imageSlider/ImageSlider';
import EventShowcaseModule from '../../components/homePage/eventShowcase/Module';

const HomePage = (): JSX.Element => {
    const availableEvents = useSelector((state: IApplicationState) => state.events.availableEvents);
    const favoriteItems = useSelector((state: IApplicationState) => state.favorites.favoriteEvents);
    
    console.log(favoriteItems);

    return (
        <div className="homePage">
            <ImageSlider />
            <EventShowcaseModule title="This Week" eventData={availableEvents} displayFilters={true} />
            <EventShowcaseModule title="Recently Added" eventData={availableEvents} displayFilters={false} />
            <EventShowcaseModule title="Most Popular" eventData={availableEvents} displayFilters={false} />
        </div>
    );
}

export default HomePage;