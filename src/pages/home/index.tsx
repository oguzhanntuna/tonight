import { useSelector } from 'react-redux';
import './index.scss';

import ImageSlider from '../../components/homePage/imageSlider/ImageSlider';
import EventShowcaseModule from '../../components/homePage/eventShowcase/Module';
import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';

interface IEventsState {
    availableEvents: Array<IEventShowcaseEvent>
  }
  
interface ICartState {
  cartItems: Array<IEventShowcaseEvent | undefined>;
}

interface IApplicationState {
  events: IEventsState;
  cart: ICartState;
}

const HomePage = (): JSX.Element => {
    const availableEvents = useSelector((state: IApplicationState) => state.events.availableEvents);
    const cartItems = useSelector((state: IApplicationState) => state.cart.cartItems);

    console.log(availableEvents);
    console.log(cartItems);
    
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