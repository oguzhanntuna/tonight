import'./Header.scss';

const Header = (): JSX.Element => (
    <div className="header">
        <div className="logo">Tonight</div>
        <div className="seperator" />
        <ul className="navigationContainer">
            <li className="navigationContainer-tab">Events</li>
        </ul>
        <div className="userActionContainer">
            <button className="userActionContainer-login">Log In</button>
            <button className="userActionContainer-signup">Sign Up</button>
        </div>
    </div>
);

export default Header;