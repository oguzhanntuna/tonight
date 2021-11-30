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
                const moduleType = addedNormalTicketEvent.moduleType;

                addedNormalTicketEvent.normalTicket.count = addedNormalTicketEvent.normalTicket.count + 1;
                addedNormalTicketEvent.totalPrice = addedNormalTicketEvent.totalPrice + addedNormalTicketEvent.normalTicket.price;

                const newCommonState = {
                    ...state,
                    allEvents: [ ...state.allEvents ],
                }

                switch (moduleType) {
                    case 'buy-now': 

                        return {
                            ...newCommonState,
                            buyNowEvents: [ ...state.buyNowEvents ]
                        }
                    
                    case 'recently-added': 

                        return {
                            ...newCommonState,
                            recentlyAddedEvents: [ ...state.recentlyAddedEvents ]
                        }

                    case 'this-week': 

                        return {
                            ...newCommonState,
                            thisWeekEvents: [ ...state.thisWeekEvents ]
                        }
                }
            }

            // Selected event could not found!
            break;

        case ADD_VIP_TICKET:
            const addedVipTicketEvent = state.allEvents.find(event => event.id === action.eventId);
            
            if (addedVipTicketEvent instanceof EventShowcaseEvent) {
                const moduleType = addedVipTicketEvent.moduleType;

                addedVipTicketEvent.vipTicket.count = addedVipTicketEvent.vipTicket.count + 1;
                addedVipTicketEvent.totalPrice = addedVipTicketEvent.totalPrice + addedVipTicketEvent.vipTicket.price;

                const newCommonState = {
                    ...state,
                    allEvents: [ ...state.allEvents ],
                }
                
                switch (moduleType) {
                    case 'buy-now': 

                        return {
                            ...newCommonState,
                            buyNowEvents: [ ...state.buyNowEvents ]
                        }
                    
                    case 'recently-added': 

                        return {
                            ...newCommonState,
                            recentlyAddedEvents: [ ...state.recentlyAddedEvents ]
                        }

                    case 'this-week': 

                        return {
                            ...newCommonState,
                            thisWeekEvents: [ ...state.thisWeekEvents ]
                        }
                }
            }

            // Selected event could not found!
            break;

        case REMOVE_NORMAL_TICKET:
            const removedNormalTicketEvent = state.allEvents.find(event => event.id === action.eventId);
            
            if (removedNormalTicketEvent instanceof EventShowcaseEvent) {
                const moduleType = removedNormalTicketEvent.moduleType;

                removedNormalTicketEvent.normalTicket.count = removedNormalTicketEvent.normalTicket.count - 1;
                removedNormalTicketEvent.totalPrice = removedNormalTicketEvent.totalPrice - removedNormalTicketEvent.normalTicket.price;
                
                const newCommonState = {
                    ...state,
                    allEvents: [ ...state.allEvents ],
                }

                switch (moduleType) {
                    case 'buy-now': 

                        return {
                            ...newCommonState,
                            buyNowEvents: [ ...state.buyNowEvents ]
                        }
                    
                    case 'recently-added': 

                        return {
                            ...newCommonState,
                            recentlyAddedEvents: [ ...state.recentlyAddedEvents ]
                        }

                    case 'this-week': 

                        return {
                            ...newCommonState,
                            thisWeekEvents: [ ...state.thisWeekEvents ]
                        }
                }
            }

            // Selected event could not found!
            break;
        
        case REMOVE_VIP_TICKET:
            const removedVipTicketEvent = state.allEvents.find(event => event.id === action.eventId);
            
            if (removedVipTicketEvent instanceof EventShowcaseEvent) {
                const moduleType = removedVipTicketEvent.moduleType;

                removedVipTicketEvent.vipTicket.count = removedVipTicketEvent.vipTicket.count - 1;
                removedVipTicketEvent.totalPrice = removedVipTicketEvent.totalPrice - removedVipTicketEvent.vipTicket.price;
                
                const newCommonState = {
                    ...state,
                    allEvents: [ ...state.allEvents ],
                }

                switch (moduleType) {
                    case 'buy-now': 

                        return {
                            ...newCommonState,
                            buyNowEvents: [ ...state.buyNowEvents ]
                        }
                    
                    case 'recently-added': 

                        return {
                            ...newCommonState,
                            recentlyAddedEvents: [ ...state.recentlyAddedEvents ]
                        }

                    case 'this-week': 

                        return {
                            ...newCommonState,
                            thisWeekEvents: [ ...state.thisWeekEvents ]
                        }
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
                const moduleType = eventAddedToCart.moduleType;

                eventAddedToCart.totalPrice = 0;
                eventAddedToCart.normalTicket.count = 0;
                eventAddedToCart.vipTicket.count = 0;

                const newCommonState = {
                    ...state,
                    allEvents: [ ...state.allEvents ],
                }

                switch (moduleType) {
                    case 'buy-now': 

                        return {
                            ...newCommonState,
                            buyNowEvents: [ ...state.buyNowEvents ]
                        }
                    
                    case 'recently-added': 

                        return {
                            ...newCommonState,
                            recentlyAddedEvents: [ ...state.recentlyAddedEvents ]
                        }

                    case 'this-week': 

                        return {
                            ...newCommonState,
                            thisWeekEvents: [ ...state.thisWeekEvents ]
                        }
                }
            }

            // Event added to cart could not found!
            break;
    }

    return state;
}