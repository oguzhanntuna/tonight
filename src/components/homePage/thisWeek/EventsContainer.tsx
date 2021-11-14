import { useState } from 'react';
import './EventsContainer.scss';
import { IThisWeekModuleEvent } from '../../../pages/homePage/HomePage';

import ThisWeekModuleEvent from './Event';
import ThisWeekModuleEventPriceContainer from './EventPriceContainer';

interface IThisWeekModuleEventsContainerProps {
    data: Array<IThisWeekModuleEvent>;
}

const ThisWeekModuleEventsContainer = (props: IThisWeekModuleEventsContainerProps): JSX.Element => {
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
                                    <ThisWeekModuleEventPriceContainer 
                                        data={eventData}
                                        onReturnBackButtonClicked={() => removeEventFromEventsArray(eventData.id)}
                                        selectedEventIdArray={selectedEventIdArray}
                                    /> 
                                </>
                                : <>
                                    <ThisWeekModuleEvent 
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
                            { isEventSelected(eventData.id) ? 'Buy Now' : 'Add To Card'}
                        </button>
                    </div>
                ))
            }
        </div>
    );
}

export default ThisWeekModuleEventsContainer;