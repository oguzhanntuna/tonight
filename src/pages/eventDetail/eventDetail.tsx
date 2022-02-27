import { useScrollToTop } from '../../customHooks/useScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './eventDetail.scss';

import * as eventDetailActions from '../../store/actions/eventDetail';
import { IApplicationState } from '../../models/interfaces/store/states/application';

import heroImage from '../../assets/hero.jpg';
import HeroImage from '../../components/heroImage/HeroImage';
import EventDetail from '../../components/eventDetailPage/EventDetail';
import EventPriceSlip from '../../components/eventDetailPage/EventPriceSlip';

const EventDetailPage = (): JSX.Element => {
    const { eventName } = useParams();
    const { event: selectedEvent, loading } = useSelector((state: IApplicationState) => state.eventDetail);
    const dispatch = useDispatch();
    
    useScrollToTop();

    useEffect(() => {
        const { fetchEventDetail } = eventDetailActions;

        if (eventName && !selectedEvent) {
            dispatch(fetchEventDetail(eventName));
        }
    }, [eventName, selectedEvent, dispatch]);

    return (
        <div className="eventDetailPage">
            <HeroImage imageUrl={heroImage} />
            <div className="eventDetailPage-content">
                {
                    loading
                        ? <p>Loading...</p>
                        : <>
                            <div className="eventDetailPage-leftSide">
                                { selectedEvent && <EventDetail eventData={selectedEvent} /> }
                            </div>
                            <div className="eventDetailPage-rightSide">
                                { selectedEvent && <EventPriceSlip data={selectedEvent} /> }
                            </div>
                        </>
                }
            </div>
        </div>
    );
}

export default EventDetailPage;