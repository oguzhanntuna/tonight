import { IEventsAction } from "../../models/interfaces/store/actions/events";

export const ADD_NORMAL_TICKET = 'ADD_NORMAL_TICKET';
export const ADD_VIP_TICKET = 'ADD_VIP_TICKET';
export const REMOVE_NORMAL_TICKET = 'REMOVE_NORMAL_TICKET';
export const REMOVE_VIP_TICKET = 'REMOVE_VIP_TICKET';

export const addNormalTicket = (eventId: number): IEventsAction => {
    
    return { type: ADD_NORMAL_TICKET, eventId};
}

export const addVipTicket = (eventId: number): IEventsAction => {

    return { type: ADD_VIP_TICKET, eventId};
}

export const removeNormalTicket = (eventId: number): IEventsAction => {

    return { type: REMOVE_NORMAL_TICKET, eventId };
}

export const removeVipTicket = (eventId: number): IEventsAction => {

    return { type: REMOVE_VIP_TICKET, eventId };
}