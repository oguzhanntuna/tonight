
import './EventPriceContainer.scss';
import { IThisWeekModuleEvent } from '../../../pages/homePage/HomePage';

import ThisWeekModuleEventPriceRow from './EventPriceRow';
import returnBackIcon from '../../../assets/icons/return-back.svg';

interface IThisWeekModuleEventPriceContainerProps {
    data: IThisWeekModuleEvent;
    selectedEventIdArray: Array<number | null>;
    onReturnBackButtonClicked(): void
}

const ThisWeekModuleEventPriceContainer = (props: IThisWeekModuleEventPriceContainerProps): JSX.Element => {
    const { data, selectedEventIdArray, onReturnBackButtonClicked } = props;

    return (
        <div className="eventPriceContainer">
            <div className="eventPriceContainer-header">
                <div className="eventPriceContainer-eventTitle">{data.title}</div>
                <div className="eventPriceContainer-returnBackIcon" onClick={() => onReturnBackButtonClicked()}>
                    <img src={returnBackIcon} alt="return back icon" />
                </div>
            </div>
            <div className="eventPriceContainer-content">
                <ThisWeekModuleEventPriceRow 
                    ticketType="2. Dönem" 
                    ticketPrice={data.price} 
                    selectedEventIdArray={selectedEventIdArray}
                />
                <ThisWeekModuleEventPriceRow 
                    ticketType="Backstage" 
                    ticketPrice={data.price} 
                    selectedEventIdArray={selectedEventIdArray}
                />
            </div>
        </div> 
    );
}

export default ThisWeekModuleEventPriceContainer;