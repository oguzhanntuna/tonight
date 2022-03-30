import axios from 'axios';

import { FavoriteEvent } from './../../models/favoriteEvent/favoriteEvent';
import { IToastMessageData } from './../../models/interfaces/toastMessage/toastMessage';
import { IApplicationState } from './../../models/interfaces/store/states/application';
import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/eventShowcase';
import { ILocalStorageUserData } from '../../models/interfaces/auth/auth';
import { IFavoriteEvent, uniqueId } from './../../models/interfaces/favoriteEvent/favoriteEvent';
import * as ToastMessageActions from './toastMessage';
import { IFavoritesAction } from '../../models/interfaces/store/actions/favorites';

export const FAVORITES_FETCH_START = 'FAVORITES_FETCH_START';
export const FAVORITES_FETCH_SUCCESS = 'FAVORITES_FETCH_SUCCESS';
export const FAVORITES_FETCH_FAIL = 'FAVORITES_FETCH_FAIL';
export const FAVORITES_TOGGLE_START = 'FAVORITES_TOGGLE_START';
export const FAVORITES_TOGGLE_SUCCESS = 'FAVORITES_TOGGLE_SUCCESS';
export const FAVORITES_TOGGLE_FAIL = 'FAVORITES_TOGGLE_FAIL';
export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const FAVORITES_ADD_NORMAL_TICKET = 'FAVORITES_ADD_NORMAL_TICKET';
export const FAVORITES_ADD_VIP_TICKET = 'FAVORITES_ADD_VIP_TICKET';
export const FAVORITES_REMOVE_NORMAL_TICKET = 'FAVORITES_REMOVE_NORMAL_TICKET';
export const FAVORITES_REMOVE_VIP_TICKET = 'FAVORITES_REMOVE_VIP_TICKET';
export const FAVORITES_RESET_TICKETS = 'FAVORITES_RESET_TICKETS';
export const FAVORITES_RESET_ALL_TICKETS = 'FAVORITES_RESET_ALL_TICKETS';
export const FAVORITES_RESET_STATE = 'FAVORITES_RESET_STATE';

export const fetchFavorites = () => 
    (dispatch: any) => {
        const userData = localStorage.getItem('userDataJSON');
        
        if (userData) {
            const parsedUserData: ILocalStorageUserData = JSON.parse(userData);
            const { userId } = parsedUserData;
            const userFavoritesUrl = `https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/favorites/${userId}.json`;

            dispatch(fetchStart());
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
                            favoriteEvents[eventUid].description,
                            favoriteEvents[eventUid].normalTicket,
                            favoriteEvents[eventUid].vipTicket,
                            favoriteEvents[eventUid].totalPrice,
                            'favorites',
                            eventUid
                        );

                        favoriteEventsArray.push(favoritedEvent)
                    }

                    dispatch(fetchSuccess(favoriteEventsArray));
                })
                .catch(error => dispatch(fetchFail(error)));
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

            dispatch(isEventAlreadyInFavorites(selectedEvent))
                .then((isEventAlreadyInFavorites: boolean) => {

                    if (isEventAlreadyInFavorites) {
                        
                        dispatch(getEventUid(selectedEvent))
                            .then((eventUid: string) => {
                                const url =`${userFavoritesUrl}/${eventUid}.json`;

                                dispatch(toggleStart());
                                axios.delete(url)
                                    .then(() => {
                                        const favoriteEvent: IFavoriteEvent = new FavoriteEvent(
                                            selectedEvent.id,
                                            selectedEvent.title,
                                            selectedEvent.imageUrl,
                                            selectedEvent.location,
                                            selectedEvent.date,
                                            selectedEvent.url,
                                            selectedEvent.description,
                                            selectedEvent.normalTicket,
                                            selectedEvent.vipTicket,
                                            selectedEvent.totalPrice,
                                            'favorites',
                                            eventUid
                                        );

                                        dispatch(toggleSuccess(favoriteEvent, 'remove'));
                                    })
                                    .catch(error => dispatch(toggleFail(error))); 
                            });

                    } else {
                        const url =`${userFavoritesUrl}.json`;
                        
                        dispatch(toggleStart());
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
                                    selectedEvent.description,
                                    selectedEvent.normalTicket,
                                    selectedEvent.vipTicket,
                                    selectedEvent.totalPrice,
                                    'favorites',
                                    eventUid
                                )

                                dispatch(toggleSuccess(favoriteEvent, 'add'));
                            })
                            .catch(error => dispatch(toggleFail(error)));
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

export const resetFavoritesState = () => {

    return { type: FAVORITES_RESET_STATE };
}

export 

const fetchStart = () => {

    return { type: FAVORITES_FETCH_START }
}

const fetchSuccess = (events: Array<IFavoriteEvent>) => {

    return {
        type: FAVORITES_FETCH_SUCCESS,
        favoriteEvents: events
    }
}

const fetchFail = (error: string) => {

    return { 
        type: FAVORITES_FETCH_FAIL,
        error
    }
}

const toggleStart = () => {

    return { type: FAVORITES_TOGGLE_START }
}

const toggleSuccess = (event: IFavoriteEvent, toggleType: 'remove' | 'add') => {

    return {
        type: FAVORITES_TOGGLE_SUCCESS,
        selectedEvent: event,
        toggleType
    }
}

const toggleFail = (error: string) => {

    return { 
        type: FAVORITES_TOGGLE_FAIL,
        toggleError: error
    }
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