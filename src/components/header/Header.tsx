import { Link, NavLink, useNavigate } from 'react-router-dom';
import'./Header.scss';

const Header = (): JSX.Element => {
    const navigate = useNavigate();

    document.addEventListener('scroll', () => {
        const headerElement = document.getElementById('header');
        
        window.pageYOffset > 0 ? headerElement?.classList.add('blurred') : headerElement?.classList.remove('blurred');
    });

    return (
        <div className="header" id="header">
            <Link to="/" className="logo">Tonight</Link>
            <ul className="navigationContainer">
                <NavLink to="/events" className="navigationContainer-tab">Events</NavLink>
            </ul>
            <div className="userActionContainer">
                <button 
                    className="userActionContainer-login"
                    onClick={() => navigate('/login')} 
                >
                    Log In
                </button>
                <button 
                    className="userActionContainer-signup"
                    onClick={() => navigate('/signup')}
                >
                    Sign Up
                </button>
            </div>
        </div>
    )
};

export default Header;