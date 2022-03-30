import { IUpdateData, ILocalStorageUserData } from './../../models/interfaces/auth/auth';
import axios from "axios";

import firebaseApiKey from '../../.env/apiKey';
import { IUserData, ILoginData } from "../../models/interfaces/auth/auth";
import { IToastMessageData } from '../../models/interfaces/toastMessage/toastMessage';
import * as ToastMessageActions from './toastMessage';
import * as CartActions from './cart'; 
import * as FavoritesActions from './favorites';
import * as OrdersActions from './orders';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const UPDATE = 'UPDATE';
export const LOGOUT = 'LOGOUT';

const authStart = () => {

    return {
        type: AUTH_START
    }
}

const authSuccess = (userData: ILocalStorageUserData) => {

    return {
        type: AUTH_SUCCESS,
        userData
    }
}

const authFail = (errorMessage: string) => {

    return (dispatch: any) => {
        const { setToastMessage } = ToastMessageActions;
        const toastMessageData: IToastMessageData = {
            messageType: 'warning',
            message: errorMessage
        }
        
        dispatch(setToastMessage(toastMessageData));
        dispatch({
            type: AUTH_FAIL,
            error: errorMessage
        });
    }
}

const setUserDisplayName = (userData: IUpdateData) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${firebaseApiKey}`;
    const updateData = {
        ...userData,
        returnSecureToken: true
    }

    axios.post(url, updateData)
        .then(response => console.log(response))
        .catch(error => console.log(error));
}

const setUserDataToLocalStorage = (userData: ILocalStorageUserData) => {

    localStorage.setItem('userDataJSON', JSON.stringify(userData));
}  

export const signup = (userData: IUserData) => {
    
    return async (dispatch: any) => {
        dispatch(authStart());

        const { username, email, password } = userData;
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`;
        const signupData = {
            email,
            password,
            returnSecureToken: true
        };

        axios.post(url, signupData)
            .then(response => {
                const token = response.data.idToken;
                const userId = response.data.localId;
                const updateData: IUpdateData = {
                    idToken: token,
                    displayName: username,
                    photoUrl: ''
                }
                const localStorageUserData: ILocalStorageUserData = {
                    token,
                    userId,
                    displayName: username
                }

                setUserDisplayName(updateData);
                setUserDataToLocalStorage(localStorageUserData);

                dispatch(authSuccess(localStorageUserData));
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    }
}

export const login = (userData: ILoginData) => {

    return async (dispatch: any) => {
        dispatch(authStart());

        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`;
        const loginData = {
            ...userData,
            returnSecureToken: true
        }

        axios.post(url, loginData)
            .then(response => {
                const token = response.data.idToken;
                const userId = response.data.localId;
                const displayName = response.data.displayName;
                const localStorageUserData: ILocalStorageUserData = {
                    token,
                    userId,
                    displayName
                }

                setUserDataToLocalStorage(localStorageUserData);

                dispatch(authSuccess(localStorageUserData));
            })
            .catch(error => {
                const { response: { data: { error: { message } } } } = error;
                let errorMessage: string;

                if (message === 'EMAIL_NOT_FOUND') {

                    errorMessage = 'This email does not exist. Please try again!'
                } else if (message === 'INVALID_PASSWORD') {

                    errorMessage = 'The password is invalid. Please try again!'
                } else {

                    errorMessage = error;
                }

                dispatch(authFail(errorMessage));
            });
    } 
}

export const logout = () => {

    return (dispatch: any) => {
        const { resetFavoritesState } = FavoritesActions;
        const { resetCartFromState } = CartActions;
        const { resetOrdersState } = OrdersActions;

        localStorage.removeItem('userDataJSON');

        dispatch({ type: LOGOUT });
        dispatch(resetCartFromState());
        dispatch(resetFavoritesState());
        dispatch(resetOrdersState());
    }
}

export const checkAuthState = () => {

    return async (dispatch: any) => {
        const userData = localStorage.getItem('userDataJSON');
        
        if (userData) {
            const parsedUserData: ILocalStorageUserData = JSON.parse(userData);

            dispatch(authSuccess(parsedUserData));
        }
    }
}