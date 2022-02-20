import { IBuyNowEventsActions } from './../../models/interfaces/store/actions/buyNowEvents';
import { IBuyNowEventsState } from './../../models/interfaces/store/states/buyNowEvents';
import { 
    BUY_NOW_EVENTS_FETCH_FAIL, 
    BUY_NOW_EVENTS_FETCH_START, 
    BUY_NOW_EVENTS_FETCH_SUCCESS 
} from "../actions/buyNowEvents";

const initialState: IBuyNowEventsState = {
    events: [],
    loading: false,
    error: null
}

export const buyNowEventsReducer = (state = initialState, action: IBuyNowEventsActions): IBuyNowEventsState => {
    switch(action.type) {
        case BUY_NOW_EVENTS_FETCH_START:
            return {
                ...state,
                loading: true
            }

        case BUY_NOW_EVENTS_FETCH_SUCCESS:
            const { events } = action;

            return {
                ...state,
                events,
                loading: false,
                error: null
            }

        case BUY_NOW_EVENTS_FETCH_FAIL:
            const { error } = action;

            return {
                ...state,
                error,
                loading: false
            }
    }

    return state;
}