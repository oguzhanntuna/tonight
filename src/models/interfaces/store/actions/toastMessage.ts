import { IToastMessageData } from './../../toastMessage/toastMessage';

export interface IToastMessageAction {
    type: string;
    data: IToastMessageData
}