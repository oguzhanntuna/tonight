import { useLocation } from 'react-router-dom';
import './Footer.scss';

const Footer = (): JSX.Element => {
    const location = useLocation();
    const { pathname } = location;

    return (
        <div className={`footer ${pathname === '/cart' ? 'footer-morePaddingForCartPage' : ''}`}>
            <div className="footer-seperator"></div>
            <div className="footer-content">
                <span>Developed by © Oguzhan Tuna. All Rights Reserved.</span>
            </div>
        </div>
    );
}

export default Footer;