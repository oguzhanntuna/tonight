import './Layout.scss'

import Header from './components/header/Header';
import HomePage from './pages/homePage/HomePage';
import heroImage from './assets/heroImage.jpg';

const Layout = (): JSX.Element => {
  return (
    <div className="layout">
      <div className="layout-heroImage" style={{ backgroundImage: `url("${heroImage}")` }}/>
      <div className="layout-heroImageOverlay"/>
      <Header />
      <div className="page">
        <HomePage />  
      </div>
    </div>
  )
}

export default Layout;
