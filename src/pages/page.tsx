import React, { Suspense } from 'react';  
import { Routes, Route } from 'react-router-dom';
import './page.scss';

import Spinner from '../components/spinner/spinner';

const Page = (): JSX.Element => {
    const HomePage = React.lazy(() => import('./home/home'));
    const AllEventsPage = React.lazy(() => import('./allEvents/allEvents'));
    const EventDetailPage = React.lazy(() => import('./eventDetail/eventDetail'));
    const LoginPage = React.lazy(() => import('./login/login'));
    const SignupPage = React.lazy(() => import('./signup/signup'));
    const FavoritesPage = React.lazy(() => import('./favorites/favorites'));
    const ThisWeekEventsPage = React.lazy(() => import('./thisWeekEvents/thisWeekEvents'));
    const RecentlyAddedEventsPage = React.lazy(() => import('./recentlyAddedEvents/recentlyAddedEvents'));
    const BuyNowEventsPage = React.lazy(() => import('./buyNowEvents/buyNowEvents'));
    const CartPage = React.lazy(() => import('./cart/cart'));
    const PurchasedTicketsPage = React.lazy(() => import('./purchasedTickets/purchasedTickets'));

    const PageRouting = (): JSX.Element => (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<AllEventsPage />} />
            <Route path="/this-week" element={<ThisWeekEventsPage />} />
            <Route path="/recently-added" element={<RecentlyAddedEventsPage />} />
            <Route path="/buy-now" element={<BuyNowEventsPage />} />
            <Route path="/:tabName/:eventName" element={<EventDetailPage />} />
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
            <Suspense fallback={<Spinner />} >
                <PageRouting />
            </Suspense>
        </div>
    );
}

export default Page;