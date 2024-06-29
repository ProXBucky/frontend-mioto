import { useState } from "react";
import { getOneBlogByBlogId } from "../../api/appAPI";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { useEffect } from "react";

function DetailBlog() {
    const [blogs, setBlog] = useState({});
    const { blog } = useParams()

    const getBlog = async () => {
        let res = await getOneBlogByBlogId(blog)
        if (res) {
            setBlog(res)
        } else {
            setBlog({})
        }
    }

    useEffect(() => {
        getBlog()
    }, [])


    return (
        <div className="w-full px-32 py-16">
            <div className="flex w-full flex-col gap-5 justify-between items-center mb-5">
                <img className="rounded-lg h-[calc(100vh-100px)] w-full object-cover" src={blogs.imageTitle} />
                <h1 className="font-bold text-5xl">{blogs.title}</h1>
                <h2 className="font-semibold text-xl">
                    Tác giả:
                    <span className="ml-2">{blogs.admin && blogs.admin.fullname}</span>
                </h2>
            </div>
            <ReactMarkdown className="text-xl">{blogs.content}</ReactMarkdown>
        </div>

    )

}

export default DetailBlog