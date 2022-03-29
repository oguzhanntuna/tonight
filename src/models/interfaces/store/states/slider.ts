import { ISliderEvent } from '../../sliderEvent/slider';

export interface ISliderState {
    sliderEvents: Array<ISliderEvent>;
    loading: boolean;
    error: string | null;
}