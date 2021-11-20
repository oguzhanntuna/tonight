import { EVENT_SHOWCASE_DATA_ARRAY } from '../../data/eventShowcaseData';
import { ADD_NORMAL_TICKET, ADD_VIP_TICKET, REMOVE_NORMAL_TICKET, REMOVE_VIP_TICKET } from '../actions/events';
import { EventShowcaseEvent, IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';

const initialState = {
    availableEvents: EVENT_SHOWCASE_DATA_ARRAY
}

export const eventsReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case ADD_NORMAL_TICKET:
            const addedNormalTicketEvent = state.availableEvents.find(event => event.id === action.eventId);
            
            if (addedNormalTicketEvent instanceof EventShowcaseEvent) {
                const selectedEventIndexInAvailableEvents = state.availableEvents.indexOf(addedNormalTicketEvent);

                const newSelectedEvent = new EventShowcaseEvent(
                    addedNormalTicketEvent.id,
                    addedNormalTicketEvent.title,
                    addedNormalTicketEvent.image,
                    addedNormalTicketEvent.location,
                    addedNormalTicketEvent.date,
                    {
                        type: addedNormalTicketEvent.normalTicket.type,
                        title: addedNormalTicketEvent.normalTicket.title,
                        price: addedNormalTicketEvent.normalTicket.price,
                        count: addedNormalTicketEvent.normalTicket.count + 1
                    },
                    addedNormalTicketEvent.vipTicket,
                    addedNormalTicketEvent.totalPrice + addedNormalTicketEvent.normalTicket.price
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
            const addedVipTicketEvent = state.availableEvents.find(event => event.id === action.eventId);
            
            if (addedVipTicketEvent instanceof EventShowcaseEvent) {
                const selectedEventIndexInAvailableEvents = state.availableEvents.indexOf(addedVipTicketEvent);

                const newSelectedEvent = new EventShowcaseEvent(
                    addedVipTicketEvent.id,
                    addedVipTicketEvent.title,
                    addedVipTicketEvent.image,
                    addedVipTicketEvent.location,
                    addedVipTicketEvent.date,
                    addedVipTicketEvent.normalTicket,
                    {
                        type: addedVipTicketEvent.vipTicket.type,
                        title: addedVipTicketEvent.vipTicket.title,
                        price: addedVipTicketEvent.vipTicket.price,
                        count: addedVipTicketEvent.vipTicket.count + 1
                    },
                    addedVipTicketEvent.totalPrice + addedVipTicketEvent.vipTicket.price
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

        case REMOVE_NORMAL_TICKET:
            const removedNormalTicketEvent = state.availableEvents.find(event => event.id === action.eventId);
            
            if (removedNormalTicketEvent instanceof EventShowcaseEvent) {
                const selectedEventIndexInAvailableEvents = state.availableEvents.indexOf(removedNormalTicketEvent);

                const newSelectedEvent = new EventShowcaseEvent(
                    removedNormalTicketEvent.id,
                    removedNormalTicketEvent.title,
                    removedNormalTicketEvent.image,
                    removedNormalTicketEvent.location,
                    removedNormalTicketEvent.date,
                    {
                        type: removedNormalTicketEvent.normalTicket.type,
                        title: removedNormalTicketEvent.normalTicket.title,
                        price: removedNormalTicketEvent.normalTicket.price,
                        count: removedNormalTicketEvent.normalTicket.count - 1
                    },
                    removedNormalTicketEvent.vipTicket,
                    removedNormalTicketEvent.totalPrice - removedNormalTicketEvent.normalTicket.price
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
        
        case REMOVE_VIP_TICKET:
            const removedVipTicketEvent = state.availableEvents.find(event => event.id === action.eventId);
            
            if (removedVipTicketEvent instanceof EventShowcaseEvent) {
                const selectedEventIndexInAvailableEvents = state.availableEvents.indexOf(removedVipTicketEvent);

                const newSelectedEvent = new EventShowcaseEvent(
                    removedVipTicketEvent.id,
                    removedVipTicketEvent.title,
                    removedVipTicketEvent.image,
                    removedVipTicketEvent.location,
                    removedVipTicketEvent.date,
                    removedVipTicketEvent.normalTicket,
                    {
                        type: removedVipTicketEvent.vipTicket.type,
                        title: removedVipTicketEvent.vipTicket.title,
                        price: removedVipTicketEvent.vipTicket.price,
                        count: removedVipTicketEvent.vipTicket.count - 1
                    },
                    removedVipTicketEvent.totalPrice - removedVipTicketEvent.vipTicket.price
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