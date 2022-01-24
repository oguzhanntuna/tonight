import axios from 'axios'; 

import * as ToastMessageActions from './toastMessage';
import { CartEvent } from './../../models/cartEvent/cartEvent';
import { ICartEvent } from './../../models/interfaces/cartEvent/cartEvent';
import { ILocalStorageUserData } from './../../models/interfaces/auth/auth';
import { IFavoriteEvent } from './../../models/interfaces/favoriteEvent/favoriteEvent';
import { IEventShowcaseEvent } from "../../models/interfaces/eventShowcase/eventShowcase";
import { IToastMessageData } from '../../models/interfaces/toastMessage/toastMessage';
import { IApplicationState } from '../../models/interfaces/store/states/application';

export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_ITEM_IN_CART = 'UPDATE_ITEM_IN_CART';

export const addToCart = (addedEvent: IEventShowcaseEvent | IFavoriteEvent): any => {

    return (dispatch: any) => {
        const userData = localStorage.getItem('userDataJSON');

        if (userData) {
            const parsedUserData: ILocalStorageUserData = JSON.parse(userData);
            const { userId } = parsedUserData;
            const userCartUrl = `https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/cart/${userId}`;

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
                                            .then(response => {
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
                                                    updatedEvent: updatedEvent
                                                });
                                            })
                                            .catch(error => console.log(error));
                                    })
                            })
                    } else {
                        const url =`${userCartUrl}.json`;

                        axios.post(url, addedEvent)
                            .then(response => {
                                const { name: eventUid } = response.data;
                                const cartEvent: ICartEvent = new CartEvent(
                                    addedEvent.id,
                                    addedEvent.title,
                                    addedEvent.imageUrl,
                                    addedEvent.location,
                                    addedEvent.date,
                                    addedEvent.url,
                                    addedEvent.normalTicket,
                                    addedEvent.vipTicket,
                                    addedEvent.totalPrice,
                                    addedEvent.moduleType,
                                    eventUid
                                )

                                dispatch({
                                    type: ADD_TO_CART,
                                    addedEvent: cartEvent
                                });
                            })
                            .catch(error => console.log(error));
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

// const setLoading = () => {
    
//     return { type: SET_LOADING };
// } 