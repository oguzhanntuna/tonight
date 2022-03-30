import { useSelector } from 'react-redux';
import { useDeviceType } from '../../customHooks/useDeviceType';
import './cart.scss';

import { useScrollToTop } from '../../customHooks/useScrollToTop';
import { IApplicationState } from '../../models/interfaces/store/states/application';

import heroImage from '../../assets/hero.jpg'
import cartIcon from '../../assets/icons/cart/cart-full.svg';
import HeroImage from '../../components/heroImage/HeroImage';
import EmptyState from '../../components/emptyState/EmptyState';
import EventTicket from '../../components/eventTicket/EventTicket';
import Checkout from '../../components/checkout/Checkout';
import Spinner from '../../components/spinner/spinner';

const CartPage = (): JSX.Element => {
    const deviceType = useDeviceType();
    const { cartItems, fetchLoading } = useSelector((state: IApplicationState) => state.cart);

    useScrollToTop();

    const renderCartEvents = (): JSX.Element => (
        <div className="cartEvents">
            {
                cartItems.map((cartItem, index) => (
                    <EventTicket  
                        key={`${index}-${cartItem?.id}`} 
                        eventData={cartItem} 
                    />
                ))
            }
        </div>
    );

    const renderEmptyState = (): JSX.Element => (
        <EmptyState 
            icon={cartIcon}
            text="No tickets in cart yet!"
        />
    );

    const renderDesktopLayout = () => (
        <>
            <div className="cartPageContainer-leftSide">
                <div className="cartPageContainer-title">
                    My Cart
                </div>
                {
                    fetchLoading
                        ? <Spinner />
                        : cartItems && cartItems.length > 0
                            ? renderCartEvents()
                            : renderEmptyState()
                }
            </div>
            {
                cartItems && cartItems.length > 0 && !fetchLoading && 
                <div className="cartPageContainer-rightSide">
                    <Checkout cartItems={cartItems} cartPurchasable={cartItems.length > 0} />
                </div>
            }
        </>
    );

    const renderMobileLayout = () => (
        <>
            <div className="cartPageContainer-leftSide">
                <div className="cartPageContainer-title">
                    My Cart
                </div>
                {
                    fetchLoading
                        ? <Spinner />
                        : cartItems && cartItems.length > 0
                            ? renderCartEvents()
                            : renderEmptyState()
                }
            </div>
            <Checkout cartItems={cartItems} cartPurchasable={cartItems.length > 0} />
        </>
    );

    return (
        <div className="cartPage">
            <HeroImage imageUrl={heroImage} />
            <div className={`
                cartPageContainer 
                ${cartItems.length === 0 ? 'cartPageContainer--emptyState' : ''}
            `}>
                { deviceType === 'desktop' && renderDesktopLayout() }
                { deviceType === 'mobile' && renderMobileLayout() }
            </div>
        </div>
    );
}

export default CartPage;