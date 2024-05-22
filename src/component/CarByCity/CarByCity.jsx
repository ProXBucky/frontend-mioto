import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { getListCarByCity } from '../../api/carAPI';
import { useParams } from 'react-router-dom';
import Banner from '../Home/Banner';
import CarList from '../../features/car/carList';
import Other from '../Home/Other';
import Blog from '../Home/Blog';
import ReviewByCity from './ReviewByCity';
import { getAllReviewByCity } from '../../api/appAPI';
import { useSelector } from 'react-redux';
import { locationCodeSelector } from '../../redux/selector';


function CarByCity({ handleOpenDateModal, handleOpenLocationModal }) {
    const locationCode = useSelector(locationCodeSelector)
    const [carArray, setCarArray] = useState([])
    const [allReview, setAllReview] = useState([])
    let { city } = useParams('city')

    const fetchListCarByCity = async () => {
        let res = await getListCarByCity(city)
        if (res && res.length > 0) {
            setCarArray(res)
        } else {
            setCarArray([])
        }
    }

    const fetchAllReviewByCity = async () => {
        let res = await getAllReviewByCity(locationCode)
        if (res && res.length > 0) {
            setAllReview(res)
        } else {
            setAllReview([])
        }
    }

    useEffect(() => {
        fetchListCarByCity()
        fetchAllReviewByCity()
    }, [])


    return (
        <>
            <LazyLoad height={200}>
                <Banner city="city" cityName={city} handleOpenDateModal={handleOpenDateModal} handleOpenLocationModal={handleOpenLocationModal} />
            </LazyLoad>
            <LazyLoad height={200}>
                <CarList city="city" isHiddenTitle={false} carArray={carArray} />
            </LazyLoad>
            <LazyLoad height={200}>
                <ReviewByCity allReview={allReview} />
            </LazyLoad>
            <LazyLoad height={200}>
                <Other />
            </LazyLoad>
            <LazyLoad height={200}>
                <Blog />
            </LazyLoad>
        </>
    );
}

export default (CarByCity);
