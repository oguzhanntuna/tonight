import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './eventDetail.scss';

import * as eventActions from '../../store/actions/events';
import { IApplicationState } from '../../models/interfaces/store/states/application';

import heroImage from '../../assets/heroImage.jpg';
import HeroImage from '../../components/heroImage/HeroImage';
import EventDetail from '../../components/eventDetailPage/eventDetail';
import EventPriceContainer from '../../components/eventDetailPage/eventPriceContainer';

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

    return (
        <div className="eventDetailPage">
            <HeroImage imageUrl={heroImage} />
            <div className="eventDetailPage-content">
                <div className="eventDetailPage-leftSide">
                    { selectedEvent && <EventDetail data={selectedEvent} /> }
                </div>
                <div className="eventDetailPage-rightSide">
                    <EventPriceContainer />
                </div>
            </div>
        </div>
    );
}

export default EventDetailPage;