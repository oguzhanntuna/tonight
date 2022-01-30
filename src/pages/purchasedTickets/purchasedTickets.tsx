import './purchasedTickets.scss';

import heroImage from '../../assets/techno2.jpg';
import HeroImage from '../../components/heroImage/HeroImage';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../../models/interfaces/store/states/application';
import { useEffect } from 'react';

const PurchasedTickets = (): JSX.Element => {
    const orders = useSelector((state: IApplicationState) => state.orders.orders);

    useEffect(() => {
        console.log('orders: ', orders);
    }, [orders]);

    const renderPurchasedTickets = () => {

        return (
            <div className="purchasedTickets">
                {
                    orders.map(order => {
                        <div className="purchasedTickets-orderContainer">
                            Orders
                            {/* <EventTicket data={order} /> */}
                        </div>
                    })
                }
            </div>
        );
    }

    return (
        <div className="purchasedTicketsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="purchasedTicketsPageContainer">
                <div className="purchasedTicketsPageContainer-title">
                    Purchased Tickets
                </div>
                { renderPurchasedTickets() }
            </div>
        </div>
    );
}

export default PurchasedTickets;