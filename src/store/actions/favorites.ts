import { FavoriteEvent } from './../../models/favoriteEvent/favoriteEvent';
import axios from 'axios';

import { IToastMessageData } from './../../models/interfaces/toastMessage/toastMessage';
import { IApplicationState } from './../../models/interfaces/store/states/application';
import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/eventShowcase';
import { ILocalStorageUserData } from '../../models/interfaces/auth/auth';
import { IFavoriteEvent } from './../../models/interfaces/favoriteEvent/favoriteEvent';
import * as ToastMessageActions from './toastMessage';

export const SET_FAVORITES = 'SET_FAVORITES';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_LOADING = 'SET_LOADING';

// export const setFavorites = () => {

//     return { type: SET_FAVORITES }
// }

export const toggleFavorite = (addedEvent: IEventShowcaseEvent): any => {

    return async (dispatch: any) => {
        const userData = localStorage.getItem('userDataJSON');

        if (userData) {
            const parsedUserData: ILocalStorageUserData = JSON.parse(userData);
            const userFavoritesUrl = `https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/favorites/${parsedUserData.userId}`;

            dispatch(setLoading());
            dispatch(isEventAlreadyInFavorites(addedEvent))
                .then((isEventAlreadyInFavorites: boolean) => {

                    if (isEventAlreadyInFavorites) {
                        
                        dispatch(getEventUid(addedEvent))
                            .then((eventUid: string) => {
                                const url =`${userFavoritesUrl}/${eventUid}.json`;

                                axios.delete(url)
                                    .then(() => {
                                        const favoriteEvent: IFavoriteEvent = new FavoriteEvent(
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
                                        );

                                        dispatch({
                                            type: TOGGLE_FAVORITE,
                                            addedEvent: favoriteEvent,
                                            loading: false
                                        });
                                    })
                                    .catch(error => console.log(error)); 
                            });

                    } else {
                        const url =`${userFavoritesUrl}.json`;
                        
                        axios.post(url, addedEvent)
                            .then(response => {
                                const { name } = response.data;
                                const favoriteEvent: IFavoriteEvent = new FavoriteEvent(
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
                                    name
                                )

                                dispatch({
                                    type: TOGGLE_FAVORITE,
                                    addedEvent: favoriteEvent,
                                    loading: false
                                });
                            })
                            .catch(error => console.log(error));
                    }
                });

        } else {
            const { setToastMessage } = ToastMessageActions;
            const toastMessageData: IToastMessageData = {
                messageType: 'warning',
                message: 'You need to login in order to add an event to the favorites!'
            }

            dispatch(setToastMessage(toastMessageData));
        }
    }
}

const setLoading = () => {

    return { type: SET_LOADING };
} 

const isEventAlreadyInFavorites = (addedEvent: IEventShowcaseEvent) => 
    (_dispatch: any, getState: () => IApplicationState): Promise<boolean> => {
    
        return new Promise((resolve, _reject) => {
            const favoriteEvents = getState().favorites.favoriteEvents;

            resolve(favoriteEvents.some(favoriteEvent => favoriteEvent?.id === addedEvent.id));
        });
}

const getEventUid = (addedEvent: IEventShowcaseEvent) => 
    (_dispatch: any, getState: () => IApplicationState): Promise<string> => {

        return new Promise((resolve, _reject) => {
            const favoriteEvents = getState().favorites.favoriteEvents;
            const selectedEvent = favoriteEvents.find(favoriteEvent => favoriteEvent?.id === addedEvent.id);

            if (selectedEvent) {

                resolve(selectedEvent.uniqueId);
            }
        });
}