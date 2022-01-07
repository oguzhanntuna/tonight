import { IAuthState } from './../../models/interfaces/store/states/auth';
import { IAuthAction } from './../../models/interfaces/store/actions/auth';

import { SIGNUP, LOGIN, UPDATE } from './../actions/auth';

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

        // case UPDATE:

        //     return {
        //         ...state,
        //         displayName
        //     }
    }

    return state;
}