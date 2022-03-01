import { IFavoriteEvent } from './../../favoriteEvent/favoriteEvent';

export interface IFavoritesAction {
    type: string;
    favoriteEvents?: Array<IFavoriteEvent>;
    selectedEvent?: IFavoriteEvent;
    loading?: boolean;
    error?: string;
    toggleType?: 'remove' | 'add';
}