import { EVENT_SHOWCASE_DATA_ARRAY } from '../../data/eventShowcaseData';
import { ADD_NORMAL_TICKET, ADD_VIP_TICKET } from '../actions/events';
import { EventShowcaseEvent, IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';

const initialState = {
    availableEvents: EVENT_SHOWCASE_DATA_ARRAY
}

export const eventsReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case ADD_NORMAL_TICKET:
            const eventOfSelectedNormalTicket = state.availableEvents.find(event => event.id === action.eventId);
            
            if (eventOfSelectedNormalTicket instanceof EventShowcaseEvent) {
                const selectedEventIndexInAvailableEvents = state.availableEvents.indexOf(eventOfSelectedNormalTicket);

                const newSelectedEvent = new EventShowcaseEvent(
                    eventOfSelectedNormalTicket.id,
                    eventOfSelectedNormalTicket.title,
                    eventOfSelectedNormalTicket.image,
                    eventOfSelectedNormalTicket.location,
                    eventOfSelectedNormalTicket.date,
                    {
                        type: eventOfSelectedNormalTicket.normalTicket.type,
                        title: eventOfSelectedNormalTicket.normalTicket.title,
                        price: eventOfSelectedNormalTicket.normalTicket.price,
                        count: eventOfSelectedNormalTicket.normalTicket.count + 1
                    },
                    eventOfSelectedNormalTicket.vipTicket,
                    eventOfSelectedNormalTicket.totalPrice + eventOfSelectedNormalTicket.normalTicket.price
                );

                const newAvailableEvents = state.availableEvents;
                newAvailableEvents.splice(selectedEventIndexInAvailableEvents, 1, newSelectedEvent);
                
                return {
                    ...state,
                    availableEvents: [ ...newAvailableEvents ]
                }
            }

            // Selected event could not found!
            break;

        case ADD_VIP_TICKET:
            const eventOfSelectedVipTicket = state.availableEvents.find(event => event.id === action.eventId);
            
            if (eventOfSelectedVipTicket instanceof EventShowcaseEvent) {
                const selectedEventIndexInAvailableEvents = state.availableEvents.indexOf(eventOfSelectedVipTicket);

                const newSelectedEvent = new EventShowcaseEvent(
                    eventOfSelectedVipTicket.id,
                    eventOfSelectedVipTicket.title,
                    eventOfSelectedVipTicket.image,
                    eventOfSelectedVipTicket.location,
                    eventOfSelectedVipTicket.date,
                    eventOfSelectedVipTicket.normalTicket,
                    {
                        type: eventOfSelectedVipTicket.vipTicket.type,
                        title: eventOfSelectedVipTicket.vipTicket.title,
                        price: eventOfSelectedVipTicket.vipTicket.price,
                        count: eventOfSelectedVipTicket.vipTicket.count + 1
                    },
                    eventOfSelectedVipTicket.totalPrice + eventOfSelectedVipTicket.vipTicket.price
                );

                const newAvailableEvents = state.availableEvents;
                newAvailableEvents.splice(selectedEventIndexInAvailableEvents, 1, newSelectedEvent);
                
                return {
                    ...state,
                    availableEvents: [ ...newAvailableEvents ]
                }
            }

            // Selected event could not found!
            break;
    }

    return state;
}