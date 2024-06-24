import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLocation, setLocationCode } from '../../redux/Slice/SearchSlice';
import { convertCityName } from '../../utils/convertCityName';

const SamplePrevArrow = (props) => {
    const { style, onClick } = props;
    return (
        <div
            className="absolute"
            style={{ ...style, zIndex: "1", left: "-20px", top: "45%", cursor: "pointer", borderRadius: "50%", border: "1px solid #d8dae5", backgroundColor: "#f6f6f6" }}
            onClick={onClick}
        >
            <i className="fa-solid fa-chevron-left fa-sm text-black py-4 px-4"></i>
        </div>
    );
}

const SampleNextArrow = (props) => {
    const { style, onClick } = props;
    return (
        <div
            className="absolute"
            style={{ ...style, zIndex: "1", right: "-20px", top: "45%", cursor: "pointer", borderRadius: "50%", border: "1px solid #d8dae5", backgroundColor: "#f6f6f6" }}
            onClick={onClick}
        >
            <i className="fa-solid fa-chevron-right fa-sm text-black py-4 px-4"></i>
        </div>
    );
}

function City() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const images = [
        {
            link: '/city8.jpg',
            name: 'TP. Hồ Chí Minh',
            sumCar: '3200+',
            location: 'hoChiMinh',
            locationName: 'Hồ Chí Minh',
        },
        {
            link: '/city7.jpg',
            name: 'Hà Nội',
            sumCar: '1400+',
            location: 'haNoi',
            locationName: 'Hà Nội',
        },
        {
            link: '/city6.jpg',
            name: 'Đà Nẵng',
            sumCar: '320+',
            location: 'daNang',
            locationName: 'Đà Nẵng'
        },
        {
            link: '/city5.jpg',
            name: 'Bình Dương',
            sumCar: '330+',
            location: 'binhDuong',
            locationName: 'Bình Dương'
        },
        {
            link: '/city4.jpg',
            name: 'Đà Lạt',
            sumCar: '160+',
            location: 'daLat',
            locationName: 'Lâm Đồng'
        },
        {
            link: '/city3.jpg',
            name: 'Phú Quốc',
            sumCar: '150+',
            location: 'kienGiang',
            locationName: 'Kiên Giang'
        },
        {
            link: '/city2.jpg',
            name: 'Nha Trang',
            sumCar: '130+',
            location: 'khanhHoa',
            locationName: 'Khánh Hòa',
        },
        {
            link: '/city1.jpg',
            name: 'Hải Phòng',
            sumCar: '70+',
            location: 'haiPhong',
            locationName: 'Hải Phòng'
        },

    ];

    const navigateCarByCity = (item) => {
        dispatch(setLocation(item.locationName))
        dispatch(setLocationCode(convertCityName(item.locationName)))
        navigate(`/city/${item.location}`)
    }

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 4,
        slidesToShow: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className="px-32 py-20">
            <div className='text-center mb-20'>
                <h1 className='h-12 text-5xl font-bold'>Địa Điểm Nổi Bật</h1>
            </div>

            <Slider {...settings}>
                {images &&
                    images.map((item, index) => (
                        <div key={index} className='relative h-[460px] px-2 overflow-hidden cursor-pointer hover:opacity-90 outline-none' onClick={() => navigateCarByCity(item)}>
                            <img src={item.link} className='rounded-xl h-[460px]' alt={`Image ${index}`} />
                            <div className='text-white absolute h-20 bottom-0 left-6'>
                                <p className='font-bold text-xl'>{item.name}</p>
                                <p className='font-semibold'>{item.sumCar} xe</p>
                            </div>
                        </div>
                    ))}
            </Slider>

        </div>
    )

}

export default City