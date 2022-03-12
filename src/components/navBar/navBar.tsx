import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import './navBar.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';

import homeIcon from "../../assets/icons/home.svg";
import activeHomeIcon from "../../assets/icons/active-home.svg";
import searchIcon from "../../assets/icons/search.svg";
import activeSearchIcon from "../../assets/icons/active-search.svg";
import cartIcon from "../../assets/icons/cart-outline.svg";
import activeCartIcon from "../../assets/icons/active-cart.svg";
import ticketIcon from "../../assets/icons/ticket.svg";
import activeTicketIcon from "../../assets/icons/active-ticket.svg";
import favIcon from "../../assets/icons/heart-outline.svg";
import activeFavIcon from "../../assets/icons/active-heart.svg";

const NavBar = () => {
    const { pathname } = useLocation();
    const cartCount = useSelector((state: IApplicationState) => state.cart.ticketCount);
    const activeSearchIconConditions = ['events', 'this-week', 'recently-added', 'buy-now']

    return (
        <nav className="navBar">
            <ul className="navBar-items">
                <li className="navBar-item">
                    <NavLink to="/">
                        <div className="navBar-iconContainer">
                            <img src={pathname === "/" ? activeHomeIcon : homeIcon} alt="home" />    
                        </div>
                    </NavLink>
                </li>
                <li className="navBar-item">
                    <NavLink to="/events">
                        <div className="navBar-iconContainer">
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
                <li className="navBar-cart">
                    <NavLink to="/cart">
                        <div className="navBar-iconContainer">
                            <img src={pathname.includes("cart") ? activeCartIcon : cartIcon} alt="cart" />    
                            {
                                cartCount > 0 &&
                                <span className="navBar-cartCount">
                                    {cartCount}
                                </span>
                            }
                        </div>
                    </NavLink>
                </li>
                <li className="navBar-item">
                    <NavLink to="/purchased-tickets">
                        <div className="navBar-iconContainer">
                            <img src={pathname.includes("purchased-tickets") ? activeTicketIcon : ticketIcon} alt="purchased" />    
                        </div>
                    </NavLink>
                </li>
                <li className="navBar-item">
                    <NavLink to="/favorites">
                        <div className="navBar-iconContainer">
                            <img src={pathname.includes("favorites") ? activeFavIcon : favIcon} alt="favorites" />    
                        </div>
                    </NavLink>
                </li>
            </ul>    
        </nav>
    );
}

export default NavBar;