import { useState, useEffect, useCallback } from 'react';
import useHover from '../../../customHooks/useHover';
import './ImageSlider.scss';

import sliderButton from '../../../assets/icons/arrow-forward-outline.svg';
import { imageSliderData } from '../../../data/imageSliderData';

const ImageSlider = (): JSX.Element => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const lastImageIndex: number = imageSliderData.length - 1;
    const [imageSliderRef, imageSliderHover] = useHover();

    const goToNextImage = useCallback((): void => {
        const nextImageIndex = currentImageIndex + 1

        setCurrentImageIndex(currentImageIndex === lastImageIndex ? 0 : nextImageIndex);
    }, [currentImageIndex, lastImageIndex]);

    const goToPreviousImage = (): void => {
        const previousImageIndex = currentImageIndex - 1;
        
        setCurrentImageIndex(currentImageIndex === 0 ? lastImageIndex : previousImageIndex);
    }

    useEffect(() => {
        const intervalId: NodeJS.Timeout = setInterval(() => { goToNextImage() }, 5000);

        if (imageSliderHover) {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [goToNextImage, imageSliderHover]);

    const renderPagination = (): JSX.Element => (
        <div className="imageSlider-pagination">
            {
                imageSliderData.map((_image, index) => (
                    <div 
                        className={`imageSlider-paginationItem ${currentImageIndex === index ? 'active' : ''}`} 
                        onClick={() => setCurrentImageIndex(index)}
                        key={`paginationItem-${index}`} 
                    />
                ))
            }
        </div>
    );

    const renderSliderItems = (): JSX.Element  => {

        if (imageSliderData.length > 0) {

            return (
                <div className="imageSlider-itemsContainer">
                    {
                        imageSliderData.map((imageData, index) => {
    
                            return (
                                <div 
                                    className={`imageSlider-item ${currentImageIndex === index ? 'active' : ''}`} 
                                    key={`imageSliderItem-${index}`}
                                >
                                    { 
                                        currentImageIndex === index && 
                                        <img src={imageData.imageUrl} alt={`imageSliderItem-${index}`} /> 
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            );
        }

        return <></>;
    }

    return (
        <div className="imageSlider" ref={imageSliderRef}>
            { renderSliderItems() }
            { renderPagination() }
            <div className="imageSlider-previousButton" onClick={() => goToPreviousImage()}>
                <img src={sliderButton} alt="previous button icon" />
            </div>
            <div className="imageSlider-nextButton" onClick={() => goToNextImage()}>
                <img src={sliderButton} alt="next button icon" />
            </div>
        </div>
    );
}

export default ImageSlider;