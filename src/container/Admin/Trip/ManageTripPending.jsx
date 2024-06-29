import { useEffect, useState } from "react"
import { setModalRentId, setModalViewRent } from "../../../redux/Slice/ModalSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { deleteTripByAdmin } from "../../../api/adminAPI"
import { adminTokenSelector } from "../../../redux/selector"
import { setHideLoading, setShowLoading } from "../../../redux/Slice/AppSlice"
import CitySelect from "../../../component/CitySelect"
import { convertCityName } from "../../../utils/convertCityName"
import { getAllPendingTrip } from "../../../api/appAPI"
import { format } from "date-fns"
import { formatMoney } from "../../../utils/formatMoney"
import { cancelTrip } from "../../../api/userAPI"


function ManageTripPending() {
    const [trips, setTrips] = useState([])
    const dispatch = useDispatch()
    const adminToken = useSelector(adminTokenSelector)
    const [selectedCity, setSelectedCity] = useState('Hà Nội');

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        setCurrentPage(1);
    };

    const handleOpenModalView = (rentId) => {
        dispatch(setModalRentId(rentId))
        dispatch(setModalViewRent())
    }

    useEffect(() => {
        fetchTrips(selectedCity);
    }, []);

    useEffect(() => {
        fetchTrips(selectedCity);
    }, [selectedCity]);


    const fetchTrips = async (city) => {
        try {
            const response = await getAllPendingTrip(convertCityName(city), adminToken);
            if (response) {
                setTrips(response);
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi tải dữ liệu");
            console.error(error);
        }
    };


    const handleCancelTrip = async (rentId) => {
        try {
            if (window.confirm("Bạn có muốn hủy chuyến này không?")) {
                dispatch(setShowLoading())
                let res = await cancelTrip(rentId, adminToken)
                if (res) {
                    toast.success("Hủy thành công")
                    fetchAllCars(selectedCity)
                }
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        toast.error('Bạn chưa được cấp quyền');
                        break;
                    case 403:
                        toast.error('Bạn không có quyền hủy');
                        break;
                    default:
                        toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
                }
            } else {
                toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            }
        } finally {
            dispatch(setHideLoading())
        }
    }

    const handleDeleteTrip = async (rentId) => {
        try {
            if (window.confirm("Bạn có xóa chuyến đi này không?")) {
                dispatch(setShowLoading())
                let res = await deleteTripByAdmin(rentId, adminToken)
                if (res) {
                    toast.success("Xác thực thành công")
                    fetchAllCars(selectedCity)
                }
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        toast.error('Bạn chưa được cấp quyền');
                        break;
                    case 403:
                        toast.error('Bạn không có quyền xóa');
                        break;
                    default:
                        toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
                }
            } else {
                toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            }
        } finally {
            dispatch(setHideLoading())
        }
    }


    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Chuyến đi</h2>
                <CitySelect value={selectedCity} onChange={handleCityChange} />
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
                {
                    trips && trips.length > 0 ?
                        trips.map((trip, index) => {
                            return (
                                <div className="w-full bg-white p-3 rounded-xl border-2" key={index}>
                                    <div className="w-full flex flex-row">
                                        <div className="w-1/6">
                                            <img src={trip.car.images && trip.car.images[0] && trip.car.images[0].imageLink} className="rounded-xl" />
                                        </div>
                                        <div className="w-1/2 flex flex-col px-6">
                                            <span className="font-semibold text-lg">
                                                {`${trip.car.model && trip.car.model} ${trip.car.modelYear && trip.car.modelYear}`}
                                            </span>
                                            <span className="font-semibold text-base">
                                                {trip.car.plateNumber && trip.car.plateNumber}
                                            </span>
                                            <div className="w-full flex gap-2 text-sm">
                                                <div className="flex flex-row justify-center items-center gap-1">
                                                    <svg width="20" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.914 23.3289C10.9148 23.3284 10.9156 23.3279 10.9163 23.3274C10.9155 23.3279 10.9148 23.3284 10.914 23.3289ZM10.914 23.3289C10.914 23.3289 10.914 23.3289 10.914 23.3289L11.3128 23.9114M10.914 23.3289L11.3128 23.9114M11.3128 23.9114L10.9807 23.2882L20.6697 23.9458C20.6682 23.9484 20.6656 23.9496 20.6631 23.9479C20.655 23.9424 20.6343 23.9284 20.6014 23.9074C20.6014 23.9073 20.6014 23.9073 20.6013 23.9073C20.5141 23.8516 20.3413 23.7468 20.0921 23.6208C20.0919 23.6207 20.0918 23.6206 20.0917 23.6206C19.3397 23.2404 17.8926 22.6674 16.0003 22.6674C14.1715 22.6674 12.7584 23.2026 11.9869 23.5817L11.9929 23.5929M11.3128 23.9114L11.331 23.9456C11.3324 23.9483 11.3352 23.9495 11.3377 23.9478C11.3444 23.9432 11.3592 23.9332 11.3821 23.9184L11.9929 23.5929L11.9929 23.5929M11.9929 23.5929C11.9909 23.5892 11.9889 23.5855 11.9868 23.5818C11.6767 23.7342 11.4702 23.8614 11.3821 23.9184L11.9929 23.5929ZM10.6691 24.2983L10.6691 24.2983C10.7406 24.4324 10.8728 24.5792 11.0793 24.6538C11.3072 24.7361 11.5609 24.7039 11.7614 24.5667L11.7614 24.5667C11.7978 24.5418 13.4597 23.4174 16.0003 23.4174C18.5426 23.4174 20.205 24.5432 20.2393 24.5667L20.2393 24.5667C20.4389 24.7034 20.6938 24.7372 20.9245 24.6528C21.1293 24.5779 21.2557 24.4338 21.3233 24.3136L22.4886 22.2427L24.3242 23.0447L21.6934 28.584H9.99882L7.65051 23.0635L9.57427 22.2435L10.6691 24.2983ZM24.4348 22.8117L24.4345 22.8124L24.4348 22.8117Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M12.75 4.66675C12.75 3.97639 13.3096 3.41675 14 3.41675H18C18.6904 3.41675 19.25 3.97639 19.25 4.66675V7.00008C19.25 7.13815 19.1381 7.25008 19 7.25008H13C12.8619 7.25008 12.75 7.13815 12.75 7.00008V4.66675Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M9.33398 22.6668L9.90564 11.2336C9.95887 10.1692 10.8374 9.3335 11.9031 9.3335H20.0982C21.1639 9.3335 22.0424 10.1692 22.0957 11.2336L22.6673 22.6668" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M14.667 7.35815V9.8901" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M17.334 7.35815V9.8901" stroke="#5FCF86" strokeWidth="1.5"></path></svg>
                                                    <span className="font-semibold text-sm">{trip.car.capacity} chỗ</span>
                                                </div>
                                                <div className="flex flex-row justify-center items-center gap-1">
                                                    <svg width="20" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.9163 7.99992C25.9163 9.05846 25.0582 9.91659 23.9997 9.91659C22.9411 9.91659 22.083 9.05846 22.083 7.99992C22.083 6.94137 22.9411 6.08325 23.9997 6.08325C25.0582 6.08325 25.9163 6.94137 25.9163 7.99992Z" stroke="#5FCF86" strokeWidth="1.5"></path><circle cx="23.9997" cy="23.9999" r="1.91667" stroke="#5FCF86" strokeWidth="1.5"></circle><path d="M17.9163 7.99992C17.9163 9.05846 17.0582 9.91659 15.9997 9.91659C14.9411 9.91659 14.083 9.05846 14.083 7.99992C14.083 6.94137 14.9411 6.08325 15.9997 6.08325C17.0582 6.08325 17.9163 6.94137 17.9163 7.99992Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M17.9163 23.9999C17.9163 25.0585 17.0582 25.9166 15.9997 25.9166C14.9411 25.9166 14.083 25.0585 14.083 23.9999C14.083 22.9414 14.9411 22.0833 15.9997 22.0833C17.0582 22.0833 17.9163 22.9414 17.9163 23.9999Z" stroke="#5FCF86" strokeWidth="1.5"></path><circle cx="7.99967" cy="7.99992" r="1.91667" stroke="#5FCF86" strokeWidth="1.5"></circle><path d="M10.1025 26.6666V21.3333H7.99837C7.59559 21.3333 7.25184 21.4053 6.96712 21.5494C6.68066 21.6918 6.46278 21.894 6.31348 22.1562C6.16244 22.4166 6.08691 22.723 6.08691 23.0754C6.08691 23.4296 6.1633 23.7343 6.31608 23.9895C6.46886 24.243 6.69021 24.4374 6.98014 24.5728C7.26834 24.7083 7.6173 24.776 8.02702 24.776H9.43587V23.8697H8.20931C7.99403 23.8697 7.81521 23.8402 7.67285 23.7812C7.53049 23.7221 7.42459 23.6336 7.35514 23.5155C7.28396 23.3975 7.24837 23.2508 7.24837 23.0754C7.24837 22.8984 7.28396 22.7491 7.35514 22.6275C7.42459 22.506 7.53136 22.414 7.67546 22.3515C7.81782 22.2872 7.9975 22.2551 8.21452 22.2551H8.97493V26.6666H10.1025ZM7.22233 24.2395L5.89681 26.6666H7.1416L8.43848 24.2395H7.22233Z" fill="#5FCF86"></path><path d="M24 10.6665V15.9998M24 21.3332V15.9998M16 10.6665V21.3332M8 10.6665V15.4998C8 15.776 8.22386 15.9998 8.5 15.9998H24" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path></svg>
                                                    <span className="font-semibold text-sm">{trip.car.transmission}</span>
                                                </div>
                                                <div className="flex flex-row justify-center items-center gap-1">
                                                    <svg width="20" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.3337 27.2499H7.66699C7.52892 27.2499 7.41699 27.138 7.41699 26.9999V12.4599C7.41699 12.3869 7.44888 12.3175 7.5043 12.27L14.652 6.14344L14.1639 5.574L14.652 6.14344C14.6973 6.1046 14.755 6.08325 14.8147 6.08325H24.3337C24.4717 6.08325 24.5837 6.19518 24.5837 6.33325V26.9999C24.5837 27.138 24.4717 27.2499 24.3337 27.2499Z" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path><path d="M12.0001 5.33325L7.42285 9.46712" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path><path d="M17.888 19.5212L16.7708 15.93C16.5378 15.1812 15.4785 15.1798 15.2436 15.928L14.1172 19.5164C13.7178 20.7889 14.6682 22.0833 16.0019 22.0833C17.3335 22.0833 18.2836 20.7927 17.888 19.5212Z" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path><path d="M23.2503 3.66675V5.66675C23.2503 5.80482 23.1384 5.91675 23.0003 5.91675H14.667C14.5827 5.91675 14.5365 5.8916 14.5072 5.86702C14.4721 5.83755 14.44 5.78953 14.4245 5.72738C14.4089 5.66524 14.4147 5.60775 14.4318 5.56523C14.4461 5.52975 14.4749 5.48584 14.5493 5.44616L18.2993 3.44616C18.3356 3.42685 18.376 3.41675 18.417 3.41675H23.0003C23.1384 3.41675 23.2503 3.52868 23.2503 3.66675Z" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path></svg>
                                                    <span className="font-semibold text-sm">{trip.car.fuelType}</span>
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-500 mt-1"><i className="fa-solid fa-location-dot mr-1 text-black"></i>
                                                {`${trip.car.streetAddress && trip.car.streetAddress}, ${trip.car.ward && trip.car.ward}, ${trip.car.district && trip.car.district}, ${trip.car.city && trip.car.city}`}
                                            </span>
                                            <div className="text-sm text-gray-500 mt-1"><i className="fa-regular fa-calendar-days mr-1 text-black"></i>
                                                Ngày đặt:
                                                {`${format(trip.rentBeginDate && trip.rentBeginDate, "dd/MM/yyyy")} - ${format(trip.rentEndDate && trip.rentEndDate, "dd/MM/yyyy")}`}
                                            </div>
                                        </div>
                                        <div className="w-1/6 flex flex-col justify-center items-center gap-3">
                                            <div className="flex flex-row gap-2 items-center w-full">
                                                <h3 className="text-sm w-1/4">Chủ xe</h3>
                                                <div className="flex justify-center flex-col items-center w-3/4 gap-2">
                                                    <img className="h-10 w-10 rounded-full" src={trip.car.user && trip.car.user.avatarImage ? trip.car.user.avatarImage : "/maleAva.png"} />
                                                    <p className="text-xs">{trip.car.user && trip.car.user.fullname && trip.car.user.fullname}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-row gap-2 items-center w-full">
                                                <h3 className="text-sm w-1/4">Người đặt</h3>
                                                <div className="flex justify-center flex-col items-center w-3/4 gap-2">
                                                    <img className="h-10 w-10 rounded-full" src={trip.user && trip.user.avatarImage ? trip.user.avatarImage : "/maleAva.png"} />
                                                    <p className="text-xs">{trip.user && trip.user.fullname && trip.user.fullname}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/6 flex flex-col items-center justify-center">
                                            <div className="h-4/5 w-full flex justify-center items-center flex-col">
                                                <p className="text-md font-semibold">Chi phí ước tính</p>
                                                <span className="font-semibold text-xl">
                                                    {trip.payment && trip.payment.paymentAmount && formatMoney(trip.payment.paymentAmount)}
                                                </span>
                                            </div>
                                            <div className="h-1/5 w-full flex justify-evenly">
                                                <button className="w-[25%] hover:opacity-80 p-1 px-2 text-sm bg-main text-white font-semibold rounded-md" onClick={() => handleOpenModalView(trip.rentId)}>Xem</button>
                                                <button className="w-[25%] hover:opacity-80 p-1 px-2 text-sm bg-main text-white font-semibold rounded-md" onClick={() => handleCancelTrip(trip.rentId)}>Hủy</button>
                                                <button className="w-[25%] hover:opacity-80 p-1 px-2 text-sm bg-main text-white font-semibold rounded-md" onClick={() => handleDeleteTrip(trip.rentId)}>Xóa</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm border-t-2 pt-2 mt-4">
                                        Trạng thái:
                                        {trip.rentStatus === "pending" &&
                                            <>
                                                <i className="fa-solid fa-circle ml-1 text-yellow-400"></i>
                                                <span className="ml-1"> Đang chờ xác nhận từ chủ xe</span>
                                            </>
                                        }
                                        {trip.rentStatus === "ongoing" &&
                                            <>
                                                <i className="fa-solid fa-circle ml-1 text-green-400"></i>
                                                <span className="ml-1">Chuyến xe đang diễn ra</span>
                                            </>
                                        }
                                        {trip.rentStatus === "ready" &&
                                            <>
                                                <i className="fa-solid fa-circle ml-1 text-pink-300"></i>
                                                <span className="ml-1">Chuyến xe đã sẵn sàng</span>
                                            </>
                                        }
                                    </div>
                                </div>
                            )
                        }
                        )
                        :
                        <div className="w-full flex flex-col items-center">
                            <p className="text-center font-semibold text-3xl">Chưa có chuyến xe nào tại khu vực này</p>
                        </div>
                }
            </div>
        </div>
    )
}

export default ManageTripPending