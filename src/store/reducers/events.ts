import { IEventsAction } from './../../models/interfaces/store/actions/events';
import { IEventsState } from '../../models/interfaces/store/states/events';
import { EventShowcaseEvent } from '../../models/eventShowcase/event';

import { 
    SET_EVENTS,
    ADD_NORMAL_TICKET, 
    ADD_VIP_TICKET, 
    REMOVE_NORMAL_TICKET, 
    REMOVE_VIP_TICKET,  
    SET_EVENT_ACTIVE,
    SET_EVENT_INACTIVE,
    RESET_TICKETS_COUNT
} from '../actions/events';

const initialState: IEventsState = {
    allEvents: [],
    buyNowEvents: [],
    recentlyAddedEvents: [],
    thisWeekEvents: [],
    activeEventIds: []
}

export const eventsReducer = (state = initialState, action: IEventsAction): IEventsState => {
    switch(action.type) {
        case SET_EVENTS: 
            const { allEvents, buyNowEvents, recentlyAddedEvents, thisWeekEvents } = action;

            if (
                typeof(allEvents) !== 'undefined' && 
                typeof(buyNowEvents) !== 'undefined' && 
                typeof(recentlyAddedEvents) !== 'undefined' && 
                typeof(thisWeekEvents) !== 'undefined'
            ) {

                return {
                    ...state,
                    allEvents,
                    buyNowEvents,
                    recentlyAddedEvents,
                    thisWeekEvents
                }
            }
            break;

        case ADD_NORMAL_TICKET:
            const addedNormalTicketEvent = state.allEvents.find(event => event.id === action.eventId);
            
            if (addedNormalTicketEvent instanceof EventShowcaseEvent) {
                const selectedEventIndexInAllEvents = state.allEvents.indexOf(addedNormalTicketEvent);

                const newSelectedEvent = new EventShowcaseEvent(
                    addedNormalTicketEvent.id,
                    addedNormalTicketEvent.title,
                    addedNormalTicketEvent.image,
                    addedNormalTicketEvent.location,
                    addedNormalTicketEvent.date,
                    addedNormalTicketEvent.url,
                    {
                        type: addedNormalTicketEvent.normalTicket.type,
                        title: addedNormalTicketEvent.normalTicket.title,
                        price: addedNormalTicketEvent.normalTicket.price,
                        count: addedNormalTicketEvent.normalTicket.count + 1
                    },
                    addedNormalTicketEvent.vipTicket,
                    addedNormalTicketEvent.totalPrice + addedNormalTicketEvent.normalTicket.price
                );

                const newAllEvents = state.allEvents;
                newAllEvents.splice(selectedEventIndexInAllEvents, 1, newSelectedEvent);
                
                return {
                    ...state,
                    allEvents: [ ...newAllEvents ]
                }
            }

            // Selected event could not found!
            break;

        case ADD_VIP_TICKET:
            const addedVipTicketEvent = state.allEvents.find(event => event.id === action.eventId);
            
            if (addedVipTicketEvent instanceof EventShowcaseEvent) {
                const selectedEventIndexInAllEvents = state.allEvents.indexOf(addedVipTicketEvent);

                const newSelectedEvent = new EventShowcaseEvent(
                    addedVipTicketEvent.id,
                    addedVipTicketEvent.title,
                    addedVipTicketEvent.image,
                    addedVipTicketEvent.location,
                    addedVipTicketEvent.date,
                    addedVipTicketEvent.url,
                    addedVipTicketEvent.normalTicket,
                    {
                        type: addedVipTicketEvent.vipTicket.type,
                        title: addedVipTicketEvent.vipTicket.title,
                        price: addedVipTicketEvent.vipTicket.price,
                        count: addedVipTicketEvent.vipTicket.count + 1
                    },
                    addedVipTicketEvent.totalPrice + addedVipTicketEvent.vipTicket.price
                );

                const newAllEvents = state.allEvents;
                newAllEvents.splice(selectedEventIndexInAllEvents, 1, newSelectedEvent);
                
                return {
                    ...state,
                    allEvents: [ ...newAllEvents ]
                }
            }

            // Selected event could not found!
            break;

        case REMOVE_NORMAL_TICKET:
            const removedNormalTicketEvent = state.allEvents.find(event => event.id === action.eventId);
            
            if (removedNormalTicketEvent instanceof EventShowcaseEvent) {
                const selectedEventIndexInAllEvents = state.allEvents.indexOf(removedNormalTicketEvent);

                const newSelectedEvent = new EventShowcaseEvent(
                    removedNormalTicketEvent.id,
                    removedNormalTicketEvent.title,
                    removedNormalTicketEvent.image,
                    removedNormalTicketEvent.location,
                    removedNormalTicketEvent.date,
                    removedNormalTicketEvent.url,
                    {
                        type: removedNormalTicketEvent.normalTicket.type,
                        title: removedNormalTicketEvent.normalTicket.title,
                        price: removedNormalTicketEvent.normalTicket.price,
                        count: removedNormalTicketEvent.normalTicket.count - 1
                    },
                    removedNormalTicketEvent.vipTicket,
                    removedNormalTicketEvent.totalPrice - removedNormalTicketEvent.normalTicket.price
                );

                const newAllEvents = state.allEvents;
                newAllEvents.splice(selectedEventIndexInAllEvents, 1, newSelectedEvent);
                
                return {
                    ...state,
                    allEvents: [ ...newAllEvents ]
                }
            }

            // Selected event could not found!
            break;
        
        case REMOVE_VIP_TICKET:
            const removedVipTicketEvent = state.allEvents.find(event => event.id === action.eventId);
            
            if (removedVipTicketEvent instanceof EventShowcaseEvent) {
                const selectedEventIndexInAllEvents = state.allEvents.indexOf(removedVipTicketEvent);

                const newSelectedEvent = new EventShowcaseEvent(
                    removedVipTicketEvent.id,
                    removedVipTicketEvent.title,
                    removedVipTicketEvent.image,
                    removedVipTicketEvent.location,
                    removedVipTicketEvent.date,
                    removedVipTicketEvent.url,
                    removedVipTicketEvent.normalTicket,
                    {
                        type: removedVipTicketEvent.vipTicket.type,
                        title: removedVipTicketEvent.vipTicket.title,
                        price: removedVipTicketEvent.vipTicket.price,
                        count: removedVipTicketEvent.vipTicket.count - 1
                    },
                    removedVipTicketEvent.totalPrice - removedVipTicketEvent.vipTicket.price
                );

                const newAllEvents = state.allEvents;
                newAllEvents.splice(selectedEventIndexInAllEvents, 1, newSelectedEvent);
                
                return {
                    ...state,
                    allEvents: [ ...newAllEvents ]
                }
            }

            // Selected event could not found!
            break;

        case SET_EVENT_ACTIVE:

            return {
                ...state,
                activeEventIds: [ ...state.activeEventIds, action.eventId ]
            }

        case SET_EVENT_INACTIVE:

            return {
                ...state,
                activeEventIds: [ ...state.activeEventIds.filter(activeEvent => activeEvent !== action.eventId) ]
            }

        case RESET_TICKETS_COUNT:
            const eventAddedToCart = state.allEvents.find(event => event.id === action.eventId);

            if (eventAddedToCart instanceof EventShowcaseEvent) {
                const selectedEventIndexInAllEvents = state.allEvents.indexOf(eventAddedToCart);

                eventAddedToCart.totalPrice = 0;
                eventAddedToCart.normalTicket.count = 0;
                eventAddedToCart.vipTicket.count = 0;

                const newAllEvents = state.allEvents;
                newAllEvents.splice(selectedEventIndexInAllEvents, 1, eventAddedToCart);

                return {
                    ...state,
                    allEvents: [ ...newAllEvents ]
                }
            }

            // Event added to cart could not found!
            break;
    }

    return state;
}