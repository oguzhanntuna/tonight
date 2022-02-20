import { IThisWeekEventsActions } from './../../models/interfaces/store/actions/thisWeekEvents';
import { IThisWeekEventsState } from './../../models/interfaces/store/states/thisWeekEvents';
import { 
    THIS_WEEK_EVENTS_FETCH_FAIL, 
    THIS_WEEK_EVENTS_FETCH_START, 
    THIS_WEEK_EVENTS_FETCH_SUCCESS 
} from "../actions/thisWeekEvents"

const initialState: IThisWeekEventsState = {
    events: [],
    loading: false,
    error: null
}

export const thisWeekEventsReducer = (state = initialState, action: IThisWeekEventsActions): IThisWeekEventsState => {
    switch(action.type) {
        case THIS_WEEK_EVENTS_FETCH_START:
            return {
                ...state,
                loading: true
            }

        case THIS_WEEK_EVENTS_FETCH_SUCCESS:
            const { events } = action;

            return {
                ...state,
                events,
                loading: false,
                error: null
            }

        case THIS_WEEK_EVENTS_FETCH_FAIL:
            const { error } = action;

            return {
                ...state,
                error,
                loading: false
            }
    }

    return state;
}