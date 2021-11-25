import { Link, NavLink } from 'react-router-dom';
import'./Header.scss';

const Header = (): JSX.Element => (
    <div className="header">
        <Link to="/" className="logo">Tonight</Link>
        {/* <div className="seperator" /> */}
        <ul className="navigationContainer">
            <NavLink to="/events" className="navigationContainer-tab">Events</NavLink>
        </ul>
        <div className="userActionContainer">
            <button className="userActionContainer-login">Log In</button>
            <button className="userActionContainer-signup">Sign Up</button>
        </div>
    </div>
);

export default Header;