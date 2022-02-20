import axios from "axios";

import { EventShowcaseEvent } from "../../models/eventShowcase/event";
import { IEventShowcaseEvent } from "../../models/interfaces/eventShowcase/eventShowcase";
import { IEventsAction } from "../../models/interfaces/store/actions/events";

export const SET_ALL_EVENTS = 'SET_ALL_EVENTS';
export const SET_EVENT_DETAIL = 'SET_EVENT_DETAIL';
export const ADD_NORMAL_TICKET = 'ADD_NORMAL_TICKET';
export const ADD_VIP_TICKET = 'ADD_VIP_TICKET';
export const REMOVE_NORMAL_TICKET = 'REMOVE_NORMAL_TICKET';
export const REMOVE_VIP_TICKET = 'REMOVE_VIP_TICKET';
export const RESET_TICKETS_COUNT = 'RESET_TICKETS_COUNT';

export const fetchAllEvents = () => {
    return async (dispatch: any) => {
        axios.get('https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/events.json')
            .then(response => {
                const eventsData = response.data;
                const allEvents: Array<EventShowcaseEvent> = [];

                if (eventsData) {
                    for (const event in eventsData) {
                        allEvents.push(new EventShowcaseEvent( 
                            eventsData[event].id,
                            eventsData[event].title,
                            eventsData[event].imageUrl,
                            eventsData[event].location,
                            eventsData[event].date,
                            eventsData[event].redirectUrl,
                            eventsData[event].normalTicket,
                            eventsData[event].vipTicket,
                            eventsData[event].totalPrice,
                            'all-events'
                        ))
                    }
                }

                dispatch({
                    type: SET_ALL_EVENTS,
                    allEvents
                })
            })
            .catch(error => console.log(error));
    }
}

export const fetchEventDetail = (event: string) => {
    return async (dispatch: any) => {
        axios.get(`https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/events/${event}.json`)
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
                
                dispatch({
                    type: SET_EVENT_DETAIL,
                    eventDetail
                })
            })
            .catch(error => console.log(error));
    } 
}

export const addNormalTicket = (eventData: IEventShowcaseEvent): IEventsAction => {
    
    return { type: ADD_NORMAL_TICKET, eventData};
}

export const addVipTicket = (eventData: IEventShowcaseEvent): IEventsAction => {

    return { type: ADD_VIP_TICKET, eventData};
}

export const removeNormalTicket = (eventData: IEventShowcaseEvent): IEventsAction => {

    return { type: REMOVE_NORMAL_TICKET, eventData };
}

export const removeVipTicket = (eventData: IEventShowcaseEvent): IEventsAction => {

    return { type: REMOVE_VIP_TICKET, eventData };
}

export const resetTicketsCount = (eventData: IEventShowcaseEvent): IEventsAction => {

    return { type: RESET_TICKETS_COUNT, eventData };
}