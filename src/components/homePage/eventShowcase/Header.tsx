import './Header.scss';

import EventShowcaseFilters from './Filters';
import moreIcon from '../../../assets/icons/more.svg';

interface IEventShowcaseHeaderProps {
    title: string;
    displayFilters: boolean
}

const EventShowcaseHeader = (props: IEventShowcaseHeaderProps): JSX.Element => {
    const { title, displayFilters } = props;

    return (
        <div className="eventShowcaseHeader">
            <div className="eventShowcaseHeader-title">{title}</div>
            { displayFilters && <EventShowcaseFilters /> }
            <div className="eventShowcaseHeader-moreButton">
                <div className="eventShowcaseHeader-text">
                    See All
                </div>
                <div className="eventShowcaseHeader-moreIcom">
                    <img src={moreIcon} alt="more icon" />
                </div>
            </div>
        </div>
    );
}

export default EventShowcaseHeader;