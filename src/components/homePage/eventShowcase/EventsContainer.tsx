import { useDispatch, useSelector } from 'react-redux';
import './EventsContainer.scss';

import * as eventActions from '../../../store/actions/events';
import * as cartActions from '../../../store/actions/cart';
import { IEventShowcaseEvent } from '../../../models/interfaces/eventShowcase/event';
import { IApplicationState } from '../../../models/interfaces/store/states/application';

import EventShowcaseEvent from './Event';
import EventShowcaseEventPriceContainer from './EventPriceContainer';

interface IEventShowcaseEventsContainerProps {
    eventData: Array<IEventShowcaseEvent>;
}

const EventShowcaseEventsContainer = (props: IEventShowcaseEventsContainerProps): JSX.Element => {
    const { eventData } = props;
    const { setEventActive } = eventActions;
    const { addToCart } = cartActions;
    
    const activeEventIdsArray = useSelector((state: IApplicationState) => state.events.activeEventIds);
    const dispatch = useDispatch();
    
    const isEventSelected = (eventId: number) => activeEventIdsArray.indexOf(eventId) !== -1 ? true : false;

    return (
        <div className="eventsContainer">
            {
                eventData.map(event => (
                    <div 
                        className={`eventsContainer-eventContainer ${isEventSelected(event.id) ? 'active' : ''}`} 
                        key={event.id} 
                    >
                        { 
                            isEventSelected(event.id)
                                ? <EventShowcaseEventPriceContainer eventData={event} /> 
                                : <EventShowcaseEvent eventData={event} /> 
                        }
                        <button 
                            className={`
                                eventsContainer-purchaseButton 
                                ${isEventSelected(event.id) ? 'addToCart' : ''}
                                ${event.totalPrice > 0 ? 'active' : ''}
                            `}
                            onClick={() => {
                                isEventSelected(event.id)
                                    ? dispatch(addToCart(event))
                                    : dispatch(setEventActive(event.id))
                            }}
                            disabled={isEventSelected(event.id) && event.totalPrice === 0}
                        >
                            { isEventSelected(event.id) ? 'Add To Cart' : 'Buy Now'}
                        </button>
                    </div>
                ))
            }
        </div>
    );
}

export default EventShowcaseEventsContainer;