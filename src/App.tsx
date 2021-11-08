import './App.scss';

import Header from './components/header/Header';
import HomePage from './pages/homePage/HomePage';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Header />
      <HomePage />
    </div>
  )
}

export default App;
