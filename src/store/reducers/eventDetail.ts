import { IEventDetailActions } from './../../models/interfaces/store/actions/eventDetail';
import { IEventDetailState } from './../../models/interfaces/store/states/eventDetail';
import { 
    EVENT_DETAIL_ADD_NORMAL_TICKET,
    EVENT_DETAIL_ADD_VIP_TICKET,
    EVENT_DETAIL_FETCH_FAIL, 
    EVENT_DETAIL_FETCH_START, 
    EVENT_DETAIL_FETCH_SUCCESS, 
    EVENT_DETAIL_REMOVE_NORMAL_TICKET,
    EVENT_DETAIL_REMOVE_VIP_TICKET
} from "../actions/eventDetail";
import { EventShowcaseEvent } from '../../models/eventShowcase/event';

const initialState: IEventDetailState = {
    event: null,
    loading: false,
    error: null
}

export const eventDetailReducer = (state = initialState, action: IEventDetailActions): IEventDetailState => {
    switch(action.type) {
        case EVENT_DETAIL_FETCH_START:
            return {
                ...state,
                loading: true
            }

        case EVENT_DETAIL_FETCH_SUCCESS:
            const { eventDetail } = action;

            return {
                ...state,
                event: eventDetail,
                loading: false
            }

        case EVENT_DETAIL_FETCH_FAIL:
            const { error } = action;

            return {
                ...state,
                error,
                loading: false
            }




        case EVENT_DETAIL_ADD_NORMAL_TICKET:
            const addedNormalTicketEvent = action.eventDetail;
        
            if (addedNormalTicketEvent instanceof EventShowcaseEvent) {
                addedNormalTicketEvent.normalTicket.count = addedNormalTicketEvent.normalTicket.count + 1;
                addedNormalTicketEvent.totalPrice = addedNormalTicketEvent.totalPrice + addedNormalTicketEvent.normalTicket.price;


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
                    event: updatedEventDetail
                }
            }

            break;

        case EVENT_DETAIL_ADD_VIP_TICKET:
            const addedVipTicketEvent = action.eventDetail;
            
            if (addedVipTicketEvent instanceof EventShowcaseEvent) {
                addedVipTicketEvent.vipTicket.count = addedVipTicketEvent.vipTicket.count + 1;
                addedVipTicketEvent.totalPrice = addedVipTicketEvent.totalPrice + addedVipTicketEvent.vipTicket.price;

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
                    event: updatedEventDetail
                }
            }

            break;

        case EVENT_DETAIL_REMOVE_NORMAL_TICKET:
            const removedNormalTicketEvent = action.eventDetail;
            
            if (removedNormalTicketEvent instanceof EventShowcaseEvent) {
                removedNormalTicketEvent.normalTicket.count = removedNormalTicketEvent.normalTicket.count - 1;
                removedNormalTicketEvent.totalPrice = removedNormalTicketEvent.totalPrice - removedNormalTicketEvent.normalTicket.price;

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
                    event: updatedEventDetail
                }
            }

            break;
        
        case EVENT_DETAIL_REMOVE_VIP_TICKET:
            const removedVipTicketEvent = action.eventDetail;
            
            if (removedVipTicketEvent instanceof EventShowcaseEvent) {
                removedVipTicketEvent.vipTicket.count = removedVipTicketEvent.vipTicket.count - 1;
                removedVipTicketEvent.totalPrice = removedVipTicketEvent.totalPrice - removedVipTicketEvent.vipTicket.price;

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
                    event: updatedEventDetail
                }
            }

            break;
    }

    return state;
}