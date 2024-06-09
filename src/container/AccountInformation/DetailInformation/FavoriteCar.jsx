import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userIdSelector } from "../../../redux/selector"
import { getAllCarLiked } from "../../../api/appAPI"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { dislikeCar } from "../../../api/userAPI"
import { setHideLoading, setShowLoading } from "../../../redux/Slice/AppSlice"

function FavoriteCar() {
    const dispatch = useDispatch()
    let [listCarLiked, setListCarLiked] = useState([])
    const userId = useSelector(userIdSelector)
    const navigate = useNavigate()

    const navigateDetailCar = (carId) => {
        navigate(`/car/${carId}`)
    }

    const fetchListCarLiked = async () => {
        let res = await getAllCarLiked(userId)
        if (res && res.length > 0) {
            setListCarLiked(res)
        }
        else {
            setListCarLiked([])
        }
    }

    const dislikeCarAction = async (carId) => {
        try {
            dispatch(setShowLoading())
            if (userId && carId) {
                let res = await dislikeCar(userId, carId)
                if (res) {
                    toast.success('Đã xóa xe khỏi danh sách ưa thích')
                    fetchListCarLiked()
                }
            }
        } catch (err) {
            toast.error('Lỗi hệ thống')
        } finally {
            dispatch(setHideLoading())
        }
    }

    useEffect(() => {
        if (userId) {
            fetchListCarLiked()
        }
    }, [])

    return (
        <>
            <h1 className="text-4xl font-bold">Xe yêu thích của tôi</h1>
            {
                listCarLiked && listCarLiked.length > 0 ?
                    listCarLiked.map((item, index) => {
                        return (
                            <div className="flex flex-row border bg-white rounded-lg p-3 mt-3" key={index}>
                                <div className="w-[calc(25%+40px)]">
                                    <img className="rounded-lg cursor-pointer" src={item.car && item.car.images && item.car.images[3].imageLink} onClick={() => navigateDetailCar(item.car.carId)} />
                                </div>
                                <div className="w-2/4 px-6 flex flex-col justify-center">
                                    <h2 className="font-black">{`${item.car && item.car.model && item.car.model} ${item.car && item.car.modelYear && item.car.modelYear}`}</h2>
                                    {/* <div className="footer flex flex-row pt-3 text-xs">
                                        {
                                            car.stats.tripCount === 0 ?
                                                <p className="text-gray-600">Chưa có chuyến</p>
                                                :
                                                <div className="flex flex-row">
                                                    <label className="flex items-center gap-1">
                                                        <svg className="star-rating" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 7.23331C14.7333 6.89998 14.4667 6.49998 14.1333 6.49998L10.3333 5.96665L8.59999 2.49998C8.53333 2.36665 8.46666 2.29998 8.33333 2.23331C7.99999 2.03331 7.59999 2.16665 7.39999 2.49998L5.73333 5.96665L1.93333 6.49998C1.73333 6.49998 1.59999 6.56665 1.53333 6.69998C1.26666 6.96665 1.26666 7.36665 1.53333 7.63331L4.26666 10.3L3.59999 14.1C3.59999 14.2333 3.59999 14.3666 3.66666 14.5C3.86666 14.8333 4.26666 14.9666 4.59999 14.7666L7.99999 12.9666L11.4 14.7666C11.4667 14.8333 11.6 14.8333 11.7333 14.8333C11.8 14.8333 11.8 14.8333 11.8667 14.8333C12.2 14.7666 12.4667 14.4333 12.4 14.0333L11.7333 10.2333L14.4667 7.56665C14.6 7.49998 14.6667 7.36665 14.6667 7.23331Z" fill="#FFC634"></path></svg>
                                                        <span>{car && car.stats && car.stats.star && car.stats.star}</span>
                                                    </label>
                                                    <span className="px-1">•</span>
                                                    <label className="flex items-center gap-1">
                                                        <svg width="20" height="20" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg" className=""><path d="M8.11719 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M40.2734 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.2188 52.3884V28.5931" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9484 21.0604H18.8959C17.5209 21.0604 16.4062 22.1751 16.4062 23.5501V28.5933" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9531 28.5931H7.07471C5.92895 28.5931 5 29.522 5 30.6678V50.3137C5 51.4596 5.92895 52.3884 7.07471 52.3884H28.0278" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M52.9282 18.2196H28.0317C26.8859 18.2196 25.957 19.1484 25.957 20.2943V50.3137C25.957 51.4596 26.8859 52.3884 28.0317 52.3884H52.9282C54.0741 52.3884 55.0029 51.4596 55.0029 50.3137V20.2943C55.0029 19.1484 54.0741 18.2196 52.9282 18.2196Z" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M32.1797 52.3884V18.2196" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M48.7695 18.2196V52.3884" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M29.0625 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M51.8828 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M35.293 18.2197V7.98977C35.293 6.61486 36.4076 5.50013 37.7826 5.50013H43.1768C44.5519 5.50013 45.6665 6.61486 45.6665 7.98977V18.2197" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                                        <span>{car && car.stats && car.stats.tripCount && car.stats.tripCount} chuyến</span>
                                                    </label>
                                                </div>
                                        }
                                    </div> */}
                                    <div className="flex flex-row items-center gap-2 mt-2">
                                        <i className="fa-solid fa-location-dot"></i>
                                        <span className="text-sm text-gray-500">{`${item.car && item.car.district && item.car.district} ${item.car && item.car.city && item.car.city}`}</span>
                                    </div>
                                    <div className="tag py-3 flex flex-wrap gap-3">
                                        <p className="p-1 px-2 bg-[#eef7ff] text-sm rounded-xl"> {item.car && item.car.transmission && item.car.transmission}   </p>
                                        <p className="p-1 px-2 bg-[#eef7ff] text-sm rounded-xl">Giao xe tận nơi</p>
                                    </div>
                                </div>
                                <div className="w-[calc(25%-40px)] border-l-2 flex flex-col justify-center items-center gap-3 pl-4">
                                    <div className="rounded-full border border-gray-600 ">
                                        <img src={item.car && item.car.owners && item.car.owners.user && item.car.owners.user.avatarImage} className="rounded-full h-10" />
                                    </div>
                                    <p><label className="font-bold text-xl">{item.car && item.car.pricePerDay && item.car.pricePerDay}K </label><label className="font-normal text-md">/Ngày</label></p>
                                    <button className="py-[10px] px-[40px] rounded-md text-white font-bold bg-main hover:opacity-85" onClick={() => dislikeCarAction(item.car.carId)}>Bỏ thích</button>
                                    <button className="rounded-md  font-bold hover:text-main" onClick={() => navigateDetailCar(item.car.carId)} >Xem chi tiết</button>

                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="flex w-full flex-col justify-center items-center mt-10">
                        <img src="/favoCar.svg" />
                        <h3 className="font-bold text-xl text-gray-500">Không có xe yêu thích</h3>
                    </div>
            }
        </>
    )
}

export default FavoriteCar