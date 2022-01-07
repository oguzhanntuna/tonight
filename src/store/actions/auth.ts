import axios from "axios";

import firebaseApiKey from '../../.env/apiKey';
import { IUserData } from '../../models/interfaces/signup/userData';

export const SIGNUP = 'SIGNUP';

export const signUp = (userData: IUserData) => {
    return async (dispatch: any) => {
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

                console.log(response);

                dispatch({
                    type: SIGNUP,
                    username,
                    token,
                    userId
                })
            })
            .catch(error => console.log(error));
    }
}