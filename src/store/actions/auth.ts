import axios from "axios";

import firebaseApiKey from '../../../.env/apiKey';

export const signUp = (email: string, password: string) => {
    return async (dispatch: any) => {
        const userData = {
            email,
            password,
            returnSecureToken: true
        };
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`;

        axios.post(url, userData)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
}