import { useDispatch, useSelector } from 'react-redux';
import './Checkout.scss';

import * as CartActions from '../../store/actions/cart';
import { ICartEvent } from '../../models/interfaces/cartEvent/cartEvent';
import { IApplicationState } from '../../models/interfaces/store/states/application';

import Spinner from '../spinner/spinner';
import PrimaryButton from '../primaryButton/primaryButton';
import cancelButton from '../../assets/icons/cancel.svg';
import { useDeviceType } from '../../customHooks/useDeviceType';
import { useNavigate } from 'react-router-dom';

interface ICheckoutProps {
    cartItems: Array<ICartEvent>;
    cartPurchasable: boolean;
}

const Checkout = (props: ICheckoutProps): JSX.Element => {
    const { cartItems, cartPurchasable } = props;
    const deviceType = useDeviceType();
    const navigate = useNavigate();
    const { purchaseCart } = CartActions;
    const { purchaseLoading } = useSelector((state: IApplicationState) => state.cart);
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
            {
                deviceType === 'desktop'
                    ? (
                        <div className="checkout-title">
                            Checkout Summary
                        </div>
                    )
                    : (
                        <div className="checkout-headerContainer">
                            <div className="checkout-title">
                                Checkout Summary
                            </div>
                            <div 
                                className="checkout-cancelButton"
                                onClick={() => navigate('/')}
                            >
                                <img src={cancelButton} alt="cancel" />
                            </div>
                        </div>
                    )
            }
            <div className="totalPrice">
                <div className="totalPrice-text">
                    Total Price:
                </div>
                <div className="totalPrice-price">
                    { getTotalPrice() }
                </div>
            </div>
            <PrimaryButton
                className={`
                    checkout-purchaseButton 
                    ${!cartPurchasable ? 'checkout-purchaseButton--disabled' : ''}
                    ${purchaseLoading ? 'checkout-purchaseButton--loading' : ''}
                `}
                onClick={() => dispatch(purchaseCart())}
                disabled={!cartPurchasable}
            >
                {
                    purchaseLoading 
                        ? (
                            <Spinner 
                                width='2.5rem' 
                                height='2.5rem' 
                                borderWidth='.2rem' 
                            /> 
                        )
                        : 'Purchase'
                }
            </PrimaryButton>
        </div>
    );
}

export default Checkout;