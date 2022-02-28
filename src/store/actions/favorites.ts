import axios from 'axios';

import { FavoriteEvent } from './../../models/favoriteEvent/favoriteEvent';
import { IToastMessageData } from './../../models/interfaces/toastMessage/toastMessage';
import { IApplicationState } from './../../models/interfaces/store/states/application';
import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/eventShowcase';
import { ILocalStorageUserData } from '../../models/interfaces/auth/auth';
import { IFavoriteEvent, uniqueId } from './../../models/interfaces/favoriteEvent/favoriteEvent';
import * as ToastMessageActions from './toastMessage';
import { IFavoritesAction } from '../../models/interfaces/store/actions/favorites';

export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const SET_LOADING = 'SET_LOADING';
export const FAVORITES_ADD_NORMAL_TICKET = 'FAVORITES_ADD_NORMAL_TICKET';
export const FAVORITES_ADD_VIP_TICKET = 'FAVORITES_ADD_VIP_TICKET';
export const FAVORITES_REMOVE_NORMAL_TICKET = 'FAVORITES_REMOVE_NORMAL_TICKET';
export const FAVORITES_REMOVE_VIP_TICKET = 'FAVORITES_REMOVE_VIP_TICKET';
export const FAVORITES_RESET_TICKETS = 'FAVORITES_RESET_TICKETS';
export const FAVORITES_RESET_ALL_TICKETS = 'FAVORITES_RESET_ALL_TICKETS';

export const fetchFavorites = () => 
    (dispatch: any) => {
        const userData = localStorage.getItem('userDataJSON');
        
        if (userData) {
            const parsedUserData: ILocalStorageUserData = JSON.parse(userData);
            const { userId } = parsedUserData;
            const userFavoritesUrl = `https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/favorites/${userId}.json`;

            dispatch(setLoading());
            axios.get(userFavoritesUrl)
                .then(response => {
                    const { data } = response;
                    const favoriteEvents: { [key: uniqueId]: IEventShowcaseEvent } = data;
                    let favoriteEventsArray: Array<IFavoriteEvent> = [];

                    for (let eventUid in favoriteEvents) {
                        const favoritedEvent: IFavoriteEvent = new FavoriteEvent(
                            favoriteEvents[eventUid].id,
                            favoriteEvents[eventUid].title,
                            favoriteEvents[eventUid].imageUrl,
                            favoriteEvents[eventUid].location,
                            favoriteEvents[eventUid].date,
                            favoriteEvents[eventUid].url,
                            favoriteEvents[eventUid].normalTicket,
                            favoriteEvents[eventUid].vipTicket,
                            favoriteEvents[eventUid].totalPrice,
                            'favorites',
                            eventUid
                        );

                        favoriteEventsArray.push(favoritedEvent)
                    }

                    dispatch({
                        type: FETCH_FAVORITES,
                        favoriteEvents: favoriteEventsArray
                    });
                })
                .catch(error => console.log(error));
        }

        dispatch({
            type: FETCH_FAVORITES,
            favoritesEvent: []
        });
}

export const toggleFavorite = (selectedEvent: IEventShowcaseEvent): any => {

    return async (dispatch: any) => {
        const userData = localStorage.getItem('userDataJSON');

        if (userData) {
            const parsedUserData: ILocalStorageUserData = JSON.parse(userData);
            const { userId } = parsedUserData;
            const userFavoritesUrl = `https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/favorites/${userId}`;

            dispatch(setLoading());
            dispatch(isEventAlreadyInFavorites(selectedEvent))
                .then((isEventAlreadyInFavorites: boolean) => {

                    if (isEventAlreadyInFavorites) {
                        
                        dispatch(getEventUid(selectedEvent))
                            .then((eventUid: string) => {
                                const url =`${userFavoritesUrl}/${eventUid}.json`;

                                axios.delete(url)
                                    .then(() => {
                                        const favoriteEvent: IFavoriteEvent = new FavoriteEvent(
                                            selectedEvent.id,
                                            selectedEvent.title,
                                            selectedEvent.imageUrl,
                                            selectedEvent.location,
                                            selectedEvent.date,
                                            selectedEvent.url,
                                            selectedEvent.normalTicket,
                                            selectedEvent.vipTicket,
                                            selectedEvent.totalPrice,
                                            selectedEvent.moduleType,
                                            eventUid
                                        );

                                        dispatch({
                                            type: REMOVE_FROM_FAVORITES,
                                            selectedEvent: favoriteEvent
                                        });
                                    })
                                    .catch(error => console.log(error)); 
                            });

                    } else {
                        const url =`${userFavoritesUrl}.json`;
                        
                        axios.post(url, selectedEvent)
                            .then(response => {
                                const { name: eventUid } = response.data;
                                const favoriteEvent: IFavoriteEvent = new FavoriteEvent(
                                    selectedEvent.id,
                                    selectedEvent.title,
                                    selectedEvent.imageUrl,
                                    selectedEvent.location,
                                    selectedEvent.date,
                                    selectedEvent.url,
                                    selectedEvent.normalTicket,
                                    selectedEvent.vipTicket,
                                    selectedEvent.totalPrice,
                                    selectedEvent.moduleType,
                                    eventUid
                                )

                                dispatch({
                                    type: ADD_TO_FAVORITES,
                                    selectedEvent: favoriteEvent
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

export const favoritesAddNormalTicket = (selectedEvent: IFavoriteEvent): IFavoritesAction => {
    
    return { type: FAVORITES_ADD_NORMAL_TICKET, selectedEvent};
}

export const favoritesAddVipTicket = (selectedEvent: IFavoriteEvent): IFavoritesAction => {

    return { type: FAVORITES_ADD_VIP_TICKET, selectedEvent};
}

export const favoritesRemoveNormalTicket = (selectedEvent: IFavoriteEvent): IFavoritesAction => {

    return { type: FAVORITES_REMOVE_NORMAL_TICKET, selectedEvent };
}

export const favoritesRemoveVipTicket = (selectedEvent: IFavoriteEvent): IFavoritesAction => {

    return { type: FAVORITES_REMOVE_VIP_TICKET, selectedEvent };
}

export const favoritesResetTickets = (selectedEvent: IFavoriteEvent): IFavoritesAction => {

    return { type: FAVORITES_RESET_TICKETS, selectedEvent };
}

const getFavoritesEvents = () => 
    (_dispatch: any, getState: () => IApplicationState): Array<IFavoriteEvent | null> => 
        getState().favorites.favoriteEvents; 

const isEventAlreadyInFavorites = (event: IEventShowcaseEvent) => 
    (dispatch: any): Promise<boolean> => 
        new Promise((resolve, _reject) => {
            const favoriteEvents: Array<IFavoriteEvent | null> = dispatch(getFavoritesEvents());

            if (favoriteEvents) {

                resolve(favoriteEvents.some(favoriteEvent => favoriteEvent?.id === event.id));
            }
        });


const getEventUid = (event: IEventShowcaseEvent) => 
    (dispatch: any): Promise<string> =>
        new Promise(async (resolve, _reject) => {
            const favoriteEvents: Array<IFavoriteEvent | null> = dispatch(getFavoritesEvents());
            const selectedEvent = favoriteEvents.find(favoriteEvent => favoriteEvent?.id === event.id);

            if (selectedEvent) {

                resolve(selectedEvent.uniqueId);
            }
        });


const setLoading = () => {
    
    return { type: SET_LOADING };
} 