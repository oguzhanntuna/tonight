import { IToastMessageAction } from './../../models/interfaces/store/actions/toastMessage';
import { IToastMessageState } from './../../models/interfaces/store/states/toastMessage';

import { SET_TOAST_MESSAGE } from '../actions/toastMessage';
import { CLEAR_TOAST_MESSAGE } from '../actions/toastMessage';

const initialState: IToastMessageState = {
    messageType: '',
    message: '',
    visibility: false
}

export const toastMessageReducer = (state = initialState, action: IToastMessageAction): IToastMessageState => {
    switch (action.type) {
        case SET_TOAST_MESSAGE:
            const { data: { messageType, message } } = action;
            
            return {
                ...state,
                messageType,
                message,
                visibility: true
            }      
            
        case CLEAR_TOAST_MESSAGE:

            return {
                ...state,
                messageType: '',
                message: '',
                visibility: false
            }
    }

    return state;
}