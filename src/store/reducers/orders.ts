import { IOrdersState } from '../../models/interfaces/store/states/orders';
import { IOrdersActions } from '../../models/interfaces/store/actions/orders';

import { ADD_TO_ORDERS, FETCH_ORDERS } from '../actions/orders';

const initialState: IOrdersState = {
    orders: []
}

export const ordersReducer = (state = initialState, action: IOrdersActions): IOrdersState => {
    switch(action.type) {
        case ADD_TO_ORDERS:

            return {
                ...state,
                orders: [ ...state.orders, ...action.orders ]
            }

        case FETCH_ORDERS:

            return {
                ...state,
                orders: action.orders
            }
    }

    return state;
}