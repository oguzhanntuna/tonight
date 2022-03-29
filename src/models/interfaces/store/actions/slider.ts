import { ISliderEvent } from '../../sliderEvent/slider';

export interface ISliderActions {
    type: string;
    sliderEvents: Array<ISliderEvent>;
    error: string;
}