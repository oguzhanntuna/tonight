import { IUpdateData } from './../../models/interfaces/auth/auth';
import axios from "axios";

import firebaseApiKey from '../../.env/apiKey';
import { IUserData, ILoginData } from "../../models/interfaces/auth/auth";

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const UPDATE = 'UPDATE';

export const signup = (userData: IUserData) => {
    return async (dispatch: any) => {
        const { username, email, password } = userData;
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`;
        const signupData = {
            email,
            password,
            returnSecureToken: true
        };

        axios.post(url, signupData)
            .then(async response => {
                const token = response.data.idToken;
                const userId = response.data.localId;
                const updateData: IUpdateData = {
                    idToken: token,
                    displayName: username,
                    photoUrl: ''
                }

                console.log(response);

                setUserDisplayName(updateData);

                dispatch({
                    type: SIGNUP,
                    displayName: username,
                    token,
                    userId
                });
            })
            .catch(error => console.log(error));
    }
}

export const login = (userData: ILoginData) => {
    return async (dispatch: any) => {
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

                dispatch({
                    type: LOGIN,
                    token,
                    userId,
                    displayName
                });
            })
            .catch(error => console.log(error));
    } 
}

// Check here later on!!
const setUserDisplayName = (userData: IUpdateData) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${firebaseApiKey}`;
    const updateData = {
        ...userData,
        returnSecureToken: true
    }

    axios.post(url, updateData)
        .then(response => {
            console.log('response', response);
            console.log(response.data.displayName);
        })
        .catch(error => console.log(error));
}