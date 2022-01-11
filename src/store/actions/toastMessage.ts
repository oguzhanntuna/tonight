import { IToastMessageAction } from '../../models/interfaces/store/actions/toastMessage';
import { IToastMessageData } from './../../models/interfaces/toastMessage/toastMessage';

export const SET_TOAST_MESSAGE = "SET_TOAST_MESSAGE";
export const CLEAR_TOAST_MESSAGE = "CLEAR_TOAST_MESSAGE";

export const setToastMessage = (data: IToastMessageData): IToastMessageAction => {

    return {
        type: SET_TOAST_MESSAGE,
        data
    }
}

export const clearToastMessage = () => {

    return {
        type: CLEAR_TOAST_MESSAGE
    }
}