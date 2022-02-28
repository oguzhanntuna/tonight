import { EventShowcaseEvent } from './../../models/eventShowcase/event';
import { PurchasedTicket } from './../../models/purchasedTicket/purchasedTicket';
import axios from 'axios'; 

import * as ToastMessageActions from './toastMessage';
import * as BuyNowEventsActions from './buyNowEvents';
import * as ThisWeekEventsActions from './thisWeekEvents';
import * as RecentlyAddedEventsActions from './recentlyAddedEvents';
import * as FavoritesActions from './favorites';
import { CartEvent } from './../../models/cartEvent/cartEvent';
import { ICartEvent, uniqueId } from './../../models/interfaces/cartEvent/cartEvent';
import { ILocalStorageUserData } from './../../models/interfaces/auth/auth';
import { IFavoriteEvent } from './../../models/interfaces/favoriteEvent/favoriteEvent';
import { IEventShowcaseEvent } from "../../models/interfaces/eventShowcase/eventShowcase";
import { IToastMessageData } from '../../models/interfaces/toastMessage/toastMessage';
import { IApplicationState } from '../../models/interfaces/store/states/application';

import { ADD_TO_ORDERS } from './orders';
import { Order } from '../../models/order/order';
import { IPurchasedTicket } from '../../models/interfaces/purchasedTicket/purchasedTicket';
import { IOrder } from '../../models/interfaces/order/order';
import { FavoriteEvent } from '../../models/favoriteEvent/favoriteEvent';

export const FETCH_CART_START = 'FETCH_CART_START';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAIL = 'FETCH_CART_FAIL';
export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_ITEM_IN_CART = 'UPDATE_ITEM_IN_CART';
export const ADD_TO_CART_START = 'ADD_TO_CART_START';
export const ADD_TO_CART_FAIL = 'ADD_TO_CART_FAIL';
export const RESET_CART = 'RESET_CART';

const fetchCartStart = () => {
    return { type: FETCH_CART_START }
}

const fetchCartSuccess = (cartEvents: Array<IFavoriteEvent>, ticketCount: number) => {
    return {
        type: FETCH_CART_SUCCESS,
        cartEvents,
        ticketCount
    }
}

const fetchCartFail = (error: string) => {
    return {
        type: FETCH_CART_FAIL,
        error
    }
}

const resetCart = () => {
    return { type: RESET_CART }
}

const addToCartStart = () => {
    return {  type: ADD_TO_CART_START}
}

const addToCartFail = (error: string) => {
    return { type: ADD_TO_CART_FAIL,  }
}

const resetTickets = (selectedEvent: IEventShowcaseEvent | IFavoriteEvent) => {
    return (dispatch: any) => {
        if (selectedEvent instanceof EventShowcaseEvent) {
            if (selectedEvent.moduleType === 'this-week') {
                const { resetTickets } = ThisWeekEventsActions;
    
                dispatch(resetTickets(selectedEvent));
            }
        
            if (selectedEvent.moduleType === 'recently-added') {
                const { resetTickets } = RecentlyAddedEventsActions;
    
                dispatch(resetTickets(selectedEvent));
            }
        
            if (selectedEvent.moduleType === 'buy-now') {
                const { resetTickets } = BuyNowEventsActions;
    
                dispatch(resetTickets(selectedEvent));
            }
        }

        if (
            selectedEvent instanceof FavoriteEvent && 
            selectedEvent.moduleType === 'favorites'
        ) {
            const { favoritesResetTickets } = FavoritesActions;

            dispatch(favoritesResetTickets(selectedEvent));
        } 
    }
}

export const fetchCart = () => {
    return (dispatch: any) => {
        const userData = localStorage.getItem('userDataJSON');
        
        if (userData) {
            const parsedUserData: ILocalStorageUserData = JSON.parse(userData);
            const { userId } = parsedUserData;
            const userCartUrl = `https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/cart/${userId}.json`;

            dispatch(fetchCartStart());
            axios.get(userCartUrl)
                .then(response => {
                    const { data } = response;
                    const cartEvents: { [key: uniqueId]: ICartEvent } = data;
                    let cartEventsArray: Array<IFavoriteEvent> = [];
                    let ticketCount = 0;

                    for (let eventUid in cartEvents) {
                        const cartEvent: IFavoriteEvent = new CartEvent(
                            cartEvents[eventUid].id,
                            cartEvents[eventUid].title,
                            cartEvents[eventUid].imageUrl,
                            cartEvents[eventUid].location,
                            cartEvents[eventUid].date,
                            cartEvents[eventUid].url,
                            cartEvents[eventUid].normalTicket,
                            cartEvents[eventUid].vipTicket,
                            cartEvents[eventUid].totalPrice,
                            'cart',
                            eventUid
                        );

                        ticketCount = ticketCount + 
                            cartEvents[eventUid].normalTicket.count + 
                            cartEvents[eventUid].vipTicket.count;
                        cartEventsArray.push(cartEvent);
                    }

                    dispatch(fetchCartSuccess(cartEventsArray, ticketCount));
                })
                .catch(error => dispatch(fetchCartFail(error)));
        }

        dispatch(resetCart());
    }
}

export const addToCart = (addedEvent: IEventShowcaseEvent | IFavoriteEvent): any => {

    return (dispatch: any) => {
        const userData = localStorage.getItem('userDataJSON');

        if (userData) {
            const parsedUserData: ILocalStorageUserData = JSON.parse(userData);
            const { userId } = parsedUserData;
            const userCartUrl = `https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/cart/${userId}`;

            dispatch(addToCartStart());
            dispatch(isEventAlreadyInCart(addedEvent))
                .then((isEventAlreadyInCart: boolean) => {
                    if (isEventAlreadyInCart) {

                        dispatch(getEventUid(addedEvent))
                            .then((eventUid: string) => {
                                const url =`${userCartUrl}/${eventUid}.json`;

                                dispatch(getEventAlreadyInCart(addedEvent))
                                    .then((eventAlreadyInCart: ICartEvent) => {
                                        const updatedNormalTicket = {
                                            count: eventAlreadyInCart.normalTicket.count + addedEvent.normalTicket.count,
                                            price: addedEvent.normalTicket.price,
                                            title: addedEvent.normalTicket.title,
                                            type: addedEvent.normalTicket.type
                                        }
                                        const updatedVipTicket = {
                                            count: eventAlreadyInCart.vipTicket.count + addedEvent.vipTicket.count,
                                            price: addedEvent.vipTicket.price,
                                            title: addedEvent.vipTicket.title,
                                            type: addedEvent.vipTicket.type
                                        }
                                        const updatedTotalPrice = eventAlreadyInCart.totalPrice + addedEvent.totalPrice;

                                        axios.patch(url, {
                                            normalTicket: updatedNormalTicket,
                                            vipTicket: updatedVipTicket,
                                            totalPrice: updatedTotalPrice
                                        })
                                            .then(() => {
                                                const ticketCount = addedEvent.normalTicket.count + addedEvent.vipTicket.count;
                                                const updatedEvent: ICartEvent = new CartEvent(
                                                    addedEvent.id,
                                                    addedEvent.title,
                                                    addedEvent.imageUrl,
                                                    addedEvent.location,
                                                    addedEvent.date,
                                                    addedEvent.url,
                                                    updatedNormalTicket,
                                                    updatedVipTicket,
                                                    updatedTotalPrice,
                                                    addedEvent.moduleType,
                                                    eventUid
                                                )
        
                                                dispatch({
                                                    type: UPDATE_ITEM_IN_CART,
                                                    updatedEvent: updatedEvent,
                                                    ticketCount
                                                });
                                                dispatch(resetTickets(addedEvent));
                                            })
                                            .catch(error => dispatch(addToCartFail(error)))
                                    });
                            });
                    } else {
                        const url =`${userCartUrl}.json`;

                        axios.post(url, addedEvent)
                            .then(response => {
                                const { name: eventUid } = response.data;
                                const ticketCount = addedEvent.normalTicket.count + addedEvent.vipTicket.count;
                                const cartEvent: ICartEvent = new CartEvent(
                                    addedEvent.id,
                                    addedEvent.title,
                                    addedEvent.imageUrl,
                                    addedEvent.location,
                                    addedEvent.date,
                                    addedEvent.url,
                                    { ...addedEvent.normalTicket },
                                    { ...addedEvent.vipTicket },
                                    addedEvent.totalPrice,
                                    addedEvent.moduleType,
                                    eventUid
                                )

                                dispatch({
                                    type: ADD_TO_CART,
                                    addedEvent: cartEvent,
                                    ticketCount
                                });
                                dispatch(resetTickets(addedEvent));
                            })
                            .catch(error => dispatch(addToCartFail(error)));
                    }
                });
        } else {
            const { setToastMessage } = ToastMessageActions;
            const toastMessageData: IToastMessageData = {
                messageType: 'warning',
                message: 'You need to login in order to add ticket to the cart!'
            }

            dispatch(setToastMessage(toastMessageData));
        }
    }
};

export const purchaseCart = () => {

    return (dispatch: any) => {
        const cartEvents: Array<ICartEvent> = dispatch(getCartEvents());
        const userData = localStorage.getItem('userDataJSON');

        if (userData) {
            const parsedUserData: ILocalStorageUserData = JSON.parse(userData);
            const { userId } = parsedUserData;
            const userCartUrl = `https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json`;

            axios.post(userCartUrl, cartEvents)
                .then(() => {
                    let purchasedTickets: Array<IPurchasedTicket> = [];
                    let orders:  Array<IOrder> = [];

                    cartEvents.forEach(cartEvent => {
                        const purchasedTicket: IPurchasedTicket = new PurchasedTicket(
                            cartEvent.id,
                            cartEvent.title,
                            cartEvent.imageUrl,
                            cartEvent.location,
                            cartEvent.date,
                            cartEvent.url,
                            cartEvent.normalTicket,
                            cartEvent.vipTicket,
                            cartEvent.totalPrice
                        )

                        purchasedTickets.push(purchasedTicket);
                    });

                    const order: IOrder = new Order(
                        purchasedTickets,
                        'date'
                    )
                    orders.push(order);

                    dispatch({
                        type: ADD_TO_ORDERS,
                        orders: orders
                    });
                })
                .catch(error => console.log(error));
        }

        // No need for else case since user can't see the cart logged out.
    }
}

const getCartEvents = () => {

    return (_dispatch: any, getState: () => IApplicationState): Array<ICartEvent | null> => {
        
        return getState().cart.cartItems; 
    }
    
}

const isEventAlreadyInCart = (event: IEventShowcaseEvent | IFavoriteEvent) => {

    return (dispatch: any): Promise<boolean> => {
    
        return new Promise((resolve, _reject) => {
            const cartEvents: Array<ICartEvent | null> = dispatch(getCartEvents());
    
            if (cartEvents) {
    
                resolve(cartEvents.some(cartEvent => cartEvent?.id === event.id));
            }
        });
    }
}

const getEventUid = (event: IEventShowcaseEvent | IFavoriteEvent) => {

    return (dispatch: any): Promise<string> => {
    
        return new Promise(async (resolve, _reject) => {
            const cartEvents: Array<ICartEvent | null> = dispatch(getCartEvents());
            const addedEvent = cartEvents.find(cartEvent => cartEvent?.id === event.id);

            if (addedEvent) {

                resolve(addedEvent.uniqueId);
            }
        });
    }    
}

const getEventAlreadyInCart = (event: IEventShowcaseEvent | IFavoriteEvent) => {
    
    return (dispatch: any): Promise<ICartEvent | null | undefined> => {

        return new Promise((resolve, _reject) => {
            const cartEvents: Array<ICartEvent | null> = dispatch(getCartEvents());

            if (cartEvents) {

                resolve(cartEvents.find(cartEvent => cartEvent?.id === event.id));
            }
        });
    }  
}