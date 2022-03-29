import { IOrder } from '../../models/interfaces/order/order';
import axios from 'axios';

import { uniqueId } from '../../models/interfaces/purchasedTicket/purchasedTicket';
import { ILocalStorageUserData } from "../../models/interfaces/auth/auth";
import { IPurchasedTicket } from '../../models/interfaces/purchasedTicket/purchasedTicket';
import { PurchasedTicket } from '../../models/purchasedTicket/purchasedTicket';
import { Order } from '../../models/order/order';

export const ADD_TO_ORDERS = 'ADD_TO_ORDERS';
export const FETCH_ORDERS = 'FETCH_ORDERS';

export const fetchOrders = () => {
    return (dispatch: any) => {
        const userData = localStorage.getItem('userDataJSON');
        
        if (userData) {
            const parsedUserData: ILocalStorageUserData = JSON.parse(userData);
            const { userId } = parsedUserData;
            const ordersUrl = `https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json`;

            axios.get(ordersUrl)
                .then(response => {
                    const { data } = response;
                    const fetchedOrders: { [key: uniqueId]: IOrder } = data;
                    let orders: Array<IOrder> = [];

                    for (let orderUid in fetchedOrders) {
                        const fetchedOrder = fetchedOrders[orderUid];
                        let purchasedTicketArray: Array<IPurchasedTicket> = [];

                        fetchedOrder.purchasedTickets.forEach(ticket => {
                            const purchasedTicket = new PurchasedTicket(
                                ticket.id,
                                ticket.title,
                                ticket.imageUrl,
                                ticket.location,
                                ticket.date,
                                ticket.url,
                                ticket.normalTicket,
                                ticket.vipTicket,
                                ticket.totalPrice
                            );

                            
                            purchasedTicketArray.push(purchasedTicket);
                        });

                        const order: IOrder = new Order(
                            purchasedTicketArray,
                            fetchedOrder.date
                        )
                        orders.push(order);
                    }

                    dispatch({
                        type: FETCH_ORDERS,
                        orders
                    });
                })
                .catch(error => console.log(error));
        }
    }
}