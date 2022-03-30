import { IEventShowCaseTicket } from "../interfaces/eventShowcase/eventShowcase";

export class EventShowcaseEvent {
    constructor(
        public id: number, 
        public title: string, 
        public imageUrl: string, 
        public location: string, 
        public date: string, 
        public url: string,
        public description: Array<string>,
        public normalTicket: IEventShowCaseTicket,
        public vipTicket: IEventShowCaseTicket,
        public totalPrice: number,
        public moduleType: string
    ) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.location = location;
        this.date = date;
        this.url = url;
        this.description = description;
        this.normalTicket = normalTicket;
        this.vipTicket = vipTicket;
        this.totalPrice = totalPrice;
        this.moduleType = moduleType;
    }

    public resetEvent = () => {
        this.normalTicket.count = 0;
        this.vipTicket.count = 0;
        this.totalPrice = 0;
    }
}