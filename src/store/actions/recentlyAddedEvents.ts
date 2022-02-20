import axios from "axios";

import { EventShowcaseEvent } from "../../models/eventShowcase/event";

export const SET_RECENTLY_ADDED_EVENTS = 'SET_RECENTLY_ADDED_EVENTS';
export const RECENTLY_ADDED_EVENTS_FETCH_START = 'RECENTLY_ADDED_EVENTS_FETCH_START';
export const RECENTLY_ADDED_EVENTS_FETCH_SUCCESS = 'RECENTLY_ADDED_EVENTS_FETCH_SUCCESS';
export const RECENTLY_ADDED_EVENTS_FETCH_FAIL = 'RECENTLY_ADDED_EVENTS_FETCH_FAIL';

const fetchStart = () => {
    return { type: RECENTLY_ADDED_EVENTS_FETCH_START }
}

const fetchSuccess = (events: Array<EventShowcaseEvent>) => {
    return {
        type: RECENTLY_ADDED_EVENTS_FETCH_SUCCESS,
        events
    }
}

const fetchFail = (error: string) => {
    return { 
        type: RECENTLY_ADDED_EVENTS_FETCH_FAIL,
        error
    }
}

export const fetchRecentlyAddedEvents = () => {
    return async (dispatch: any) => {
        dispatch(fetchStart());
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

                dispatch(fetchSuccess(recentlyAddedEvents));
            })
            .catch(error => dispatch(fetchFail(error)));
    }
}