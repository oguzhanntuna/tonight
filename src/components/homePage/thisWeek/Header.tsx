import './Header.scss';

import ThisWeekModuleFilters from './Filters';
import moreIcon from '../../../assets/icons/more.svg';

interface IThisWeekModuleHeaderProps {
    title: string;
    displayFilters: boolean
}

const ThisWeekModuleHeader = (props: IThisWeekModuleHeaderProps): JSX.Element => {
    const { title, displayFilters } = props;

    return (
        <div className="thisWeekModuleHeader">
            <div className="thisWeekModuleHeader-title">{title}</div>
            { displayFilters && <ThisWeekModuleFilters /> }
            <div className="thisWeekModuleHeader-moreButton">
                <div className="thisWeekModuleHeader-text">
                    See All
                </div>
                <div className="thisWeekModuleHeader-moreIcom">
                    <img src={moreIcon} alt="more icon" />
                </div>
            </div>
        </div>
    );
}

export default ThisWeekModuleHeader;