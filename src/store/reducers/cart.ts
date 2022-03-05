import { CartEvent } from '../../models/cartEvent/cartEvent';
import { ICartAction } from '../../models/interfaces/store/actions/cart';
import { ICartState } from '../../models/interfaces/store/states/cart';

import { 
    ADD_TO_CART, 
    RESET_CART,
    FETCH_CART_FAIL, 
    FETCH_CART_START, 
    FETCH_CART_SUCCESS, 
    UPDATE_ITEM_IN_CART, 
    ADD_TO_CART_START,
    ADD_TO_CART_FAIL,
    CART_ADD_NORMAL_TICKET,
    CART_ADD_VIP_TICKET,
    CART_REMOVE_VIP_TICKET,
    CART_REMOVE_NORMAL_TICKET,
    CART_REMOVE_EVENT,
    PURCHASE_CART_SUCCESS,
    PURCHASE_CART_START,
    PURCHASE_CART_FAIL
} from '../actions/cart';

const initialState: ICartState = {
    cartItems: [],
    ticketCount: 0,
    fetchLoading: false,
    fetchError: null,
    addToCartLoading: false,
    addToCartError: null,
    purchaseLoading: false,
    purchaseError: null
}

export const cartReducer = (state = initialState, action: ICartAction): ICartState => {
    switch(action.type) {
        case RESET_CART:

            return {
                ...state,
                cartItems: [],
                ticketCount: 0
            }

        case FETCH_CART_START:

            return {
                ...state,
                fetchLoading: true,
                fetchError: null
            }

        case FETCH_CART_SUCCESS:

            return {
                ...state,
                cartItems: action.cartEvents,
                ticketCount: action.ticketCount,
                fetchLoading: false,
                fetchError: null
            }

        case FETCH_CART_FAIL:

            return {
                ...state,
                fetchLoading: false,
                fetchError: action.fetchError
            }

        case ADD_TO_CART_START:

            return {
                ...state,
                addToCartLoading: true,
                addToCartError: null
            }

        case ADD_TO_CART_FAIL: 

            return {
                ...state,
                addToCartLoading: false,
                addToCartError: action.addToCartError
            }

        case ADD_TO_CART:
            const { addedEvent } = action;

            return {
                ...state,
                cartItems: [ ...state.cartItems, addedEvent ],
                ticketCount: state.ticketCount + action.ticketCount,
                addToCartLoading: false,
                addToCartError: null
            };

        case PURCHASE_CART_START:

            return {
                ...state,
                purchaseLoading: true,
                purchaseError: null
            }

        case PURCHASE_CART_FAIL:

            return {
                ...state,
                purchaseLoading: false,
                purchaseError: action.purchaseError
            }

        case PURCHASE_CART_SUCCESS:

            return {
                ...state,
            }

        case UPDATE_ITEM_IN_CART: 
            const { cartItems } = state;
            const { updatedEvent } = action;

            const itemIndex = cartItems.findIndex(item => item?.id === updatedEvent.id);

            const updatedCartItems = [ ...cartItems ];
            updatedCartItems[itemIndex] = updatedEvent;

            return {
                ...state,
                cartItems: updatedCartItems,
                ticketCount: state.ticketCount + action.ticketCount,
                addToCartLoading: false,
                addToCartError: null
            }

        case CART_ADD_NORMAL_TICKET:
            const addedNormalTicketEvent = action.eventData;
        
            if (addedNormalTicketEvent instanceof CartEvent) {
                addedNormalTicketEvent.normalTicket.count = addedNormalTicketEvent.normalTicket.count + 1;
                addedNormalTicketEvent.totalPrice = addedNormalTicketEvent.totalPrice + addedNormalTicketEvent.normalTicket.price;

                return {
                    ...state,
                    cartItems: [ ...state.cartItems ],
                    ticketCount: state.ticketCount + 1
                }
            }

            break;

        case CART_ADD_VIP_TICKET:
            const addedVipTicketEvent = action.eventData;
            
            if (addedVipTicketEvent instanceof CartEvent) {
                addedVipTicketEvent.vipTicket.count = addedVipTicketEvent.vipTicket.count + 1;
                addedVipTicketEvent.totalPrice = addedVipTicketEvent.totalPrice + addedVipTicketEvent.vipTicket.price;

                return {
                    ...state,
                    cartItems: [ ...state.cartItems ],
                    ticketCount: state.ticketCount + 1
                }
            }    
            
            break;

        case CART_REMOVE_NORMAL_TICKET:
            const removedNormalTicketEvent = action.eventData;
            console.log(state);
            
            if (removedNormalTicketEvent instanceof CartEvent) {
                removedNormalTicketEvent.normalTicket.count = removedNormalTicketEvent.normalTicket.count - 1;
                removedNormalTicketEvent.totalPrice = removedNormalTicketEvent.totalPrice - removedNormalTicketEvent.normalTicket.price;

                return {
                    ...state,
                    cartItems: [ ...state.cartItems ],
                    ticketCount: state.ticketCount - 1
                }
            }

            break;

        case CART_REMOVE_VIP_TICKET:
            const removedVipTicketEvent = action.eventData;
            
            if (removedVipTicketEvent instanceof CartEvent) {
                removedVipTicketEvent.vipTicket.count = removedVipTicketEvent.vipTicket.count - 1;
                removedVipTicketEvent.totalPrice = removedVipTicketEvent.totalPrice - removedVipTicketEvent.vipTicket.price;

                return {
                    ...state,
                    cartItems: [ ...state.cartItems ],
                    ticketCount: state.ticketCount - 1
                }
            }

            break;

        case CART_REMOVE_EVENT:
            const removedEvent = action.eventData;
            const removedEventTotalTicketCount = removedEvent.normalTicket.count + removedEvent.vipTicket.count;
            const filteredCartItems = state.cartItems.filter(cartItem => cartItem.uniqueId !== removedEvent.uniqueId);

            return {
                ...state,
                cartItems: [ ...filteredCartItems ],
                ticketCount: state.ticketCount - removedEventTotalTicketCount
            }
    }

    return state;
}