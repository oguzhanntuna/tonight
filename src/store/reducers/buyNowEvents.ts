import { EventShowcaseEvent } from '../../models/eventShowcase/event';
import { IBuyNowEventsActions } from './../../models/interfaces/store/actions/buyNowEvents';
import { IBuyNowEventsState } from './../../models/interfaces/store/states/buyNowEvents';
import { 
    BUY_NOW_EVENTS_ADD_NORMAL_TICKET,
    BUY_NOW_EVENTS_ADD_VIP_TICKET,
    BUY_NOW_EVENTS_FETCH_FAIL, 
    BUY_NOW_EVENTS_FETCH_START, 
    BUY_NOW_EVENTS_FETCH_SUCCESS, 
    BUY_NOW_EVENTS_REMOVE_NORMAL_TICKET,
    BUY_NOW_EVENTS_REMOVE_VIP_TICKET
} from "../actions/buyNowEvents";

const initialState: IBuyNowEventsState = {
    events: [],
    loading: false,
    error: null
}

export const buyNowEventsReducer = (state = initialState, action: IBuyNowEventsActions): IBuyNowEventsState => {
    switch(action.type) {
        case BUY_NOW_EVENTS_FETCH_START:
            return {
                ...state,
                loading: true
            }

        case BUY_NOW_EVENTS_FETCH_SUCCESS:
            const { events } = action;

            return {
                ...state,
                events,
                loading: false,
                error: null
            }

        case BUY_NOW_EVENTS_FETCH_FAIL:
            const { error } = action;

            return {
                ...state,
                error,
                loading: false
            }

        case BUY_NOW_EVENTS_ADD_NORMAL_TICKET:
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

        case BUY_NOW_EVENTS_ADD_VIP_TICKET:
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

        case BUY_NOW_EVENTS_REMOVE_NORMAL_TICKET:
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

        case BUY_NOW_EVENTS_REMOVE_VIP_TICKET:
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