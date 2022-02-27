import { Routes, Route } from 'react-router-dom';
import './page.scss';

import HomePage from './home/home';
import AllEventsPage from './allEvents/allEvents';
import EventDetailPage from './eventDetail/eventDetail';
import LoginPage from './login/login';
import SignupPage from './signup/signup';
import FavoritesPage from './favorites/favorites';
import ThisWeekEventsPage from './thisWeekEvents/thisWeekEvents';
import RecentlyAddedEventsPage from './recentlyAddedEvents/recentlyAddedEvents';
import BuyNowEventsPage from './buyNowEvents/buyNowEvents';
import CartPage from './cart/cart';
import PurchasedTicketsPage from './purchasedTickets/purchasedTickets';

const Page = (): JSX.Element => {
    const PageRouting = (): JSX.Element => (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<AllEventsPage />} />
            <Route path="/this-week" element={<ThisWeekEventsPage />} />
            <Route path="/recently-added" element={<RecentlyAddedEventsPage />} />
            <Route path="/buy-now" element={<BuyNowEventsPage />} />
            <Route path="/events/:eventName" element={<EventDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/purchased-tickets" element={<PurchasedTicketsPage />} />
            {/* Add 404 pages */}
        </Routes>
    );

    return (
        <div className="page">
            <PageRouting />
        </div>
    );
}

export default Page;