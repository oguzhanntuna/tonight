import axios from "axios";

import { EventShowcaseEvent } from "../../models/eventShowcase/event";

export const SET_THIS_WEEK_EVENTS = 'SET_THIS_WEEK_EVENTS';
export const THIS_WEEK_EVENTS_FETCH_START = 'THIS_WEEK_EVENTS_FETCH_START';
export const THIS_WEEK_EVENTS_FETCH_SUCCESS = 'THIS_WEEK_EVENTS_FETCH_SUCCESS';
export const THIS_WEEK_EVENTS_FETCH_FAIL = 'THIS_WEEK_EVENTS_FETCH_FAIL';

const fetchStart = () => {
    return { type: THIS_WEEK_EVENTS_FETCH_START }
}

const fetchSuccess = (events: Array<EventShowcaseEvent>) => {
    return {
        type: THIS_WEEK_EVENTS_FETCH_SUCCESS,
        events
    }
}

const fetchFail = (error: string) => {
    return { 
        type: THIS_WEEK_EVENTS_FETCH_FAIL,
        error
    }
}

export const fetchThisWeekEvents = () => {
    return async (dispatch: any) => {
        dispatch(fetchStart());
        axios.get('https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/modules/this-week.json')
            .then(response => {
                const moduleData = response.data;
                const thisWeekEvents: Array<EventShowcaseEvent> = [];

                if (moduleData) {
                    for (const event in moduleData) {
                        thisWeekEvents.push(new EventShowcaseEvent(
                            moduleData[event].id,
                            moduleData[event].title,
                            moduleData[event].imageUrl,
                            moduleData[event].location,
                            moduleData[event].date,
                            moduleData[event].redirectUrl,
                            moduleData[event].normalTicket,
                            moduleData[event].vipTicket,
                            moduleData[event].totalPrice,
                            'this-week'
                        ));
                    }
                }

                dispatch(fetchSuccess(thisWeekEvents));
            })
            .catch(error => dispatch(fetchFail(error)));
    }
}