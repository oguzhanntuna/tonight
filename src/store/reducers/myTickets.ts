import { IMyTicketsState } from './../../models/interfaces/store/states/myTickets';
import { IMyTicketsAction } from '../../models/interfaces/store/actions/myTickets';

import { ADD_TO_MY_TICKETS, FETCH_MY_TICKETS } from './../actions/myTickets';

const initialState: IMyTicketsState = {
    myTickets: []
}

export const myTicketsReducer = (state = initialState, action: IMyTicketsAction): IMyTicketsState => {
    switch(action.type) {
        case ADD_TO_MY_TICKETS:

            return {
                ...state,
                myTickets: [ ...state.myTickets, ...action.purchasedEvents ]
            }

        case FETCH_MY_TICKETS:

            return {
                ...state,
                myTickets: action.myTickets
            }
    }

    return state;
}