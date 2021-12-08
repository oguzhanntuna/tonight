import { Routes, Route } from 'react-router-dom';
import './page.scss';

import HomePage from './home/home';
import EventsPage from './events/events';
import EventDetailPage from './eventDetail/eventDetail';
import ProfilePage from './profile/profile';

const Page = (): JSX.Element => {
    const PageRouting = () => (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:eventName" element={<EventDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    );

    return (
        <div className="page">
            <PageRouting />
        </div>
    );
}

export default Page;