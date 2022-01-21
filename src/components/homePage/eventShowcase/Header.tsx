import './Header.scss';

import EventShowcaseFilters from './Filters';
import moreIcon from '../../../assets/icons/more.svg';
import { useNavigate } from 'react-router-dom';

interface IEventShowcaseHeaderProps {
    title: string;
    displayFilters: boolean
}

const EventShowcaseHeader = (props: IEventShowcaseHeaderProps): JSX.Element => {
    const { title, displayFilters } = props;
    const navigate = useNavigate();

    return (
        <div className="eventShowcaseHeader">
            <div className="eventShowcaseHeader-title">{title}</div>
            { displayFilters && <EventShowcaseFilters /> }
            <div className="eventShowcaseHeader-moreButton">
                <div 
                    className="eventShowcaseHeader-text"
                    onClick={() => navigate('/this-week')}
                >
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