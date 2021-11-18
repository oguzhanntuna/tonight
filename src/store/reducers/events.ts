import { EVENT_SHOWCASE_DATA_ARRAY } from '../../data/eventShowcaseData';
import { EventShowcaseEvent, IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';

const initialState = {
    availableEvents: EVENT_SHOWCASE_DATA_ARRAY
}

const eventsReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'increase':
            const selectedEvent = state.availableEvents.find(event => event.id === action.eventId);
            
            if (selectedEvent instanceof EventShowcaseEvent) {
                const selectedEventIndexInAvailableEvents = state.availableEvents.indexOf(selectedEvent);
                console.log(selectedEventIndexInAvailableEvents);

                const newSelectedEvent = new EventShowcaseEvent(
                    selectedEvent.id,
                    selectedEvent.title,
                    selectedEvent.image,
                    selectedEvent.location,
                    selectedEvent.date,
                    {
                        type: selectedEvent.normalTicket.type,
                        title: selectedEvent.normalTicket.title,
                        price: selectedEvent.normalTicket.price,
                        ...(action.ticketType === 'normal' ? { count: selectedEvent.normalTicket.count + 1 } : { count: selectedEvent.normalTicket.count })
                    },
                    {
                        type: selectedEvent.vipTicket.type,
                        title: selectedEvent.vipTicket.title,
                        price: selectedEvent.vipTicket.price,
                        ...(action.ticketType === 'vip' ? { count: selectedEvent.vipTicket.count + 1 } : { count: selectedEvent.vipTicket.count })
                    },
                );

                const newAvailableEvents = state.availableEvents;
                newAvailableEvents.splice(selectedEventIndexInAvailableEvents, 1, newSelectedEvent);
                
                return {
                    ...state,
                    availableEvents: [ ...newAvailableEvents ]
                }
            }
    }

    return state;
}

export default eventsReducer;