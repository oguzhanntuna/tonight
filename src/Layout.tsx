import { useSelector } from 'react-redux';
import './Layout.scss'

import { IApplicationState } from './models/interfaces/store/states/application';

import Header from './components/header/Header';
import Page from './pages/page';
import Footer from './components/footer/Footer';

const Layout = (): JSX.Element => {
  const auth = useSelector((state: IApplicationState) => state.auth);

  console.log(auth);

  return (
    <div className="layout">
      <Header />
      <Page />
      <Footer />
    </div>
  )
}

export default Layout;
