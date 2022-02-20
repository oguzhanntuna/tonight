import axios from "axios";

import { EventShowcaseEvent } from "../../models/eventShowcase/event";
import { IEventShowcaseEvent } from "../../models/interfaces/eventShowcase/eventShowcase";
import { IEventsAction } from "../../models/interfaces/store/actions/events";

export const SET_RECENTLY_ADDED_EVENTS = 'SET_RECENTLY_ADDED_EVENTS';
export const SET_BUY_NOW_EVENTS = 'SET_BUY_NOW_EVENTS';
export const SET_ALL_EVENTS = 'SET_ALL_EVENTS';
export const SET_EVENT_DETAIL = 'SET_EVENT_DETAIL';
export const ADD_NORMAL_TICKET = 'ADD_NORMAL_TICKET';
export const ADD_VIP_TICKET = 'ADD_VIP_TICKET';
export const REMOVE_NORMAL_TICKET = 'REMOVE_NORMAL_TICKET';
export const REMOVE_VIP_TICKET = 'REMOVE_VIP_TICKET';
export const RESET_TICKETS_COUNT = 'RESET_TICKETS_COUNT';

export const fetchRecentlyAddedEvents = () => {
    return async (dispatch: any) => {
        axios.get('https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/modules/recently-added.json')
            .then(response => {
                const moduleData = response.data;
                const recentlyAddedEvents: Array<EventShowcaseEvent> = [];

                if (moduleData) {
                    for (const event in moduleData) {
                        recentlyAddedEvents.push(new EventShowcaseEvent(
                            moduleData[event].id,
                            moduleData[event].title,
                            moduleData[event].imageUrl,
                            moduleData[event].location,
                            moduleData[event].date,
                            moduleData[event].redirectUrl,
                            moduleData[event].normalTicket,
                            moduleData[event].vipTicket,
                            moduleData[event].totalPrice,
                            'recently-added'
                        ));
                    }
                }

                dispatch({
                    type: SET_RECENTLY_ADDED_EVENTS,
                    recentlyAddedEvents: recentlyAddedEvents
                });
            })
            .catch(error => console.log(error))
    }
}

export const fetchBuyNowEvents = () => {
    return async (dispatch: any) => {
        axios.get('https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/modules/buy-now.json')
            .then(response => {
                const moduleData = response.data;
                const buyNowEvents: Array<EventShowcaseEvent> = [];

                if (moduleData) {
                    for (const event in moduleData) {
                        buyNowEvents.push(new EventShowcaseEvent(
                            moduleData[event].id,
                            moduleData[event].title,
                            moduleData[event].imageUrl,
                            moduleData[event].location,
                            moduleData[event].date,
                            moduleData[event].redirectUrl,
                            moduleData[event].normalTicket,
                            moduleData[event].vipTicket,
                            moduleData[event].totalPrice,
                            'buy-now'
                        ));
                    }
                }

                dispatch({
                    type: SET_BUY_NOW_EVENTS,
                    buyNowEvents: buyNowEvents
                });
            })
            .catch(error => console.log(error))
    }
}

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