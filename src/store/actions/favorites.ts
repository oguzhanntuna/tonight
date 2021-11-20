import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';
import { IFavoritesAction } from './../../models/interfaces/store/actions/favorites';

export const TOGGLE_FAVORITES = 'TOGGLE_FAVORITES';

export const toggleFavorites = (addedEvent: IEventShowcaseEvent): IFavoritesAction => {

    return { type: TOGGLE_FAVORITES, addedEvent };
}
