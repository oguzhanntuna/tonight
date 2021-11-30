import { IEventShowcaseEvent } from '../models/interfaces/eventShowcase/event';
import { EventShowcaseEvent } from '../models/eventShowcase/event';

import image from '../assets/Screen Shot 2021-11-09 at 4.19.30 PM.png';

export const EVENT_SHOWCASE_DATA_ARRAY: Array<IEventShowcaseEvent> = [
    new EventShowcaseEvent(
        1, 
        'Enrico Sangiuliano', 
        image, 
        'Klein Phönix', 
        '10 Nov 2021 Wed 18:00 - 00:00',
        'enrico-sangiuliano-1',
        {
            type: 'normal',
            title: '1. Dönem',
            price: 20,
            count: 0 
        },
        {
            type: 'vip',
            title: 'Backstage',
            price: 60,
            count: 0
        },
        0,
        'moduleType'
    ),
    new EventShowcaseEvent(
        2, 
        'Enrico Sangiuliano', 
        image, 
        'Klein Phönix', 
        '10 Nov 2021 Wed 18:00 - 00:00',
        'enrico-sangiuliano-2',
        {
            type: 'normal',
            title: '1. Dönem',
            price: 20,
            count: 0 
        },
        {
            type: 'vip',
            title: 'Backstage',
            price: 60,
            count: 0
        },
        0,
        'moduleType'
    ),
    new EventShowcaseEvent(
        3, 
        'Enrico Sangiuliano', 
        image, 
        'Klein Phönix', 
        '10 Nov 2021 Wed 18:00 - 00:00',
        'enrico-sangiuliano-3',
        {
            type: 'normal',
            title: '1. Dönem',
            price: 20,
            count: 0 
        },
        {
            type: 'vip',
            title: 'Backstage',
            price: 60,
            count: 0
        },
        0,
        'moduleType'
    ),
    new EventShowcaseEvent(
        4, 
        'Enrico Sangiuliano', 
        image, 
        'Klein Phönix', 
        '10 Nov 2021 Wed 18:00 - 00:00',
        'enrico-sangiuliano-4',
        {
            type: 'normal',
            title: '1. Dönem',
            price: 20,
            count: 0 
        },
        {
            type: 'vip',
            title: 'Backstage',
            price: 60,
            count: 0
        },
        0,
        'moduleType'
    ),
    new EventShowcaseEvent(
        5, 
        'Enrico Sangiuliano', 
        image, 
        'Klein Phönix', 
        '10 Nov 2021 Wed 18:00 - 00:00',
        'enrico-sangiuliano-5',
        {
            type: 'normal',
            title: '1. Dönem',
            price: 20,
            count: 0 
        },
        {
            type: 'vip',
            title: 'Backstage',
            price: 60,
            count: 0
        },
        0,
        'moduleType'
    )
];