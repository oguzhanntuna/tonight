import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './EventsContainer.scss';

import * as cartActions from '../../../store/actions/cart';
import { IEventShowcaseEvent } from '../../../models/interfaces/eventShowcase/event';
import EventShowcaseEvent from './Event';
import EventShowcaseEventPriceContainer from './EventPriceContainer';

interface IEventShowcaseEventsContainerProps {
    eventData: Array<IEventShowcaseEvent>;
}

const EventShowcaseEventsContainer = (props: IEventShowcaseEventsContainerProps): JSX.Element => {
    const { eventData } = props;
    
    const [activeEventsArray, setActiveEventsArray] = useState<Array<number | null>>([]);
    const dispatch = useDispatch();

    const setEventActive = (eventId: number) => setActiveEventsArray([...activeEventsArray, eventId]);
    
    const setEventInactive = (eventId: number) => {
        const newActiveEventsArray = activeEventsArray.filter(activeEvent => activeEvent !== eventId);
        
        setActiveEventsArray([...newActiveEventsArray]);
    }
    
    const isEventSelected = (eventId: number) => activeEventsArray.indexOf(eventId) !== -1 ? true : false;

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
                                ? <>
                                    <EventShowcaseEventPriceContainer 
                                        eventData={event}
                                        onReturnBackButtonClicked={() => setEventInactive(event.id)}
                                        selectedEventIdArray={activeEventsArray}
                                    /> 
                                </>
                                : <>
                                    <EventShowcaseEvent 
                                        eventData={event} 
                                        onEventClicked={() => setEventActive(event.id)}
                                    /> 
                                </>
                        }
                        <button 
                            className={`
                                eventsContainer-purchaseButton 
                                ${isEventSelected(event.id) ? 'addToCart' : ''}
                                ${event.totalPrice > 0 ? 'active' : ''}
                            `}
                            onClick={() => {
                                isEventSelected(event.id)
                                    ? dispatch(cartActions.addToCart(event))
                                    : setEventActive(event.id)
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