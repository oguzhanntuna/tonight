import axios from "axios";

import firebaseApiKey from '../../.env/apiKey';
import { ISignupData } from './../../models/interfaces/signup/signupData';

export const SIGNUP = 'SIGNUP';

export const signUp = (signupData: ISignupData) => {
    return async (dispatch: any) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`;
        const userData = {
            ...signupData,
            returnSecureToken: true
        };

        axios.post(url, userData)
            .then(response => {
                const token = response.data.idToken;
                const userId = response.data.localId;
                
                console.log(response);

                dispatch({
                    type: SIGNUP,
                    token,
                    userId
                })
            })
            .catch(error => console.log(error));
    }
}