import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useHover } from '../../../customHooks/useHover';
import './ImageSlider.scss';

import * as SliderActions from '../../../store/actions/slider';
import { IApplicationState } from '../../../models/interfaces/store/states/application';
import { ISliderEvent } from '../../../models/interfaces/sliderEvent/slider';

import sliderButton from '../../../assets/icons/arrow-forward-outline.svg';

const ImageSlider = (): JSX.Element => {
    const { fetchSliderEvents } = SliderActions;
    const sliderState = useSelector((state: IApplicationState) => state.slider);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sliderItems, setSliderItems] = useState<Array<ISliderEvent>>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [paginationItemLoadingPercentage, setPaginationItemLoadingPercentage] = useState<number>(0);
    const [imageSliderRef, imageSliderHover] = useHover();
    const lastImageIndex: number = sliderItems.length - 1;

    useEffect(() => {
        if (sliderState.sliderEvents.length === 0) {

            dispatch(fetchSliderEvents());
        }
    }, [sliderState.sliderEvents.length, dispatch, fetchSliderEvents]);

    useEffect(() => {
        if (sliderState.sliderEvents && sliderState.sliderEvents.length > 0 && !sliderState.loading) {
            setSliderItems([ ...sliderState.sliderEvents ]);
        }
    }, [sliderState]);

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
                sliderItems.map((sliderItem, index) => (
                    <div 
                        className={`imageSlider-paginationItem ${currentImageIndex === index ? 'active' : ''}`} 
                        onClick={() => setCurrentImageIndex(index)}
                        key={`paginationItem-${sliderItem.id}`}
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

    const renderSliderItems = (): JSX.Element  => (
        <div className="imageSlider-itemsContainer">
            {
                sliderItems.map((sliderItem, index) => {

                    return (
                        <div 
                            className={`imageSlider-item ${currentImageIndex === index ? 'active' : ''}`} 
                            key={`imageSliderItem-${index}`}
                            onClick={() => navigate(`/${sliderItem.moduleType}/${sliderItem.redirectUrl}`)}
                        >
                            { 
                                currentImageIndex === index && 
                                <img src={sliderItem.imageUrl} alt={`imageSliderItem-${sliderItem.id}`} /> 
                            }
                        </div>
                    )
                })
            }
        </div>
    );

    return (
        <div className="imageSlider" ref={imageSliderRef}>
            { sliderItems.length > 0 && renderSliderItems() }
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