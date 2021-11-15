import { useState } from 'react';
import './EventsContainer.scss';

import { IEventShowcaseEvent } from '../../../models/interfaces/eventShowcase/event';
import EventShowcaseEvent from './Event';
import EventShowcaseEventPriceContainer from './EventPriceContainer';

interface IEventShowcaseEventsContainerProps {
    data: Array<IEventShowcaseEvent>;
}

const EventShowcaseEventsContainer = (props: IEventShowcaseEventsContainerProps): JSX.Element => {
    const [selectedEventIdArray, setSelectedEventIdArray] = useState<Array<number | null>>([]);
    const { data } = props;

    const addToCart = (): void => {
        console.log('added to cart');
    }

    const addEventToEventsArray = (eventId: number) => {
        setSelectedEventIdArray([...selectedEventIdArray, eventId]);
    }

    const removeEventFromEventsArray = (eventId: number) => {
        const newSelectedEventIdArray = selectedEventIdArray.filter(selectedEvent => selectedEvent !== eventId);
        setSelectedEventIdArray([...newSelectedEventIdArray]);
    }

    const isEventSelected = (eventId: number) => selectedEventIdArray.indexOf(eventId) !== -1 ? true : false;

    console.log(selectedEventIdArray);

    return (
        <div className="eventsContainer">
            {
                data.map(eventData => (
                    <div 
                        className={`eventsContainer-eventContainer ${isEventSelected(eventData.id) ? 'active' : ''}`} 
                        key={eventData.id} 
                    >
                        { 
                            isEventSelected(eventData.id)
                                ? <>
                                    <EventShowcaseEventPriceContainer 
                                        data={eventData}
                                        onReturnBackButtonClicked={() => removeEventFromEventsArray(eventData.id)}
                                        selectedEventIdArray={selectedEventIdArray}
                                    /> 
                                </>
                                : <>
                                    <EventShowcaseEvent 
                                        data={eventData} 
                                        onEventClicked={() => addEventToEventsArray(eventData.id)}
                                    /> 
                                </>
                        }
                        <button 
                            className="eventsContainer-purchaseButton"
                            onClick={() => {
                                isEventSelected(eventData.id)
                                    ? addEventToEventsArray(eventData.id)
                                    : addToCart()
                            }}
                        >
                            { isEventSelected(eventData.id) ? 'Add To Card' : 'Buy Now'}
                        </button>
                    </div>
                ))
            }
        </div>
    );
}

export default EventShowcaseEventsContainer;