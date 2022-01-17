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
import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/eventShowcase';

const initialState: IEventsState = {
    allEvents: [],
    buyNowEvents: [],
    recentlyAddedEvents: [],
    thisWeekEvents: [],
    eventDetail: null
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
            const addedNormalTicketEvent = action.eventData;
        
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

                    case 'event-detail':

                    const updatedEventDetail = new EventShowcaseEvent(
                        addedNormalTicketEvent.id,
                        addedNormalTicketEvent.title,
                        addedNormalTicketEvent.imageUrl,
                        addedNormalTicketEvent.location,
                        addedNormalTicketEvent.date,
                        addedNormalTicketEvent.url,
                        addedNormalTicketEvent.normalTicket,
                        addedNormalTicketEvent.vipTicket,
                        addedNormalTicketEvent.totalPrice,
                        addedNormalTicketEvent.moduleType
                    ) 

                    return {
                        ...state,
                        eventDetail: updatedEventDetail
                    }
                }
            }

            // Selected event could not found!
            break;

        case ADD_VIP_TICKET:
            const addedVipTicketEvent = action.eventData;
            
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

                    case 'event-detail':

                        const updatedEventDetail = new EventShowcaseEvent(
                            addedVipTicketEvent.id,
                            addedVipTicketEvent.title,
                            addedVipTicketEvent.imageUrl,
                            addedVipTicketEvent.location,
                            addedVipTicketEvent.date,
                            addedVipTicketEvent.url,
                            addedVipTicketEvent.normalTicket,
                            addedVipTicketEvent.vipTicket,
                            addedVipTicketEvent.totalPrice,
                            addedVipTicketEvent.moduleType
                        ) 

                        return {
                            ...state,
                            eventDetail: updatedEventDetail
                        }
                }
            }

            // Selected event could not found!
            break;

        case REMOVE_NORMAL_TICKET:
            const removedNormalTicketEvent = action.eventData;
            
            if (removedNormalTicketEvent instanceof EventShowcaseEvent) {
                const moduleType = removedNormalTicketEvent.moduleType;

                removedNormalTicketEvent.normalTicket.count = removedNormalTicketEvent.normalTicket.count - 1;
                removedNormalTicketEvent.totalPrice = removedNormalTicketEvent.totalPrice - removedNormalTicketEvent.normalTicket.price;

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

                    case 'event-detail':

                        const updatedEventDetail = new EventShowcaseEvent(
                            removedNormalTicketEvent.id,
                            removedNormalTicketEvent.title,
                            removedNormalTicketEvent.imageUrl,
                            removedNormalTicketEvent.location,
                            removedNormalTicketEvent.date,
                            removedNormalTicketEvent.url,
                            removedNormalTicketEvent.normalTicket,
                            removedNormalTicketEvent.vipTicket,
                            removedNormalTicketEvent.totalPrice,
                            removedNormalTicketEvent.moduleType
                        ) 
    
                        return {
                            ...state,
                            eventDetail: updatedEventDetail
                        }
                }
            }

            // Selected event could not found!
            break;
        
        case REMOVE_VIP_TICKET:
            const removedVipTicketEvent = action.eventData;
            
            if (removedVipTicketEvent instanceof EventShowcaseEvent) {
                const moduleType = removedVipTicketEvent.moduleType;

                removedVipTicketEvent.vipTicket.count = removedVipTicketEvent.vipTicket.count - 1;
                removedVipTicketEvent.totalPrice = removedVipTicketEvent.totalPrice - removedVipTicketEvent.vipTicket.price;

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

                    case 'event-detail':

                        const updatedEventDetail = new EventShowcaseEvent(
                            removedVipTicketEvent.id,
                            removedVipTicketEvent.title,
                            removedVipTicketEvent.imageUrl,
                            removedVipTicketEvent.location,
                            removedVipTicketEvent.date,
                            removedVipTicketEvent.url,
                            removedVipTicketEvent.normalTicket,
                            removedVipTicketEvent.vipTicket,
                            removedVipTicketEvent.totalPrice,
                            removedVipTicketEvent.moduleType
                        ) 
    
                        return {
                            ...state,
                            eventDetail: updatedEventDetail
                        }
                }
            }

            // Selected event could not found!
            break;

        case RESET_TICKETS_COUNT:
            const eventAddedToCart = action.eventData;

            if (eventAddedToCart instanceof EventShowcaseEvent) {
                const moduleType = eventAddedToCart.moduleType;

                eventAddedToCart.totalPrice = 0;
                eventAddedToCart.normalTicket.count = 0;
                eventAddedToCart.vipTicket.count = 0;

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

                    case 'event-detail':

                        const updatedEventDetail = new EventShowcaseEvent(
                            eventAddedToCart.id,
                            eventAddedToCart.title,
                            eventAddedToCart.imageUrl,
                            eventAddedToCart.location,
                            eventAddedToCart.date,
                            eventAddedToCart.url,
                            eventAddedToCart.normalTicket,
                            eventAddedToCart.vipTicket,
                            eventAddedToCart.totalPrice,
                            eventAddedToCart.moduleType
                        ) 
    
                        return {
                            ...state,
                            eventDetail: updatedEventDetail
                        }
                }
            }

            // Event added to cart could not found!
            break;
    }

    return state;
}