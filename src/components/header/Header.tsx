import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import'./Header.scss';

import { useDeviceType } from '../../customHooks/useDeviceType';
import { IApplicationState } from '../../models/interfaces/store/states/application';

import AccountTab from './AccountTab';
import favIconEmpty from '../../assets/icons/heart/heart-outline.svg';
import cartIconEmpty from '../../assets/icons/cart/cart-outline.svg';
import PrimaryButton from '../primaryButton/primaryButton';

const Header = (): JSX.Element => {
    const deviceType = useDeviceType();
    const navigate = useNavigate();
    const activeUsername = useSelector((state: IApplicationState) => state.auth.displayName);
    const cartCount = useSelector((state: IApplicationState) => state.cart.ticketCount);
    const favoritesCount = useSelector((state: IApplicationState) => state.favorites.favoriteEvents.length);

    document.addEventListener('scroll', () => {
        const headerElement = document.getElementById('backgroundOverlay');
        
        window.pageYOffset > 0 ? headerElement?.classList.add('active') : headerElement?.classList.remove('active');
    });

    if (deviceType === 'desktop') {

        return (
            <div className="header" id="header">
                <div className="header-backgroundOverlay" id="backgroundOverlay" />
                <Link to="/" className="logo">Tonight</Link>
                <ul className="navigationContainer">
                    <NavLink to="/events" className="navigationContainer-tab">All Events</NavLink>
                    <NavLink to="/this-week" className="navigationContainer-tab">This Week</NavLink>
                    <NavLink to="/recently-added" className="navigationContainer-tab">Recently Added</NavLink>
                    <NavLink to="/buy-now" className="navigationContainer-tab">Buy Now</NavLink>
                </ul>
                <div className="userActionContainer">
                    {
                        activeUsername
                            ? <AccountTab tabLabel={activeUsername} />
                            : <AccountTab />
                    }
                    <div 
                        className="userActionContainer-favorites" 
                        onClick={() => navigate('/favorites')}
                    >
                        <div className="userActionContainer-favoritesIcon">
                            <img src={favIconEmpty} alt="favorites" /> 
                        </div>
                        <p>Favorites</p>
                        {
                            favoritesCount > 0 &&
                            <span>{`(${favoritesCount})`}</span>
                        }
                    </div>
                    <div 
                        className="userActionContainer-cart"
                        onClick={() => navigate('/cart')}
                    >
                        <div className="userActionContainer-cartIcon">
                            <img src={cartIconEmpty} alt="cart" />
                        </div>
                        <p> Cart</p>
                        {
                            cartCount > 0 &&
                            <span className="userActionContainer-cartCount">
                                {cartCount}
                            </span>
                        }
                    </div>
                </div>
            </div>
        );
    }

    if (deviceType === 'mobile') {
        return (
            <div className="header" id="header">
                <div className="header-backgroundOverlay" id="backgroundOverlay" />
                <Link to="/" className="logo">Tonight</Link>
                <div className="userActionContainer">
                    {
                        activeUsername
                            ? <AccountTab tabLabel={activeUsername} /> 
                            : <>
                                <PrimaryButton 
                                    className="userActionContainer-loginButton" 
                                    width="6rem" 
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </PrimaryButton>
                                <PrimaryButton 
                                    className="userActionContainer-signupButton" 
                                    width="6rem" 
                                    onClick={() => navigate('/signup')}
                                >
                                    Sign Up
                                </PrimaryButton>
                            </>
                    }
                    
                </div>
            </div>
        )
    }  

    return <></>;
};

export default Header;