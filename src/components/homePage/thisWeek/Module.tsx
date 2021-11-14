import './Module.scss';
import { IThisWeekModuleEvent } from '../../../pages/homePage/HomePage';

import ThisWeekModuleHeader from './Header';
import ThisWeekModuleEventsContainer from './EventsContainer';

interface IThisWeekModuleProps {
    title: string;
    displayFilters: boolean;
    data: Array<IThisWeekModuleEvent>
}

const ThisWeekModule = (props: IThisWeekModuleProps): JSX.Element => {
    const { title, data, displayFilters } = props;

    return (
        <div className="thisWeekModule" >
            <ThisWeekModuleHeader title={title} displayFilters={displayFilters}/>
            <ThisWeekModuleEventsContainer data={data} />            
        </div>   
    );
}

export default ThisWeekModule;