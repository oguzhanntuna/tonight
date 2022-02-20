import axios from "axios";

import { EventShowcaseEvent } from "../../models/eventShowcase/event";

export const SET_BUY_NOW_EVENTS = 'SET_BUY_NOW_EVENTS';
export const BUY_NOW_EVENTS_FETCH_START = 'BUY_NOW_EVENTS_FETCH_START';
export const BUY_NOW_EVENTS_FETCH_SUCCESS = 'BUY_NOW_EVENTS_FETCH_SUCCESS';
export const BUY_NOW_EVENTS_FETCH_FAIL = 'BUY_NOW_EVENTS_FETCH_FAIL';

const fetchStart = () => {
    return { type: BUY_NOW_EVENTS_FETCH_START }
}

const fetchSuccess = (events: Array<EventShowcaseEvent>) => {
    return {
        type: BUY_NOW_EVENTS_FETCH_SUCCESS,
        events
    }
}

const fetchFail = (error: string) => {
    return { 
        type: BUY_NOW_EVENTS_FETCH_FAIL,
        error
    }
}

export const fetchBuyNowEvents = () => {
    return async (dispatch: any) => {
        dispatch(fetchStart());
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

                dispatch(fetchSuccess(buyNowEvents))
            })
            .catch(error => dispatch(fetchFail(error)));
    }
}