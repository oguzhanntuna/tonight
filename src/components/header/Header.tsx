import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import'./Header.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as AuthActions from '../../store/actions/auth';

const Header = (): JSX.Element => {
    const { logout } = AuthActions;
    const dispatch = useDispatch();
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
                        ? <>
                            <div>
                                <button onClick={() => dispatch(logout())}>
                                    Log Out
                                </button>
                                <div>
                                    {activeUsername}
                                </div>
                            </div>
                        </>
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
            </div>
        </div>
    )
};

export default Header;