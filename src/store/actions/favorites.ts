import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';
import { IFavoritesAction } from './../../models/interfaces/store/actions/favorites';

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const toggleFavorite = (addedEvent: IEventShowcaseEvent): IFavoritesAction => {

    return { type: TOGGLE_FAVORITE, addedEvent };
}
