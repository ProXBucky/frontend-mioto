import { useEffect, useState } from "react"
import { getAllReviewByCity } from "../../../api/appAPI"
import { useSelector } from "react-redux"
import { adminTokenSelector } from "../../../redux/selector"
import { format } from "date-fns"
import { toast } from "react-toastify"
import { deleteReviewByReviewId } from "../../../api/adminAPI"
import CitySelect from "../../../component/CitySelect"
import { convertCityName } from "../../../utils/convertCityName"

function ManageReview() {
    const [reviews, setReviews] = useState([])
    const adminToken = useSelector(adminTokenSelector)

    const [selectedCity, setSelectedCity] = useState('Hà Nội');

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const fetchAllReviews = async (selectedCity) => {
        let res = await getAllReviewByCity(convertCityName(selectedCity))
        if (res && res.length > 0) {
            setReviews(res)
        } else {
            setReviews([])
        }
    }

    const deleteReviewByID = async (reviewId) => {
        try {
            if (window.confirm("Bạn có muốn xóa bình luận này không?")) {
                let res = await deleteReviewByReviewId(reviewId, adminToken);
                if (res) {
                    fetchAllReviews(selectedCity)
                    toast.success("Xóa bình luận thành công");
                }
            }
        } catch (error) {
            console.log(error)
            toast.error("Lỗi hệ thống, xóa bình luận thất bại")
        }
    }


    useEffect(() => {
        fetchAllReviews(selectedCity)
    }, [])

    useEffect(() => {
        fetchAllReviews(selectedCity)
    }, [selectedCity])



    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Bình luận</h2>
                <CitySelect value={selectedCity} onChange={handleCityChange} />
            </div>
            <div className="w-full mt-10 pb-16">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm leading-normal">
                            <th className="py-3 px-6 text-center">Họ tên</th>
                            <th className="py-3 px-3 text-center">Nội dung</th>
                            <th className="py-3 px-4 text-center">Ngày</th>
                            <th className="py-3 px-6 text-center">Điểm</th>
                            <th className="py-3 px-6 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-normal">
                        {
                            reviews && reviews.length > 0 ?
                                reviews.map((review, index) => {
                                    return (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={index}>
                                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <img className="h-10 rounded-full border" src={review.user.avatarImage ? review.user.avatarImage : "/avaMale.png"} />
                                                    <span className="font-medium">{review.user.fullname}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span>{review.content}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm">{format(review.reviewDate, "dd/MM/yyyy")}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span className="text-md">{review.reviewScore} <i className="fa-solid fa-star" style={{ color: "#FFD43B" }}></i></span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <i className="fa-solid fa-trash fa-lg cursor-pointer fa-lg" style={{ color: "#ff0000" }} onClick={() => deleteReviewByID(review.reviewId)}></i>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr className="w-full text-base h-20 text-center">
                                    <td colSpan={5}>Không có bình luận tại khu vực này</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageReview