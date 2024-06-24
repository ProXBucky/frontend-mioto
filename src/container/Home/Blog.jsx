
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getAllBlogs } from '../../api/appAPI';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function Blog() {

    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()

    const fetchAllBlogs = async () => {
        let res = await getAllBlogs()
        if (res && res.length > 0) {
            setBlogs(res)
        } else {
            setBlogs([])
        }
    }

    const handleClick = (blogId) => {
        navigate(`/blog/${blogId}`)
    }

    useEffect(() => {
        fetchAllBlogs()
    }, [])

    const SamplePrevArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div
                className="absolute"
                style={{ ...style, zIndex: "1", left: "10px", top: "45%", cursor: "pointer" }}
                onClick={onClick}
            >
                <i className="fa-solid fa-chevron-left fa-2xl text-black" style={{ fontSize: "50px" }}></i>
            </div>
        );
    }

    const SampleNextArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div
                className="absolute"
                style={{ ...style, zIndex: "1", right: "10px", top: "45%", cursor: "pointer" }}
                onClick={onClick}
            >
                <i className="fa-solid fa-chevron-right fa-2xl text-black" style={{ fontSize: "50px" }}></i>
            </div>
        );
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <div className="px-32 py-20">
            <div className='text-center mb-20'>
                <h1 className='h-12 text-5xl font-bold'>MIOTO Blog</h1>
            </div>
            <Slider {...settings}>
                {blogs && blogs.length > 0 &&
                    blogs.map((blog, index) => (
                        <div key={index} className='relative w-full overflow-hidden outline-none h-[calc(100vh-100px)]'
                        >
                            <img src={blog.imageTitle} className='cursor-pointer w-5/6 mx-auto bg-white border-2 border-gray-200' alt={`Image ${index}`} onClick={() => handleClick(blog.blogId)} />
                            <div className='absolute bottom-10 text-white mx-[150px] bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm p-3 rounded-md'>
                                <p className='text-xl font-semibold'>{format(blog.publishDate, "dd/MM/yyyy")}</p>
                                <h2 className='text-3xl font-bold'>{blog.title}</h2>
                            </div>
                        </div>
                    ))}
            </Slider>
        </div>
    )

}

export default Blog