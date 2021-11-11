import './Module.scss';

import ThisWeekModuleHeader from './Header';
import ThisWeekModuleEventsContainer from './EventsContainer';
import image from '../../../assets/Screen Shot 2021-11-09 at 4.19.30 PM.png';

export interface IThisWeekModuleEvent {
    id: number;
    title: string;
    image: string;
    location: string;
    date: string;
    price: string;
}

const ThisWeekModule = (): JSX.Element => {
    const eventsDataArray: Array<IThisWeekModuleEvent> = [
        {
            id: 1,
            title: "Enrico Sangiuliano",
            location: "Klein Phönix",
            date: "10 Nov 2021 Wed 18:00 - 00:00",
            price: "20$",
            image 
        },
        {
            id: 2,
            title: "Enrico Sangiuliano",
            location: "Klein Phönix",
            date: "10 Nov 2021 Wed 18:00 - 00:00",
            price: "20$",
            image 
        },
        {
            id: 3,
            title: "Enrico Sangiuliano",
            location: "Klein Phönix",
            date: "10 Nov 2021 Wed 18:00 - 00:00",
            price: "20$",
            image 
        },{
            id: 4,
            title: "Enrico Sangiuliano",
            location: "Klein Phönix",
            date: "10 Nov 2021 Wed 18:00 - 00:00",
            price: "20$",
            image 
        }
    ];

    return (
        <div className="thisWeekModule">
            <ThisWeekModuleHeader />
            <ThisWeekModuleEventsContainer data={eventsDataArray} />            
        </div>   
    );
}

export default ThisWeekModule;