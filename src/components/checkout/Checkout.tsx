import { useDispatch } from 'react-redux';
import './Checkout.scss';

import * as CartActions from '../../store/actions/cart';
import { ICartEvent } from '../../models/interfaces/cartEvent/cartEvent';

interface ICheckoutProps {
    cartItems: Array<ICartEvent>;
    cartPurchasable: boolean;
}

const Checkout = (props: ICheckoutProps): JSX.Element => {
    const { cartItems, cartPurchasable } = props;
    const { purchaseCart } = CartActions;
    const dispatch = useDispatch();

    const calculateTotalPrice = (): number => {
        let totalPrice: number = 0;

        cartItems.forEach(cartItem => {
            totalPrice = totalPrice + cartItem.totalPrice;
        });

        return totalPrice;
    }

    const getTotalPrice = (): string => {
        const totalPrice = calculateTotalPrice();

        return `${totalPrice}$`;
    }   

    return (
        <div className="checkout">
            <div className="checkout-title">
                Checkout Summary
            </div>
            <div className="totalPrice">
                <div className="totalPrice-text">
                    Total Price:
                </div>
                <div className="totalPrice-price">
                    { getTotalPrice() }
                </div>
            </div>
            <button 
                className={`
                    checkout-purchaseButton 
                    ${!cartPurchasable ? 'checkout-purchaseButton--disabled' : ''}
                `}
                onClick={() => dispatch(purchaseCart())}
                disabled={!cartPurchasable}
            >
                Purchase
            </button>
        </div>
    );
}

export default Checkout;