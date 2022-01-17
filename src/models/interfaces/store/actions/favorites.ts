import { IFavoriteEvent } from './../../favoriteEvent/favoriteEvent';

export interface IFavoritesAction {
    type: string;
    addedEvent: IFavoriteEvent;
    loading: boolean;
}