import { IEventsAction } from './../../models/interfaces/store/actions/events';
import { IEventsState } from '../../models/interfaces/store/states/events';
import { EventShowcaseEvent } from '../../models/eventShowcase/event';

import { 
    SET_THIS_WEEK_EVENTS,
    SET_RECENTLY_ADDED_EVENTS,
    SET_BUY_NOW_EVENTS,
    SET_ALL_EVENTS,
    SET_EVENT_DETAIL,
    ADD_NORMAL_TICKET, 
    ADD_VIP_TICKET, 
    REMOVE_NORMAL_TICKET, 
    REMOVE_VIP_TICKET,  
    RESET_TICKETS_COUNT
} from '../actions/events';

const initialState: IEventsState = {
    allEvents: [],
    buyNowEvents: [],
    recentlyAddedEvents: [],
    thisWeekEvents: [],
    eventDetail: null,
    activeEventIds: []
}

export const eventsReducer = (state = initialState, action: IEventsAction): IEventsState => {
    switch(action.type) {
        case SET_THIS_WEEK_EVENTS:
            const { thisWeekEvents } = action;

            if (thisWeekEvents) {

                return {
                    ...state,
                    thisWeekEvents
                }
            }

            break;
        
        case SET_RECENTLY_ADDED_EVENTS:
            const { recentlyAddedEvents } = action;

            if (recentlyAddedEvents) {

                return {
                    ...state,
                    recentlyAddedEvents
                }
            }
            
            break;
        
        case SET_BUY_NOW_EVENTS:
            const { buyNowEvents } = action;

            if (buyNowEvents) {

                return {
                    ...state,
                    buyNowEvents
                }
            }

            break;

        case SET_ALL_EVENTS:
            const { allEvents } = action;

            if (allEvents) {

                return {
                    ...state,
                    allEvents
                }
            }

            break; 

        case SET_EVENT_DETAIL:
            const { eventDetail } = action;

            if (eventDetail) {

                return {
                    ...state,
                    eventDetail
                }
            }

            break;

        case ADD_NORMAL_TICKET:
            const addedNormalTicketEvent = 
                state.thisWeekEvents.find(event => event.id === action.eventId) ||
                state.recentlyAddedEvents.find(event => event.id === action.eventId) ||
                state.buyNowEvents.find(event => event.id === action.eventId) ||
                state.allEvents.find(event => event.id === action.eventId);
            console.log(addedNormalTicketEvent);
        
            if (addedNormalTicketEvent instanceof EventShowcaseEvent) {
                const moduleType = addedNormalTicketEvent.moduleType;

                addedNormalTicketEvent.normalTicket.count = addedNormalTicketEvent.normalTicket.count + 1;
                addedNormalTicketEvent.totalPrice = addedNormalTicketEvent.totalPrice + addedNormalTicketEvent.normalTicket.price;

                switch (moduleType) {
                    case 'buy-now': 

                        return {
                            ...state,
                            buyNowEvents: [ ...state.buyNowEvents ]
                        }
                    
                    case 'recently-added': 

                        return {
                            ...state,
                            recentlyAddedEvents: [ ...state.recentlyAddedEvents ]
                        }

                    case 'this-week': 

                        return {
                            ...state,
                            thisWeekEvents: [ ...state.thisWeekEvents ]
                        }

                    case 'all-events':

                        return {
                            ...state,
                            allEvents: [ ...state.allEvents ]
                        }
                }
            }

            // Selected event could not found!
            break;

        case ADD_VIP_TICKET:
            const addedVipTicketEvent = 
                state.thisWeekEvents.find(event => event.id === action.eventId) ||
                state.recentlyAddedEvents.find(event => event.id === action.eventId) ||
                state.buyNowEvents.find(event => event.id === action.eventId) ||
                state.allEvents.find(event => event.id === action.eventId);
            
            if (addedVipTicketEvent instanceof EventShowcaseEvent) {
                const moduleType = addedVipTicketEvent.moduleType;

                addedVipTicketEvent.vipTicket.count = addedVipTicketEvent.vipTicket.count + 1;
                addedVipTicketEvent.totalPrice = addedVipTicketEvent.totalPrice + addedVipTicketEvent.vipTicket.price;
                
                switch (moduleType) {
                    case 'buy-now': 

                        return {
                            ...state,
                            buyNowEvents: [ ...state.buyNowEvents ]
                        }
                    
                    case 'recently-added': 

                        return {
                            ...state,
                            recentlyAddedEvents: [ ...state.recentlyAddedEvents ]
                        }

                    case 'this-week': 

                        return {
                            ...state,
                            thisWeekEvents: [ ...state.thisWeekEvents ]
                        }
                    
                    case 'all-events':

                    return {
                        ...state,
                        allEvents: [ ...state.allEvents ]
                    }
                }
            }

            // Selected event could not found!
            break;

        case REMOVE_NORMAL_TICKET:
            const removedNormalTicketEvent = 
                state.thisWeekEvents.find(event => event.id === action.eventId) ||
                state.recentlyAddedEvents.find(event => event.id === action.eventId) ||
                state.buyNowEvents.find(event => event.id === action.eventId) ||
                state.allEvents.find(event => event.id === action.eventId);
            
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

                    case 'all-events':

                        return {
                            ...state,
                            allEvents: [ ...state.allEvents ]
                        }
                }
            }

            // Selected event could not found!
            break;
        
        case REMOVE_VIP_TICKET:
            const removedVipTicketEvent = 
                state.thisWeekEvents.find(event => event.id === action.eventId) ||
                state.recentlyAddedEvents.find(event => event.id === action.eventId) ||
                state.buyNowEvents.find(event => event.id === action.eventId) ||
                state.allEvents.find(event => event.id === action.eventId);
            
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

                    case 'all-events':

                        return {
                            ...state,
                            allEvents: [ ...state.allEvents ]
                        }
                }
            }

            // Selected event could not found!
            break;

        case RESET_TICKETS_COUNT:
            const eventAddedToCart = 
                state.thisWeekEvents.find(event => event.id === action.eventId) ||
                state.recentlyAddedEvents.find(event => event.id === action.eventId) ||
                state.buyNowEvents.find(event => event.id === action.eventId) ||
                state.allEvents.find(event => event.id === action.eventId);

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

                    case 'all-events':

                        return {
                            ...state,
                            allEvents: [ ...state.allEvents ]
                        }
                }
            }

            // Event added to cart could not found!
            break;
    }

    return state;
}