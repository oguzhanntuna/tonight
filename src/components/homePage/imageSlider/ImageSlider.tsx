import { useState, useEffect, useCallback } from 'react';
import useHover from '../../../customHooks/useHover';
import './ImageSlider.scss';

import sliderButton from '../../../assets/icons/arrow-forward-outline.svg';
import imageSliderData from '../../../data/imageSliderData';

const ImageSlider = (): JSX.Element => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const lastImageIndex: number = imageSliderData.length - 1;
    const [imageSliderRef, imageSliderHover] = useHover();

    const goToNextImage = useCallback((): void => {
        setCurrentImageIndex(
            prevImageIndex => currentImageIndex === lastImageIndex
                ? 0 
                : prevImageIndex + 1
        );
    }, [currentImageIndex, lastImageIndex]);

    const goToPreviousImage = (): void => {
        setCurrentImageIndex(
            prevImageIndex => currentImageIndex === 0 
                ? lastImageIndex
                : prevImageIndex - 1
        );
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
                        imageSliderData.map((image, index) => {
    
                            return (
                                <div 
                                    className={`imageSlider-item ${currentImageIndex === index ? 'active' : ''}`} 
                                    key={`imageSliderItem-${index}`}
                                >
                                    { 
                                        currentImageIndex === index && 
                                        <img src={image.imageUrl} alt={`imageSliderItem-${index}`} /> 
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
                <img src={sliderButton} alt="previousButton" />
            </div>
            <div className="imageSlider-nextButton" onClick={() => goToNextImage()}>
                <img src={sliderButton} alt="nextButton" />
            </div>
        </div>
    );
}

export default ImageSlider;