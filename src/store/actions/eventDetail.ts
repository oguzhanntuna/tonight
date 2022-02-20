import { IEventTicketsActions } from './../../models/interfaces/store/actions/eventTickets';
import axios from "axios";

import { EventShowcaseEvent } from "../../models/eventShowcase/event";
import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/eventShowcase';

export const SET_EVENT_DETAIL = 'SET_EVENT_DETAIL';
export const EVENT_DETAIL_FETCH_START = 'EVENT_DETAIL_FETCH_START';
export const EVENT_DETAIL_FETCH_SUCCESS = 'EVENT_DETAIL_FETCH_SUCCESS';
export const EVENT_DETAIL_FETCH_FAIL = 'EVENT_DETAIL_FETCH_FAIL';
export const EVENT_DETAIL_ADD_NORMAL_TICKET = 'EVENT_DETAIL_ADD_NORMAL_TICKET';
export const EVENT_DETAIL_ADD_VIP_TICKET = 'EVENT_DETAIL_ADD_VIP_TICKET';
export const EVENT_DETAIL_REMOVE_NORMAL_TICKET = 'EVENT_DETAIL_REMOVE_NORMAL_TICKET';
export const EVENT_DETAIL_REMOVE_VIP_TICKET = 'EVENT_DETAIL_REMOVE_VIP_TICKET';

const fetchStart = () => {
    return { type: EVENT_DETAIL_FETCH_START }
}

const fetchSuccess = (eventDetail: EventShowcaseEvent | null) => {
    return {
        type: EVENT_DETAIL_FETCH_SUCCESS,
        eventDetail
    }
}

const fetchFail = (error: string) => {
    return { 
        type: EVENT_DETAIL_FETCH_FAIL,
        error
    }
}

export const fetchEventDetail = (eventName: string) => {
    return async (dispatch: any) => {
        dispatch(fetchStart());
        axios.get(`https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/events/${eventName}.json`)
            .then(response => {
                const eventData = response.data;
                let eventDetail: EventShowcaseEvent | null = null;

                if (eventData) {
                    eventDetail = new EventShowcaseEvent( 
                        eventData.id,
                        eventData.title,
                        eventData.imageUrl,
                        eventData.location,
                        eventData.date,
                        eventData.redirectUrl,
                        eventData.normalTicket,
                        eventData.vipTicket,
                        eventData.totalPrice,
                        'event-detail'
                    );
                }
                
                dispatch(fetchSuccess(eventDetail))
            })
            .catch(error => dispatch(fetchFail(error)));
    } 
}

export const addNormalTicket = (eventData: IEventShowcaseEvent): IEventTicketsActions => {
    
    return { type: EVENT_DETAIL_ADD_NORMAL_TICKET, eventData};
}

export const addVipTicket = (eventData: IEventShowcaseEvent): IEventTicketsActions => {

    return { type: EVENT_DETAIL_ADD_VIP_TICKET, eventData};
}

export const removeNormalTicket = (eventData: IEventShowcaseEvent): IEventTicketsActions => {

    return { type: EVENT_DETAIL_REMOVE_NORMAL_TICKET, eventData };
}

export const removeVipTicket = (eventData: IEventShowcaseEvent): IEventTicketsActions => {

    return { type: EVENT_DETAIL_REMOVE_VIP_TICKET, eventData };
}