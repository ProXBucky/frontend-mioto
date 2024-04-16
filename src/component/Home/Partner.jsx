import React, { useState } from 'react';
import Slider from 'react-slick';

function Partner() {

    const images = [
        '/partner1.jpg',
        '/partner2.jpg',
        '/partner3.jpg',
        '/partner4.jpg',
    ];

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 4,
    };
    return (
        <div className="px-32 py-20 bg-gray-100">
            <div className='text-center mb-20'>
                <h1 className='h-12 text-5xl font-bold'>Hành Trình Của Bạn Luôn Được Bảo Vệ</h1>
            </div>
            <Slider {...settings}>
                {images &&
                    images.map((item, index) => (
                        <div key={index} className='overflow-hidden'>
                            <img src={item} className='cursor-pointer h-[150px] w-[300px] bg-white border-2 border-gray-200 rounded-xl' alt={`Image ${index}`} />
                        </div>
                    ))}
            </Slider>
        </div>
    )

}

export default Partner