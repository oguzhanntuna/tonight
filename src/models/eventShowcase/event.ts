import { IEventShowCaseTicket } from "../interfaces/eventShowcase/event";

export class EventShowcaseEvent{
    constructor(
        public id: number, 
        public title: string, 
        public image: string, 
        public location: string, 
        public date: string, 
        public url: string,
        public normalTicket: IEventShowCaseTicket,
        public vipTicket: IEventShowCaseTicket,
        public _totalPrice: number
    ) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.location = location;
        this.date = date;
        this.url = url;
        this.normalTicket = normalTicket;
        this.vipTicket = vipTicket;
        this.totalPrice = _totalPrice;
    }

    public get totalPrice(): number { return this._totalPrice }
    
    public set totalPrice(value: number) { this._totalPrice = value; }
    
}