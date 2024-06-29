
import { useEffect, useState } from 'react';
import { getAllBlogsWithLimit } from '../../api/appAPI';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function Blog() {

    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()

    const fetchAllBlogs = async () => {
        let res = await getAllBlogsWithLimit(3)
        if (res && res.length > 0) {
            setBlogs(res)
        } else {
            setBlogs([])
        }
    }

    const handleClick = (blogId) => {
        navigate(`/blog/${blogId}`)
    }

    const formatDate = (date) => {
        if (!date) return ''; // Handle null or undefined date
        try {
            return format(new Date(date), "dd/MM/yyyy");
        } catch (error) {
            console.error('Error formatting date:', error);
            return ''; // Return empty string or handle gracefully
        }
    };

    useEffect(() => {
        fetchAllBlogs()
    }, [])

    return (
        <div className="px-32 py-20">
            <div className='text-center mb-20'>
                <h1 className='h-12 text-5xl font-bold'>MIOTO Blog</h1>
            </div>
            <div className="flex flex-row gap-5">
                <div className="flex flex-col w-1/3 gap-4">
                    <div className="relative cursor-pointer" onClick={() => handleClick(blogs[0].blogId)}>
                        <img src={blogs && blogs[0] && blogs[0].imageTitle} className="h-[250px] w-full rounded-3xl object-cover" />
                        <div className="text-white absolute bottom-5 left-5 pr-2">
                            <p className='font-semibold text-lg'>{formatDate(blogs && blogs[0] && blogs[0].publishDate)}</p>
                            <h2 className="font-bold text-xl">{blogs && blogs[0] && blogs[0].title}</h2>
                        </div>
                    </div>
                    <div className="relative cursor-pointer" onClick={() => handleClick(blogs[1].blogId)}>
                        <img src={blogs && blogs[1] && blogs[1].imageTitle} className="h-[250px] w-full rounded-3xl object-cover" />
                        <div className="text-white absolute bottom-5 left-5 pr-2">
                            <p className='font-semibold text-lg'>{formatDate(blogs && blogs[1] && blogs[1].publishDate)}</p>
                            <h2 className="font-bold text-xl">{blogs && blogs[1] && blogs[1].title}</h2>
                        </div>
                    </div>

                </div>
                <div className="w-2/3 relative cursor-pointer" onClick={() => handleClick(blogs[2].blogId)}>
                    <img src={blogs && blogs[2] && blogs[2].imageTitle} className="h-[520px] w-full rounded-3xl object-cover" />
                    <div className="text-white absolute bottom-10 left-5 pr-2">
                        <p className='font-semibold text-2xl'>{formatDate(blogs && blogs[2] && blogs[2].publishDate)}</p>
                        <h2 className="font-bold text-4xl">{blogs && blogs[2] && blogs[2].title}</h2>
                    </div>
                </div>
            </div>
        </div >
    )

}

export default Blog