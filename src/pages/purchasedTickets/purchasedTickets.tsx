import './purchasedTickets.scss';

import heroImage from '../../assets/hero.jpg';
import HeroImage from '../../components/heroImage/HeroImage';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../../models/interfaces/store/states/application';
import { useEffect } from 'react';
import EventTicket from '../../components/eventTicket/EventTicket';

const PurchasedTicketsPage = (): JSX.Element => {
    const orders = useSelector((state: IApplicationState) => state.orders.orders);

    useEffect(() => {
        console.log('orders: ', orders);
    }, [orders]);

    const renderPurchasedTickets = () => (
        <div className="orders">
            {
                orders.map(order => {
                    const purchasedTickets = order.purchasedTickets;

                    return (
                        <div className="orders-orderContainer">
                            <div className="orders-orderDate">
                                31 Ocak 2022
                            </div>
                            <div className="orders-purchasedTicketsContainer">
                                { 
                                    purchasedTickets.map(purchasedTicket => (
                                        <div className="orders-purchasedTicket">
                                            {
                                                // purchasedTicket.title 
                                                <EventTicket eventData={purchasedTicket} />
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );

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

export default PurchasedTicketsPage;