import { Routes, Route } from 'react-router-dom';
import './index.scss';

import HomePage from './home';
import EventsPage from './events';
import EventDetailPage from './eventDetail';
import ProfilePage from './profile';

const Page = (): JSX.Element => {
    const PageRouting = () => (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="events" element={<EventsPage />}>
                <Route path=":eventName" element={<EventDetailPage />} />
            </Route>
            <Route path="profile" element={<ProfilePage />} />
        </Routes>
    );

    return (
        <div className="page">
            <PageRouting />
        </div>
    );
}

export default Page;