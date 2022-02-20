import { IRecentlyAddedEventsActions } from './../../models/interfaces/store/actions/recentlyAddedEvents';
import { IRecentlyAddedEventsState } from './../../models/interfaces/store/states/recentlyAddedEvents';
import { 
    RECENTLY_ADDED_EVENTS_FETCH_FAIL, 
    RECENTLY_ADDED_EVENTS_FETCH_START, 
    RECENTLY_ADDED_EVENTS_FETCH_SUCCESS 
} from "../actions/recentlyAddedEvents";

const initialState: IRecentlyAddedEventsState = {
    events: [],
    loading: false,
    error: null
}

export const recentlyAddedEventsReducer = (state = initialState, action: IRecentlyAddedEventsActions): IRecentlyAddedEventsState => {
    switch(action.type) {
        case RECENTLY_ADDED_EVENTS_FETCH_START:
            return {
                ...state,
                loading: true
            }

        case RECENTLY_ADDED_EVENTS_FETCH_SUCCESS:
            const { events } = action;

            return {
                ...state,
                events,
                loading: false,
                error: null
            }

        case RECENTLY_ADDED_EVENTS_FETCH_FAIL:
            const { error } = action;

            return {
                ...state,
                error,
                loading: false
            }
    }

    return state;
}