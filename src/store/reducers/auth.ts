import { IAuthState } from './../../models/interfaces/store/states/auth';
import { IAuthAction } from './../../models/interfaces/store/actions/auth';

import { SIGNUP, LOGIN, AUTH_SUCCESS, LOGOUT } from './../actions/auth';

const initialState: IAuthState = {
    displayName: null,
    token: null,
    userId: null
}

export const authReducer = (state = initialState, action: IAuthAction): IAuthState => {
    switch(action.type) {
        case SIGNUP:
            const { token: signupToken, userId: signupUserId, displayName: signupDisplayName } = action;

            return {
                ...state,
                displayName: signupDisplayName,
                token: signupToken, 
                userId: signupUserId
            }

        case LOGIN:
            const { token: loginToken, userId: loginUserId, displayName: loginDisplayName } = action;

            return {
                ...state,
                displayName: loginDisplayName,
                token: loginToken,
                userId: loginUserId
            }

        case LOGOUT:

        return {
            ...state,
            displayName: null,
            token: null,
            userId: null
        }

        case AUTH_SUCCESS:
            const { token, userId, displayName } = action;

            return {
                ...state,
                token,
                userId,
                displayName
            }
    }

    return state;
}