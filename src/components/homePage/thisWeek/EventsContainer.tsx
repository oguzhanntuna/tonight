import { useState } from 'react';
import { IThisWeekModuleEvent } from './Module';
import './EventsContainer.scss';

import ThisWeekModuleEvent from './Event';
import ThisWeekModuleEventPriceContainer from './EventPriceContainer';

interface IThisWeekModuleEventsContainerProps {
    data: Array<IThisWeekModuleEvent>;
}

const ThisWeekModuleEventsContainer = (props: IThisWeekModuleEventsContainerProps): JSX.Element => {
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const { data } = props;

    const addToCart = (): void => {
        console.log('added to cart');
    }

    return (
        <div className="eventsContainer">
            {
                data.map(eventData => (
                    <div 
                        className={`eventsContainer-eventContainer ${selectedEventId === eventData.id ? 'active' : ''}`} 
                        key={eventData.id} 
                    >
                        { 
                            selectedEventId === eventData.id 
                                ? <>
                                    <ThisWeekModuleEventPriceContainer 
                                        data={eventData}
                                        onReturnBackButtonClicked={() => setSelectedEventId(null)}
                                        selectedEventId={selectedEventId}
                                    /> 
                                </>
                                : <>
                                    <ThisWeekModuleEvent 
                                        data={eventData} 
                                        onEventClicked={() => setSelectedEventId(eventData.id)}
                                    /> 
                                </>
                        }
                        <button 
                            className="eventsContainer-purchaseButton"
                            onClick={() => {
                                selectedEventId !== eventData.id 
                                    ? setSelectedEventId(eventData.id)
                                    : addToCart()
                            }}
                        >
                            { selectedEventId !== eventData.id ? 'Buy Now' : 'Add To Card'}
                        </button>
                    </div>
                ))
            }
        </div>
    );
}

export default ThisWeekModuleEventsContainer;