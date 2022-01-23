import { useScrollToTop } from '../../customHooks/useScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './eventDetail.scss';

import * as eventActions from '../../store/actions/events';
import { IApplicationState } from '../../models/interfaces/store/states/application';

import heroImage from '../../assets/techno2.jpg';
import HeroImage from '../../components/heroImage/HeroImage';
import EventDetail from '../../components/eventDetailPage/EventDetail';
import EventPriceSlip from '../../components/eventDetailPage/EventPriceSlip';

const EventDetailPage = (): JSX.Element => {
    const { fetchEventDetail } = eventActions;

    const selectedEvent = useSelector((state: IApplicationState) => state.events.eventDetail);
    const dispatch = useDispatch();

    useScrollToTop();

    useEffect(() => {
        const pathname = window.location.pathname;
        const pathnameArray = pathname.split('/');
        const event = pathnameArray[pathnameArray.length - 1];

        dispatch(fetchEventDetail(event));

    }, [dispatch, fetchEventDetail]);

    return (
        <div className="eventDetailPage">
            <HeroImage imageUrl={heroImage} />
            <div className="eventDetailPage-content">
                <div className="eventDetailPage-leftSide">
                    { selectedEvent && <EventDetail eventData={selectedEvent} /> }
                </div>
                <div className="eventDetailPage-rightSide">
                    { selectedEvent && <EventPriceSlip data={selectedEvent} /> }
                </div>
            </div>
        </div>
    );
}

export default EventDetailPage;