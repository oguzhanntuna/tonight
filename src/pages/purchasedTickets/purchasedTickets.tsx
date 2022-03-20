import { useSelector } from 'react-redux';
import './purchasedTickets.scss';

import { useScrollToTop } from '../../customHooks/useScrollToTop';
import { IApplicationState } from '../../models/interfaces/store/states/application';

import heroImage from '../../assets/hero.jpg';
import ticketIcon from '../../assets/icons/ticket/ticket-full.svg';
import HeroImage from '../../components/heroImage/HeroImage';
import EventTicket from '../../components/eventTicket/EventTicket';
import EmptyState from '../../components/emptyState/EmptyState';

const PurchasedTicketsPage = (): JSX.Element => {
    const orders = useSelector((state: IApplicationState) => state.orders.orders);

    useScrollToTop();

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

    const renderEmptyState = (): JSX.Element => (
        
        <EmptyState 
            icon={ticketIcon}
            text="No tickets are purchased yet!"
        />
    );

    return (
        <div className="purchasedTicketsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="purchasedTicketsPageContainer">
                <div className="purchasedTicketsPageContainer-title">
                    Purchased Tickets
                </div>
                { 
                    orders && orders.length > 0
                        ? renderPurchasedTickets()
                        : renderEmptyState()
                }
            </div>
        </div>
    );
}

export default PurchasedTicketsPage;