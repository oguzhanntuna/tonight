import sliderImage1 from '../assets/sliderImage-1.png';
import sliderImage2 from '../assets/sliderImage-2.png';
import sliderImage3 from '../assets/sliderImage-3.png';
import sliderImage4 from '../assets/sliderImage-4.png';
import sliderImage5 from '../assets/sliderImage-5.png';

interface IImageData {
    imageUrl: string;
}

const imageSliderData: Array<IImageData> = [
    {
        imageUrl: sliderImage1
    },
    {
        imageUrl: sliderImage2
    },
    {
        imageUrl: sliderImage3
    },
    {
        imageUrl: sliderImage4
    },
    {
        imageUrl: sliderImage5
    }
];

export default imageSliderData;