import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './cart.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';

import heroImage from '../../assets/heroImage.jpg'
import cartIcon from '../../assets/icons/cart-full.svg';
import HeroImage from '../../components/heroImage/HeroImage';
import EmptyState from '../../components/emptyState/EmptyState';

const CartPage = (): JSX.Element => {
    const cartItems = useSelector((state: IApplicationState) => state.cart.cartItems);

    useEffect(() => {
        console.log(cartItems);

    }, [cartItems]);

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
                    {/* {
                        favoriteEvents && favoriteEvents.length > 0
                            ? renderFavoriteEvents()
                            : renderEmptyState()
                    } */}
                    {
                        renderEmptyState()
                    }
                </div>
            </div>
        </div>
    );
}

export default CartPage;