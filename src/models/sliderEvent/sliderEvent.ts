export class SliderEvent {
    constructor(
        public id: number,
        public imageUrl: string,
        public moduleType: string,
        public redirectUrl: string
    ) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.moduleType = moduleType;
        this.redirectUrl = redirectUrl;
    }
}