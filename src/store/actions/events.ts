import axios from "axios";
import { EventShowcaseEvent } from "../../models/eventShowcase/event";
import { IEventsAction } from "../../models/interfaces/store/actions/events";

export const SET_EVENTS = 'SET_EVENTS';
export const ADD_NORMAL_TICKET = 'ADD_NORMAL_TICKET';
export const ADD_VIP_TICKET = 'ADD_VIP_TICKET';
export const REMOVE_NORMAL_TICKET = 'REMOVE_NORMAL_TICKET';
export const REMOVE_VIP_TICKET = 'REMOVE_VIP_TICKET';
export const SET_EVENT_ACTIVE = 'SET_EVENT_ACTIVE';
export const SET_EVENT_INACTIVE = 'SET_EVENT_INACTIVE';
export const RESET_TICKETS_COUNT = 'RESET_TICKETS_COUNT';

export const fetchEvents = () => {
    return async (dispatch: any): Promise<void> => {
        axios.get(`https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/events/.json`)
            .then(response => {
                const events = response.data;
                const buyNowEvents: Array<EventShowcaseEvent> = [];
                const recentlyAddedEvents: Array<EventShowcaseEvent> = [];
                const thisWeekEvents: Array<EventShowcaseEvent> = [];

                for (const moduleTypes in events) {
                    switch (moduleTypes) {
                        case 'buy-now':
                            for (const event in events[moduleTypes]) {
                                
                                buyNowEvents.push(new EventShowcaseEvent(
                                    events[moduleTypes][event].id,
                                    events[moduleTypes][event].title,
                                    events[moduleTypes][event].imageUrl,
                                    events[moduleTypes][event].location,
                                    events[moduleTypes][event].date,
                                    events[moduleTypes][event].redirectUrl,
                                    events[moduleTypes][event].normalTicket,
                                    events[moduleTypes][event].vipTicket,
                                    events[moduleTypes][event].totalPrice,
                                    moduleTypes
                                ));
                            }
                            break;
                        
                        case 'recently-added':
                            for (const event in events[moduleTypes]) {

                                recentlyAddedEvents.push(new EventShowcaseEvent(
                                    events[moduleTypes][event].id,
                                    events[moduleTypes][event].title,
                                    events[moduleTypes][event].imageUrl,
                                    events[moduleTypes][event].location,
                                    events[moduleTypes][event].date,
                                    events[moduleTypes][event].redirectUrl,
                                    events[moduleTypes][event].normalTicket,
                                    events[moduleTypes][event].vipTicket,
                                    events[moduleTypes][event].totalPrice,
                                    moduleTypes
                                ));
                            }
                            break;

                        case 'this-week':
                            for (const event in events[moduleTypes]) {

                                thisWeekEvents.push(new EventShowcaseEvent(
                                    events[moduleTypes][event].id,
                                    events[moduleTypes][event].title,
                                    events[moduleTypes][event].imageUrl,
                                    events[moduleTypes][event].location,
                                    events[moduleTypes][event].date,
                                    events[moduleTypes][event].redirectUrl,
                                    events[moduleTypes][event].normalTicket,
                                    events[moduleTypes][event].vipTicket,
                                    events[moduleTypes][event].totalPrice,
                                    moduleTypes
                                ));
                            }
                            break;
                    }
                }

                dispatch({
                    type: SET_EVENTS,
                    allEvents: buyNowEvents.concat(recentlyAddedEvents, thisWeekEvents),
                    buyNowEvents: buyNowEvents,
                    recentlyAddedEvents: recentlyAddedEvents,
                    thisWeekEvents: thisWeekEvents
                });
            })
            .catch(error => console.log(error));
    }
}

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