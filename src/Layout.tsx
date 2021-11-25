import './Layout.scss'

import heroImage from './assets/heroImage.jpg';
import Header from './components/header/Header';
import Page from './pages';
import Footer from './components/footer/Footer';

const Layout = (): JSX.Element => {

  return (
    <div className="layout">
      <div className="layout-heroImage" style={{ backgroundImage: `url("${heroImage}")` }}/>
      <div className="layout-heroImageOverlay"/>
      <Header />
      <Page />
      <Footer />
    </div>
  )
}

export default Layout;
