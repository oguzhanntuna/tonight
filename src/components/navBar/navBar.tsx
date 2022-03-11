import { NavLink } from 'react-router-dom';
import './navBar.scss';

import homeIcon from "../../assets/icons/home.svg";
import searchIcon from "../../assets/icons/search.svg";
import cartIcon from "../../assets/icons/cart-outline.svg"
import ticketIcon from "../../assets/icons/ticket.svg";
import favIcon from "../../assets/icons/heart-outline.svg";

const NavBar = () => {

    return (
        <nav className="navBar">
            <ul className="navBar-items">
                <li className="navBar-item">
                    <NavLink to="/">
                        <div className="navBar-iconContainer">
                            <img src={homeIcon} alt="home" />    
                        </div>
                        <p>Home </p>
                    </NavLink>
                </li>
                <li className="navBar-item">
                    <NavLink to="/events">
                        <div className="navBar-iconContainer">
                            <img src={searchIcon} alt="all-events" />    
                        </div>
                        <p>Search</p>
                    </NavLink>
                </li>
                <li className="navBar-cart">
                    <NavLink to="/cart">
                        <div className="navBar-iconContainer">
                            <img src={cartIcon} alt="cart" />    
                        </div>
                        <p>Cart</p>
                    </NavLink>
                </li>
                <li className="navBar-item">
                    <NavLink to="/purchased-tickets">
                        <div className="navBar-iconContainer">
                            <img src={ticketIcon} alt="purchased" />    
                        </div>
                        <p>Purchased</p>
                    </NavLink>
                </li>
                <li className="navBar-item">
                    <NavLink to="/favorites">
                        <div className="navBar-iconContainer">
                            <img src={favIcon} alt="favorites" />    
                        </div>
                        <p>Favorites</p>
                    </NavLink>
                </li>
            </ul>    
        </nav>
    );
}

export default NavBar;