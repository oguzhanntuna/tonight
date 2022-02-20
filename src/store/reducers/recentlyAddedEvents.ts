import { EventShowcaseEvent } from '../../models/eventShowcase/event';
import { IRecentlyAddedEventsActions } from './../../models/interfaces/store/actions/recentlyAddedEvents';
import { IRecentlyAddedEventsState } from './../../models/interfaces/store/states/recentlyAddedEvents';
import { 
    RECENTLY_ADDED_EVENTS_ADD_NORMAL_TICKET,
    RECENTLY_ADDED_EVENTS_ADD_VIP_TICKET,
    RECENTLY_ADDED_EVENTS_FETCH_FAIL, 
    RECENTLY_ADDED_EVENTS_FETCH_START, 
    RECENTLY_ADDED_EVENTS_FETCH_SUCCESS, 
    RECENTLY_ADDED_EVENTS_REMOVE_NORMAL_TICKET,
    RECENTLY_ADDED_EVENTS_REMOVE_VIP_TICKET
} from "../actions/recentlyAddedEvents";

const initialState: IRecentlyAddedEventsState = {
    events: [],
    loading: false,
    error: null
}

export const recentlyAddedEventsReducer = (state = initialState, action: IRecentlyAddedEventsActions): IRecentlyAddedEventsState => {
    switch(action.type) {
        case RECENTLY_ADDED_EVENTS_FETCH_START:
            return {
                ...state,
                loading: true
            }

        case RECENTLY_ADDED_EVENTS_FETCH_SUCCESS:
            const { events } = action;

            return {
                ...state,
                events,
                loading: false,
                error: null
            }

        case RECENTLY_ADDED_EVENTS_FETCH_FAIL:
            const { error } = action;

            return {
                ...state,
                error,
                loading: false
            }

        case RECENTLY_ADDED_EVENTS_ADD_NORMAL_TICKET:
            const addedNormalTicketEvent = action.eventData;
        
            if (addedNormalTicketEvent instanceof EventShowcaseEvent) {
                addedNormalTicketEvent.normalTicket.count = addedNormalTicketEvent.normalTicket.count + 1;
                addedNormalTicketEvent.totalPrice = addedNormalTicketEvent.totalPrice + addedNormalTicketEvent.normalTicket.price;

                return {
                    ...state,
                    events: [ ...state.events ]
                }
            }

            break;

        case RECENTLY_ADDED_EVENTS_ADD_VIP_TICKET:
            const addedVipTicketEvent = action.eventData;
            
            if (addedVipTicketEvent instanceof EventShowcaseEvent) {
                addedVipTicketEvent.vipTicket.count = addedVipTicketEvent.vipTicket.count + 1;
                addedVipTicketEvent.totalPrice = addedVipTicketEvent.totalPrice + addedVipTicketEvent.vipTicket.price;

                return {
                    ...state,
                    events: [ ...state.events ]
                }
            }    
            
            break;

        case RECENTLY_ADDED_EVENTS_REMOVE_NORMAL_TICKET:
            const removedNormalTicketEvent = action.eventData;
            
            if (removedNormalTicketEvent instanceof EventShowcaseEvent) {
                removedNormalTicketEvent.normalTicket.count = removedNormalTicketEvent.normalTicket.count - 1;
                removedNormalTicketEvent.totalPrice = removedNormalTicketEvent.totalPrice - removedNormalTicketEvent.normalTicket.price;

                return {
                    ...state,
                    events: [ ...state.events ]
                }
            }

            break;

        case RECENTLY_ADDED_EVENTS_REMOVE_VIP_TICKET:
            const removedVipTicketEvent = action.eventData;
            
            if (removedVipTicketEvent instanceof EventShowcaseEvent) {
                removedVipTicketEvent.vipTicket.count = removedVipTicketEvent.vipTicket.count - 1;
                removedVipTicketEvent.totalPrice = removedVipTicketEvent.totalPrice - removedVipTicketEvent.vipTicket.price;

                return {
                    ...state,
                    events: [ ...state.events ]
                }
            }

            break;
    }

    return state;
}