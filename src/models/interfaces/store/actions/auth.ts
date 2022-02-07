import { ILocalStorageUserData } from './../../auth/auth';
export interface IAuthAction {
    type: string;
    userData : ILocalStorageUserData;
    error: string;
}