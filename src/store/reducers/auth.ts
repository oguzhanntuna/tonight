import { IAuthState } from './../../models/interfaces/store/states/auth';
import { IAuthAction } from './../../models/interfaces/store/actions/auth';

import { SIGNUP } from './../actions/auth';

const initialState: IAuthState = {
    username: null,
    token: null,
    userId: null
}

export const authReducer = (state = initialState, action: IAuthAction): IAuthState => {
    switch(action.type) {
        case SIGNUP:
            const { username, token, userId } = action;

            return {
                ...state,
                username,
                token, 
                userId
            }
    }

    return state;
}