import { EventShowcaseEvent } from '../../models/eventShowcase/event';
import { IThisWeekEventsActions } from './../../models/interfaces/store/actions/thisWeekEvents';
import { IThisWeekEventsState } from './../../models/interfaces/store/states/thisWeekEvents';
import { 
    THIS_WEEK_EVENTS_FETCH_FAIL, 
    THIS_WEEK_EVENTS_FETCH_START, 
    THIS_WEEK_EVENTS_FETCH_SUCCESS,
    THIS_WEEK_EVENTS_ADD_NORMAL_TICKET,
    THIS_WEEK_EVENTS_ADD_VIP_TICKET,
    THIS_WEEK_EVENTS_REMOVE_NORMAL_TICKET,
    THIS_WEEK_EVENTS_REMOVE_VIP_TICKET,
    THIS_WEEK_EVENTS_RESET_TICKETS
} from "../actions/thisWeekEvents"

const initialState: IThisWeekEventsState = {
    events: [],
    loading: false,
    error: null
}

export const thisWeekEventsReducer = (state = initialState, action: IThisWeekEventsActions): IThisWeekEventsState => {
    switch(action.type) {
        case THIS_WEEK_EVENTS_FETCH_START:
            return {
                ...state,
                loading: true
            }

        case THIS_WEEK_EVENTS_FETCH_SUCCESS:
            const { events } = action;

            return {
                ...state,
                events,
                loading: false,
                error: null
            }

        case THIS_WEEK_EVENTS_FETCH_FAIL:
            const { error } = action;

            return {
                ...state,
                error,
                loading: false
            }
        
        case THIS_WEEK_EVENTS_ADD_NORMAL_TICKET:
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

        case THIS_WEEK_EVENTS_ADD_VIP_TICKET:
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

        case THIS_WEEK_EVENTS_REMOVE_NORMAL_TICKET:
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

        case THIS_WEEK_EVENTS_REMOVE_VIP_TICKET:
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

        case THIS_WEEK_EVENTS_RESET_TICKETS:
            const resettedTicketsEvent = action.eventData;

            if (resettedTicketsEvent instanceof EventShowcaseEvent) {
                resettedTicketsEvent.normalTicket.count = 0;
                resettedTicketsEvent.vipTicket.count = 0;
                resettedTicketsEvent.totalPrice = 0;
            }

            return {
                ...state,
                events: [ ...state.events ]
            }
    }

    return state;
}