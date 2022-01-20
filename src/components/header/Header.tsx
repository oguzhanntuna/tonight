import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import'./Header.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';

import ProfileTab from './ProfileTab';
import favIconEmpty from '../../assets/icons/heart-outline.svg';
import cartIconEmpty from '../../assets/icons/cart-outline.svg';

const Header = (): JSX.Element => {
    const navigate = useNavigate();
    const activeUsername = useSelector((state: IApplicationState) => state.auth.displayName);

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
                {
                    activeUsername
                        ? <ProfileTab activeUsername={activeUsername} />
                        : <>
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
                        </>
                }
                <div 
                    className="userActionContainer-favorites" 
                    onClick={() => navigate('/favorites')}
                >
                    <div className="userActionContainer-favoritesIcon">
                        <img src={favIconEmpty} alt="favorites" /> 
                    </div>
                    <span>
                        Favorites
                    </span>
                </div>
                <div 
                    className="userActionContainer-cart"
                    onClick={() => navigate('/cart')}
                >
                    <div className="userActionContainer-cartIcon">
                        <img src={cartIconEmpty} alt="cart" />
                    </div>
                    <span>
                        Cart
                    </span>
                </div>
            </div>
        </div>
    )
};

export default Header;