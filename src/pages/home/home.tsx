import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './home.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as eventActions from '../../store/actions/events';

import heroImage from '../../assets/heroImage.jpg';
import ImageSlider from '../../components/homePage/imageSlider/ImageSlider';
import EventShowcaseModule from '../../components/homePage/eventShowcase/Module';
import HeroImage from '../../components/heroImage/HeroImage';

const HomePage = (): JSX.Element => {
    const { fetchEvents } = eventActions;

    const dispatch = useDispatch();
    const buyNowEvents = useSelector((state: IApplicationState) => state.events.buyNowEvents);
    const recentlyAddedEvents = useSelector((state: IApplicationState) => state.events.recentlyAddedEvents);
    const thisWeekEvents = useSelector((state: IApplicationState) => state.events.thisWeekEvents);
    const favoriteItems = useSelector((state: IApplicationState) => state.favorites.favoriteEvents);

    useEffect(() => {
        dispatch(fetchEvents());

    }, [dispatch, fetchEvents]);

    return (
        <div className="homePage">
            <HeroImage imageUrl={heroImage} />
            <div className="homePage-content">
                <ImageSlider />
                <EventShowcaseModule title="This Week" eventData={thisWeekEvents} displayFilters={true} />
                <EventShowcaseModule title="Recently Added" eventData={recentlyAddedEvents} displayFilters={false} />
                <EventShowcaseModule title="Buy Now" eventData={buyNowEvents} displayFilters={false} />
                {/* <EventShowcaseModule title="Most Popular" eventData={availableEvents} displayFilters={false} /> */}
            </div>
        </div>
    );
}

export default HomePage;