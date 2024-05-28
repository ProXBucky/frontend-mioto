import { useEffect, useState } from "react"
import { getAllTripByUserId } from "../../../api/appAPI"
import { useSelector } from "react-redux"
import { userIdSelector } from "../../../redux/selector"
import { formatMoney } from "../../../utils/formatMoney"
import { format } from "date-fns"
import viLocale from 'date-fns/locale/vi';
import { useNavigate } from "react-router-dom"

function MyTrip() {
    const [allTrip, setAllTrip] = useState([])
    const userId = useSelector(userIdSelector)
    const navigate = useNavigate()

    const fetchAllTripByUserId = async () => {
        let res = await getAllTripByUserId(userId)
        if (res) {
            setAllTrip(res)
        } else {
            setAllTrip([])
        }
    }

    const navigateDetailRent = (rentId) => {
        navigate(`/account/mytrip/detail-trip/${rentId}`)
    }

    useEffect(() => {
        if (userId !== 0) {
            fetchAllTripByUserId()
        }
    }, [])

    return (
        <>
            <h1 className="text-4xl font-bold">Chuyến của tôi</h1>
            {
                allTrip && allTrip.length > 0 ?
                    allTrip.map((item, index) => {
                        return (
                            <div className="flex flex-row border bg-white rounded-lg p-3 mt-3" key={index}>
                                <div className="w-[calc(25%+40px)]">
                                    <img className="rounded-lg cursor-pointer" src={item.car && item.car.images && item.car.images[3].imageLink} />
                                </div>
                                <div className="w-2/4 px-6 flex flex-col justify-center">
                                    <h2 className="font-black">{`${item.car && item.car.model && item.car.model} ${item.car && item.car.modelYear && item.car.modelYear}`}</h2>
                                    <div className="footer flex flex-col pt-2 text-sm font-normal">
                                        <p>Bắt đầu: {format(item.rentBeginDate, 'PPPP', { locale: viLocale })}</p>
                                        <p>Kết thúc: {format(item.rentEndDate, 'PPPP', { locale: viLocale })}</p>
                                    </div>
                                    <div className="mt-3 text-sm font-semibold">
                                        {item.rentStatus === 'pending' && <p>Trạng thái: <label className="text-amber-500">Đang chờ xác nhận từ chủ xe</label></p>}
                                        {item.rentStatus === 'cancel' && <p>Trạng thái: <label className="text-red-500">Chuyến xe đã hủy</label></p>}
                                    </div>
                                </div>
                                <div className="w-[calc(25%-40px)] border-l-2 flex flex-col justify-center items-center gap-3 pl-4">
                                    <h2 className="font-semibold">Tổng tiền</h2>
                                    <p><label className="font-bold text-xl">{formatMoney(item.payment && item.payment.paymentAmount)}</label></p>
                                    <button className="rounded-md  font-semibold bg-main p-2 text-white hover:opacity-75" onClick={() => navigateDetailRent(item.rentId)} >Xem chi tiết</button>

                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="flex w-full flex-col justify-center items-center mt-10">
                        <img src="/noTrip.svg" />
                        <h3 className="font-bold text-xl text-gray-500">Bạn chưa có chuyến</h3>
                    </div>
            }
        </>
    )
}

export default MyTrip