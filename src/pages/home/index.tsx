import { useSelector } from 'react-redux';
import './index.scss';

import ImageSlider from '../../components/homePage/imageSlider/ImageSlider';
import EventShowcaseModule from '../../components/homePage/eventShowcase/Module';
import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';

interface IEventsState {
    availableEvents: Array<IEventShowcaseEvent>
  }
  
  interface IApplicationState {
    events: IEventsState
  }

const HomePage = (): JSX.Element => {
    const availableEvents = useSelector((state: IApplicationState) => state.events.availableEvents);

    console.log(availableEvents);
    
    return (
        <div className="homePage">
            <ImageSlider />
            <EventShowcaseModule title="This Week" data={availableEvents} displayFilters={true} />
            <EventShowcaseModule title="Recently Added" data={availableEvents} displayFilters={false} />
            <EventShowcaseModule title="Most Popular" data={availableEvents} displayFilters={false} />
        </div>
    );
}

export default HomePage;