import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import './bottomNavBar.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';

import homeIcon from "../../assets/icons/home/home.svg";
import activeHomeIcon from "../../assets/icons/home/active-home.svg";
import searchIcon from "../../assets/icons/search/search.svg";
import activeSearchIcon from "../../assets/icons/search/active-search.svg";
import cartIcon from "../../assets/icons/cart/cart-outline.svg";
import activeCartIcon from "../../assets/icons/cart/active-cart.svg";
import ticketIcon from "../../assets/icons/ticket/ticket-outline.svg";
import activeTicketIcon from "../../assets/icons/ticket/active-ticket.svg";
import favIcon from "../../assets/icons/heart/heart-outline.svg";
import activeFavIcon from "../../assets/icons/heart/active-heart.svg";

const BottomNavBar = () => {
    const { pathname } = useLocation();
    const cartCount = useSelector((state: IApplicationState) => state.cart.ticketCount);
    const activeSearchIconConditions = ['events', 'this-week', 'recently-added', 'buy-now']

    return (
        <nav className="bottomNavBar">
            <ul className="bottomNavBar-items">
                <li className="bottomNavBar-item">
                    <NavLink to="/">
                        <div className="bottomNavBar-iconContainer">
                            <img src={pathname === "/" ? activeHomeIcon : homeIcon} alt="home" />    
                        </div>
                    </NavLink>
                </li>
                <li className="bottomNavBar-item">
                    <NavLink to="/events">
                        <div className="bottomNavBar-iconContainer">
                            <img 
                                src={
                                    activeSearchIconConditions.some(
                                        condition => pathname.includes(condition)
                                    ) 
                                        ? activeSearchIcon 
                                        : searchIcon
                                } 
                                alt="all-events" 
                            />    
                        </div>
                    </NavLink>
                </li>
                <li className="bottomNavBar-cart">
                    <NavLink to="/cart">
                        <div className="bottomNavBar-iconContainer">
                            <img src={pathname.includes("cart") ? activeCartIcon : cartIcon} alt="cart" />    
                            {
                                cartCount > 0 &&
                                <span className="bottomNavBar-cartCount">
                                    {cartCount}
                                </span>
                            }
                        </div>
                    </NavLink>
                </li>
                <li className="bottomNavBar-item">
                    <NavLink to="/purchased-tickets">
                        <div className="bottomNavBar-iconContainer">
                            <img src={pathname.includes("purchased-tickets") ? activeTicketIcon : ticketIcon} alt="purchased" />    
                        </div>
                    </NavLink>
                </li>
                <li className="bottomNavBar-item">
                    <NavLink to="/favorites">
                        <div className="bottomNavBar-iconContainer">
                            <img src={pathname.includes("favorites") ? activeFavIcon : favIcon} alt="favorites" />    
                        </div>
                    </NavLink>
                </li>
            </ul>    
        </nav>
    );
}

export default BottomNavBar;