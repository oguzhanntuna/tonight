import './HomePage.scss';

import ImageSlider from '../../components/homePage/imageSlider/ImageSlider';
import ThisWeekModule from '../../components/homePage/ThisWeek/Module';
import image from '../../assets/Screen Shot 2021-11-09 at 4.19.30 PM.png';

export interface IThisWeekModuleEvent {
    id: number;
    title: string;
    image: string;
    location: string;
    date: string;
    price: string;
}

const HomePage = (): JSX.Element => {
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
        <div className="homePage">
            <ImageSlider />
            <ThisWeekModule title="This Week" data={eventsDataArray} displayFilters={true} />
            <ThisWeekModule title="Recently Added" data={eventsDataArray} displayFilters={false} />
            <ThisWeekModule title="Most Popular" data={eventsDataArray} displayFilters={false} />
        </div>
    );
}

export default HomePage;