import { Link, NavLink } from 'react-router-dom';
import'./Header.scss';

const Header = (): JSX.Element => {

    document.addEventListener('scroll', () => {
        const headerElement = document.getElementById('header');
        
        window.pageYOffset > 0 ? headerElement?.classList.add('blur') : headerElement?.classList.remove('blur');
    });

    return (
        <div className="header" id="header">
            <Link to="/" className="logo">Tonight</Link>
            <ul className="navigationContainer">
                <NavLink to="/events" className="navigationContainer-tab">Events</NavLink>
            </ul>
            <div className="userActionContainer">
                <button className="userActionContainer-login">Log In</button>
                <button className="userActionContainer-signup">Sign Up</button>
            </div>
        </div>
    )
};

export default Header;