import { Routes, Route } from 'react-router-dom';
import './Layout.scss'

import Header from './components/header/Header';
import HomePage from './pages/home';
import EventDetailPage from './pages/eventDetail';
import heroImage from './assets/heroImage.jpg';

const Layout = (): JSX.Element => {

  return (
    <div className="layout">
      <div className="layout-heroImage" style={{ backgroundImage: `url("${heroImage}")` }}/>
      <div className="layout-heroImageOverlay"/>
      <Header />
      <div className="page">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:eventName" element={<EventDetailPage />} />
      </Routes>
      </div>
    </div>
  )
}

export default Layout;
