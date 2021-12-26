import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './eventDetail.scss';

import * as eventActions from '../../store/actions/events';

import { IApplicationState } from '../../models/interfaces/store/states/application';

const EventDetailPage = (): JSX.Element => {
    const { fetchSelectedEvent } = eventActions;

    const selectedEvent = useSelector((state: IApplicationState) => state.events.selectedEvent);
    const dispatch = useDispatch();

    useEffect(() => {
        const pathname = window.location.pathname;
        const pathnameArray = pathname.split('/');
        const event = pathnameArray[pathnameArray.length - 1];

        dispatch(fetchSelectedEvent(event));

        window.scrollTo({ top: 0, left: 0 });
    }, [dispatch, fetchSelectedEvent]);

    console.log(selectedEvent);

    return (
        <div className="eventDetailPage">
            Event Detail Page
        </div>
    );
}

export default EventDetailPage;