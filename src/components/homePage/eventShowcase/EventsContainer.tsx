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
    const [selectedEventIdArray, setSelectedEventIdArray] = useState<Array<number | null>>([]);
    const { eventData } = props;

    const dispatch = useDispatch();

    const addEventToEventsArray = (eventId: number) => {
        setSelectedEventIdArray([...selectedEventIdArray, eventId]);
    }

    const removeEventFromEventsArray = (eventId: number) => {
        const newSelectedEventIdArray = selectedEventIdArray.filter(selectedEvent => selectedEvent !== eventId);
        setSelectedEventIdArray([...newSelectedEventIdArray]);
    }

    const isEventSelected = (eventId: number) => selectedEventIdArray.indexOf(eventId) !== -1 ? true : false;

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
                                        onReturnBackButtonClicked={() => removeEventFromEventsArray(event.id)}
                                        selectedEventIdArray={selectedEventIdArray}
                                    /> 
                                </>
                                : <>
                                    <EventShowcaseEvent 
                                        eventData={event} 
                                        onEventClicked={() => addEventToEventsArray(event.id)}
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
                                    : addEventToEventsArray(event.id)
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