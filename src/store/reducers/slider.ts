import { ISliderActions } from './../../models/interfaces/store/actions/slider';
import { ISliderState } from "../../models/interfaces/store/states/slider";

import { 
    SLIDER_EVENTS_FETCH_FAIL, 
    SLIDER_EVENTS_FETCH_START, 
    SLIDER_EVENTS_FETCH_SUCCESS 
} from "../actions/slider";

const initialState: ISliderState = {
    sliderEvents: [],
    loading: false,
    error: null
}

export const sliderReducer = (state = initialState, action: ISliderActions): ISliderState => {
    switch(action.type) {
        case SLIDER_EVENTS_FETCH_START:
            return {
                ...state,
                loading: true
            }

        case SLIDER_EVENTS_FETCH_SUCCESS:
            const { sliderEvents } = action;

            return {
                ...state,
                sliderEvents,
                error: null,
                loading: false
            }

        case SLIDER_EVENTS_FETCH_FAIL:
            const { error } = action;

            return {
                ...state,
                error,
                loading: false
            }
    }

    return state;
}