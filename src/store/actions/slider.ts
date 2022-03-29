import axios from 'axios';

import { ISliderEvent } from '../../models/interfaces/sliderEvent/slider';
import { SliderEvent } from '../../models/sliderEvent/sliderEvent';

export const SLIDER_EVENTS_FETCH_START = 'SLIDER_EVENTS_FETCH_START';
export const SLIDER_EVENTS_FETCH_SUCCESS = 'SLIDER_EVENTS_FETCH_SUCCESS';
export const SLIDER_EVENTS_FETCH_FAIL = 'SLIDER_EVENTS_FETCH_FAIL';

const fetchStart = () => {
    return { type: SLIDER_EVENTS_FETCH_START }
}

const fetchSuccess = (sliderEvents: Array<ISliderEvent>) => {
    return {
        type: SLIDER_EVENTS_FETCH_SUCCESS,
        sliderEvents
    }
}

const fetchFail = (error: string) => {
    return { 
        type: SLIDER_EVENTS_FETCH_FAIL,
        error
    }
}

export const fetchSliderEvents = () => {
    return async (dispatch: any) => {
        const sliderEventsUrl = 'https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/slider-events.json';

        dispatch(fetchStart());
        axios.get(sliderEventsUrl)
            .then(response => {
                const fetchedData = response.data;
                const sliderData: Array<ISliderEvent> = [];

                for (const data in fetchedData) {
                    sliderData.push(new SliderEvent(
                        fetchedData[data].id,
                        fetchedData[data].imageUrl,
                        fetchedData[data].moduleType,
                        fetchedData[data].redirectUrl
                    ));
                }

                dispatch(fetchSuccess(sliderData));
            })
            .catch(error => dispatch(fetchFail(error)));
    }
}