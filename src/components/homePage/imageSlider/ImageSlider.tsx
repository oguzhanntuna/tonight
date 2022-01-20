import { useState, useEffect, useCallback } from 'react';
import { useHover } from '../../../customHooks/useHover';
import './ImageSlider.scss';

import sliderButton from '../../../assets/icons/arrow-forward-outline.svg';
import { imageSliderData } from '../../../data/imageSliderData';

const ImageSlider = (): JSX.Element => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [paginationItemLoadingPercentage, setPaginationItemLoadingPercentage] = useState<number>(0);
    const [imageSliderRef, imageSliderHover] = useHover();
    
    const lastImageIndex: number = imageSliderData.length - 1;

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
        const loadingPercentageIntervalId: NodeJS.Timeout = setInterval(() => {

            setPaginationItemLoadingPercentage(prevLoadingPercentage => prevLoadingPercentage + 1);
        }, 50);

        if (imageSliderHover) {
            clearInterval(intervalId);
            clearInterval(loadingPercentageIntervalId);
            setPaginationItemLoadingPercentage(0);
        }

        return () => { 
            clearInterval(intervalId);
            clearInterval(loadingPercentageIntervalId);
            setPaginationItemLoadingPercentage(0);
        } 
    }, [goToNextImage, imageSliderHover]);

    const renderPagination = (): JSX.Element => (
        <div className="imageSlider-pagination">
            {
                imageSliderData.map((_image, index) => (
                    <div 
                        className={`imageSlider-paginationItem ${currentImageIndex === index ? 'active' : ''}`} 
                        onClick={() => setCurrentImageIndex(index)}
                        key={`paginationItem-${index}`}
                    >
                        {
                            currentImageIndex === index
                                ? <div 
                                    className="imageSlider-paginationLoader" 
                                    style={{ width: `${paginationItemLoadingPercentage}%` }} 
                                />
                                : <></>
                        }
                    </div>
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
                <div className="imageSlider-previousIcon">
                    <img src={sliderButton} alt="previous button icon" />
                </div>
            </div>
            <div className="imageSlider-nextButton" onClick={() => goToNextImage()}>
                <div className="imageSlider-nextIcon">
                    <img src={sliderButton} alt="next button icon" />
                </div>
            </div>
        </div>
    );
}

export default ImageSlider;