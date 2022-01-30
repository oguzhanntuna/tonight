import { OrderItem } from './../../models/orderItem/orderItem';
import axios from 'axios';

import { ILocalStorageUserData } from "../../models/interfaces/auth/auth";
import { IMyTicketEvent } from './../../models/interfaces/myTickets/myTickets';
import { uniqueId } from '../../models/interfaces/myTickets/myTickets';

export const ADD_TO_MY_TICKETS = 'ADD_TO_MY_TICKETS';
export const FETCH_MY_TICKETS = 'FETCH_MY_TICKETS';

export const fetchMyTickets = () => {
    return (dispatch: any) => {
        const userData = localStorage.getItem('userDataJSON');
        
        if (userData) {
            const parsedUserData: ILocalStorageUserData = JSON.parse(userData);
            const { userId } = parsedUserData;
            const myTicketsUrl = `https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/my-tickets/${userId}.json`;

            // dispatch(setLoading());
            axios.get(myTicketsUrl)
                .then(response => {
                    const { data } = response;
                    const myTickets: { [key: uniqueId]: Array<IMyTicketEvent> } = data;
                    let orders: Array<Array<IMyTicketEvent>> = [];

                    for (let myTicketstUid in myTickets) {
                        let order: Array<IMyTicketEvent> = [];

                        const fetchedOrder = myTickets[myTicketstUid];

                        fetchedOrder.forEach(item => {
                            const orderItem = new OrderItem(
                                item.id,
                                item.title,
                                item.imageUrl,
                                item.location,
                                item.date,
                                item.url,
                                item.normalTicket,
                                item.vipTicket,
                                item.totalPrice
                            )

                            order.push(orderItem);
                        });

                        orders.push(order);
                    }

                    dispatch({
                        type: FETCH_MY_TICKETS,
                        myTickets: orders
                    });
                })
                .catch(error => console.log(error));
        }

        // dispatch({
        //     type: FETCH_FAVORITES,
        //     favoritesEvent: []
        // });
    }
}