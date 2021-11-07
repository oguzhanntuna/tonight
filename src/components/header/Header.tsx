import'./Header.scss';

const Header = (): JSX.Element => {

    return (
        <div className="header">
            <div className="logo">Tonight</div>
            <div className="seperator" />
            <div className="tabContainer">
                <div className="tabContainer-tab">Events</div>
                <div className="tabContainer-tab">Profile</div>
            </div>
        </div>
    );
}

export default Header;