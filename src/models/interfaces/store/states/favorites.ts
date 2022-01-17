import { IFavoriteEvent } from './../../favoriteEvent/favoriteEvent';
export interface IFavoritesState {
    favoriteEvents: Array<IFavoriteEvent | null>;
    loading: boolean;
}