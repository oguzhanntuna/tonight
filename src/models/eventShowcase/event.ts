import { IEventShowCaseTicket } from "../interfaces/eventShowcase/event";

export class EventShowcaseEvent{
    constructor(
        public id: number, 
        public title: string, 
        public image: string, 
        public location: string, 
        public date: string, 
        public normalTicket: IEventShowCaseTicket,
        public vipTicket: IEventShowCaseTicket,
        public totalPrice: number
    ) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.location = location;
        this.date = date;
        this.normalTicket = normalTicket;
        this.vipTicket = vipTicket;
        this.totalPrice = totalPrice;
    }
}