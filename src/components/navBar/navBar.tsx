import { NavLink } from 'react-router-dom';
import './navBar.scss';

const NavBar = () => {

    return (
        <nav className="navBar">
            <ul className="navBar-items">
                <li className="navBar-item">
                    <NavLink to="/">
                        Home
                    </NavLink>
                </li>
                <li className="navBar-item">
                    <NavLink to="/events">
                        Search
                    </NavLink>
                </li>
                <li className="navBar-item">
                    <NavLink to="/cart">
                        Cart
                    </NavLink>
                </li>
                <li className="navBar-item">
                    <NavLink to="/purchased-tickets">
                        Purchased
                    </NavLink>
                </li>
                <li className="navBar-item">
                    <NavLink to="/favorites">
                        Favorites
                    </NavLink>
                </li>
            </ul>    
        </nav>
    );
}

export default NavBar;