import './Module.scss';

import ThisWeekModuleHeader from './Header';
import ThisWeekModuleEvents from './Events';

const ThisWeekModule = (): JSX.Element => {

    return (
        <div className="thisWeekModule">
            <ThisWeekModuleHeader />
            <ThisWeekModuleEvents />
        </div>   
    );
}

export default ThisWeekModule;