import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './cart.scss';

import { useLoggedIn } from '../../customHooks/useLoggedIn';
import { IApplicationState } from '../../models/interfaces/store/states/application';

import heroImage from '../../assets/hero.jpg'
import cartIcon from '../../assets/icons/cart-full.svg';
import HeroImage from '../../components/heroImage/HeroImage';
import EmptyState from '../../components/emptyState/EmptyState';
import EventTicket from '../../components/eventTicket/EventTicket';
import Checkout from '../../components/checkout/Checkout';

const CartPage = (): JSX.Element => {
    const cartItems = useSelector((state: IApplicationState) => state.cart.cartItems);
    const isLoggedin = useLoggedIn();

    useEffect(() => {
        console.log('cartItems:', cartItems);

    }, [cartItems]);

    const renderCartEvents = (): JSX.Element => {

        return <div className="cartEvents">
            {
                cartItems.map((cartItem, index) => (
                    <EventTicket  
                        key={`${index}-${cartItem?.id}`} 
                        eventData={cartItem} 
                    />
                ))
            }
        </div>
    } 

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
                    <div className="cartPageContainer-leftSide">
                        {
                            cartItems && cartItems.length > 0
                                ? renderCartEvents()
                                : renderEmptyState()
                        }
                    </div>
                    <div className="cartPageContainer-rightSide">
                        {
                            isLoggedin &&
                            <Checkout cartItems={cartItems} cartPurchasable={cartItems.length > 0} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;