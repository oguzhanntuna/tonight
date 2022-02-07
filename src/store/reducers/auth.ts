import { IAuthState } from './../../models/interfaces/store/states/auth';
import { IAuthAction } from './../../models/interfaces/store/actions/auth';

import { AUTH_SUCCESS, LOGOUT, AUTH_START, AUTH_FAIL } from './../actions/auth';

const initialState: IAuthState = {
    displayName: null,
    token: null,
    userId: null,
    error: null,
    loading: false
}

export const authReducer = (state = initialState, action: IAuthAction): IAuthState => {
    switch(action.type) {
        case AUTH_START:

            return {
                ...state,
                error: null,
                loading: true
            }

        case AUTH_SUCCESS:
            const { userData: { displayName, token, userId, } } = action;

            return {
                ...state,
                displayName,
                token,
                userId,
                error: null,
                loading: false
            }

        case AUTH_FAIL:

            return {
                ...state,
                error: action.error,
                loading: false
            }

        case LOGOUT:

            return {
                ...state,
                displayName: null,
                token: null,
                userId: null
            }
    }

    return state;
}