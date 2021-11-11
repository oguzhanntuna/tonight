import './Header.scss';

import ThisWeekModuleFilters from './Filters';
import moreIcon from '../../../assets/icons/more.svg';

const ThisWeekModuleHeader = (): JSX.Element => {

    return (
        <div className="thisWeekModuleHeader">
            <div className="thisWeekModuleHeader-title">
                This Week
            </div>
            <ThisWeekModuleFilters />
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