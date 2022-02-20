import { IEventDetailActions } from './../../models/interfaces/store/actions/eventDetail';
import { IEventDetailState } from './../../models/interfaces/store/states/eventDetail';
import { 
    EVENT_DETAIL_FETCH_FAIL, 
    EVENT_DETAIL_FETCH_START, 
    EVENT_DETAIL_FETCH_SUCCESS 
} from "../actions/eventDetail";

const initialState: IEventDetailState = {
    event: null,
    loading: false,
    error: null
}

export const eventDetailReducer = (state = initialState, action: IEventDetailActions): IEventDetailState => {
    switch(action.type) {
        case EVENT_DETAIL_FETCH_START:
            return {
                ...state,
                loading: true
            }

        case EVENT_DETAIL_FETCH_SUCCESS:
            const { eventDetail } = action;

            return {
                ...state,
                event: eventDetail,
                loading: false
            }

        case EVENT_DETAIL_FETCH_FAIL:
            const { error } = action;

            return {
                ...state,
                error,
                loading: false
            }
    }

    return state;
}