import { IFavoriteEvent } from './../../favoriteEvent/favoriteEvent';
export interface IFavoritesState {
    favoriteEvents: Array<IFavoriteEvent>;
    fetchLoading: boolean;
    toggleLoading: boolean;
    fetchError: string | null;
    toggleError: string | null;
}