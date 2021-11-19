export const ADD_NORMAL_TICKET = 'ADD_NORMAL_TICKET';
export const ADD_VIP_TICKET = 'ADD_VIP_TICKET';
export const REMOVE_NORMAL_TICKET = 'REMOVE_NORMAL_TICKET';
export const REMOVE_VIP_TICKET = 'REMOVE_VIP_TICKET';

export const addNormalTicket = (eventId: number) => {
    
    return { type: ADD_NORMAL_TICKET, eventId}
}

export const addVipTicket = (eventId: number) => {

    return { type: ADD_VIP_TICKET, eventId}
}

export const removeNormalTicket = (eventId: number) => {

    return { type: REMOVE_NORMAL_TICKET, eventId }
}

export const removeVipTicket = (eventId: number) => {

    return { type: REMOVE_VIP_TICKET, eventId }
}