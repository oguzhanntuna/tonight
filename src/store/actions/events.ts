import { IEventsAction } from "../../models/interfaces/store/actions/events";

export const ADD_NORMAL_TICKET = 'ADD_NORMAL_TICKET';
export const ADD_VIP_TICKET = 'ADD_VIP_TICKET';
export const REMOVE_NORMAL_TICKET = 'REMOVE_NORMAL_TICKET';
export const REMOVE_VIP_TICKET = 'REMOVE_VIP_TICKET';
export const SET_EVENT_ACTIVE = 'SET_EVENT_ACTIVE';
export const SET_EVENT_INACTIVE = 'SET_EVENT_INACTIVE';
export const RESET_TICKETS_COUNT = 'RESET_TICKETS_COUNT';

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

export const setEventActive = (eventId: number): IEventsAction => {

    return { type: SET_EVENT_ACTIVE, eventId };
}

export const setEventInactive = (eventId: number): IEventsAction => {

    return { type: SET_EVENT_INACTIVE, eventId };
}

export const resetTicketsCount = (eventId: number): IEventsAction => {

    return { type: RESET_TICKETS_COUNT, eventId };
}