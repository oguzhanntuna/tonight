import { useSelector } from 'react-redux';
import './cart.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';

import heroImage from '../../assets/hero.jpg'
import cartIcon from '../../assets/icons/cart-full.svg';
import HeroImage from '../../components/heroImage/HeroImage';
import EmptyState from '../../components/emptyState/EmptyState';
import EventTicket from '../../components/eventTicket/EventTicket';
import Checkout from '../../components/checkout/Checkout';
import Spinner from '../../components/spinner/spinner';

const CartPage = (): JSX.Element => {
    const { cartItems, fetchLoading } = useSelector((state: IApplicationState) => state.cart);

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
    )

    return (
        <div className="cartPage">
            <HeroImage imageUrl={heroImage} />
            <div className="cartPageContainer">
                <div className="cartPageContainer-title">
                    My Cart
                </div>
                <div className="cartPageContainer-content">
                    {
                        fetchLoading
                            ? <Spinner />
                            : <>
                                <div className="cartPageContainer-leftSide">
                                    {
                                        cartItems && cartItems.length > 0
                                            ? renderCartEvents()
                                            : renderEmptyState()
                                    }
                                </div>
                                {
                                    cartItems && cartItems.length > 0 &&
                                    <div className="cartPageContainer-rightSide">
                                        <Checkout cartItems={cartItems} cartPurchasable={cartItems.length > 0} />
                                    </div>
                                }
                            </>
                    }
                </div>
            </div>
        </div>
    );
}

export default CartPage;