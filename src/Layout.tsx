import './Layout.scss'

import Header from './components/header/Header';
import Page from './pages/page';
import Footer from './components/footer/Footer';

const Layout = (): JSX.Element => {

  return (
    <div className="layout">
      <Header />
      <Page />
      <Footer />
    </div>
  )
}

export default Layout;
