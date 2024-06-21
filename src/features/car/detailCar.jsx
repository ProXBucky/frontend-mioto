import { useEffect, useState } from "react"
import { getDetailCar } from "../../api/carAPI";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { beginDateSelector, endDateSelector, tokenSelector, userIdSelector } from "../../redux/selector";
import { calculateDays } from "../../utils/calculateDays"
import { formatMoney } from "../../utils/formatMoney";
import { toast } from "react-toastify";
import { dislikeCar, likeCar, postReviewCar, rentCar, reportCar } from "../../api/userAPI";
import { checkLikeCar, checkStatusRent, getAllReviewOfCar, getAllVoucherByUserId, getReviewScore } from "../../api/appAPI";
import ModalReviewCar from "./ModalReviewCar";
import ModalViewAllImg from "./ModalViewAllImg";
import Rating from "react-rating";
import { format } from "date-fns";
import ModalReportCar from "./ModalReportCar";
import ModalViewVoucher from "./ModalViewVoucher";
import ModalViewMap from "./ModalViewMap";
import ModalConfirmRent from "./ModalConfirmRent";
import { setHideLoading, setShowLoading } from "../../redux/Slice/AppSlice";


function DetailCar({ handleOpenDateModal, handleOpenLoginModal }) {
    let userId = useSelector(userIdSelector)
    let beginDate = useSelector(beginDateSelector)
    let endDate = useSelector(endDateSelector)
    let token = useSelector(tokenSelector)

    const [car, setCar] = useState(null)
    const [carStatus, setCarStatus] = useState('')
    const [liked, setLiked] = useState(false)
    const [carImgs, setCarImgs] = useState([])
    const [reviewScore, setReviewScore] = useState({
        score: 0,
        count: 0,
        tripCount: 0
    })
    const [allImgCar, setAllImgCar] = useState([]);
    const [allReview, setAllReview] = useState([]);

    const [showModalViewImg, setShowModalViewImg] = useState(false);
    const [address, setAddress] = useState('');
    const dispatch = useDispatch()

    const handleCloseModalViewImg = () => {
        setShowModalViewImg(false);
    };

    const handleOpenModalViewImg = (imgs) => {
        setShowModalViewImg(true);
        setAllImgCar(imgs)
    };

    const { carId } = useParams()
    const dayRent = calculateDays(beginDate, endDate)

    const copyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
        toast.success("Đã sao chép liên kết")
    };

    const likeCarAction = async () => {
        if (!userId) {
            handleOpenLoginModal() // Login truoc khi like xe
        }
        else {
            try {
                if (userId && carId) {
                    let res = await likeCar({
                        userId: userId,
                        carId: carId
                    }, token)
                    if (res) {
                        toast.success('Đã thêm xe vào danh sách ưa thích')
                        setLiked(true)
                    }
                }
            } catch (err) {
                toast.error('Lỗi hệ thống')
            }
        }
    }

    const dislikeCarAction = async () => {
        try {
            if (userId && carId) {
                let res = await dislikeCar(userId, carId, token)
                if (res) {
                    toast.success('Đã xóa xe khỏi danh sách ưa thích')
                    setLiked(false)
                }
            }
        } catch (err) {
            toast.error('Lỗi hệ thống')
        }
    }
    const [showModalReview, setShowModalReview] = useState(false)

    const handleCloseModalReview = () => {
        setShowModalReview(false);
    };

    const handleOpenModalReview = () => {
        setShowModalReview(true);
    };

    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const [showModalReport, setShowModalReport] = useState(false)

    const handleCloseModalReport = () => {
        setShowModalReport(false);
    };

    const handleOpenModalReport = () => {
        if (!userId) {
            handleOpenLoginModal() // Login truoc khi like xe
        }
        else {
            setShowModalReport(true);
        }
    };

    const [reason, setReason] = useState('');

    const handleChangeReason = (event) => {
        setReason(event.target.value);
    };


    const [allVoucher, setAllVoucher] = useState('');

    const [showModalVoucher, setShowModalVoucher] = useState(false)

    const handleCloseModalVoucher = () => {
        setShowModalVoucher(false);
    };

    const handleOpenModalVoucher = () => {
        if (!userId) {
            handleOpenLoginModal() // Login truoc khi like xe
        }
        else {
            setShowModalVoucher(true);
        }
    }

    const [totalRentNotVoucher, setTotalRentNotVoucher] = useState(0)
    const [totalRentVoucher, setTotalRentVoucher] = useState(0)
    const [voucher, setVoucher] = useState({
        voucherId: 0,
        voucherCode: "",
        voucherMoney: 0
    })

    const handleChooseVoucher = (item) => {
        let voucherMoney = 0
        let totalHaveTax = totalRentNotVoucher + totalRentNotVoucher / 10
        if (item.type === "percent") {
            voucherMoney = item.discountPercent / 100 * (dayRent * totalHaveTax)
            setTotalRentVoucher(totalHaveTax * dayRent - voucherMoney)
        }
        else {
            voucherMoney = item.discountPercent * 1000
            setTotalRentVoucher(totalHaveTax * dayRent - voucherMoney)
        }
        setVoucher({
            voucherId: item.voucherId,
            voucherCode: item.voucherCode,
            voucherMoney: voucherMoney
        })
        handleCloseModalVoucher()
    }

    const handleCancelVoucher = () => {
        setVoucher({
            voucherId: 0,
            voucherCode: "",
            voucherMoney: 0
        })
    }

    const [showModalMap, setShowModalMap] = useState(false)

    const handleCloseModalMap = () => {
        setShowModalMap(false);
    };

    const handleOpenModalMap = () => {
        setShowModalMap(true);
    };

    const [showModalConfirmRent, setShowModalConfirmRent] = useState(false)

    const handleCloseModalConfirmRent = () => {
        setShowModalConfirmRent(false);
    };

    const handleOpenModalConfirmRent = () => {
        if (!userId) {
            handleOpenLoginModal()
        }
        else {
            setShowModalConfirmRent(true);
        }
    };

    const handleConfirmRent = async () => {
        if (!userId) {
            handleOpenLoginModal()
        }
        else {
            try {
                dispatch(setShowLoading())
                if (userId && carId) {
                    let res = await rentCar({
                        userId: parseInt(userId),
                        carId: parseInt(carId),
                        voucherId: voucher.voucherId,
                        rentBeginDate: beginDate,
                        rentEndDate: endDate,
                        rentDays: dayRent,
                        paymentAmount: totalRentVoucher,
                        voucherAmount: voucher.voucherMoney
                    }, token)
                    if (res) {
                        toast.success('Bạn đã đặt xe thành công, hãy chờ chủ xe xác nhận.')
                        handleCloseModalConfirmRent()
                        setVoucher({
                            voucherId: 0,
                            voucherCode: "",
                            voucherMoney: 0
                        })
                    }
                }
            } catch (err) {
                toast.error('Lỗi hệ thống, đặt xe thất bại')
            } finally {
                dispatch(setHideLoading())
            }
        }
    }

    const handleReviewCar = async () => {
        try {
            dispatch(setShowLoading())
            if (userId && carId) {
                if (car && car.location) {
                    let res = await postReviewCar({
                        userId: userId,
                        carId: parseInt(carId),
                        content: text,
                        location: car.location,
                        reviewScore: rating
                    }, token)
                    if (res) {
                        setRating(0)
                        setText('')
                        handleCloseModalReview()
                        fetchAllReviewOfCar()
                        fetchReviewScore()
                    }
                }
            }
        } catch (err) {
            toast.error('Lỗi hệ thống')
        } finally {
            dispatch(setHideLoading())
        }
    }

    const handleReportCar = async () => {
        if (!userId) {
            handleOpenLoginModal() // Login truoc khi like xe
        }
        else {
            try {
                dispatch(setShowLoading())
                if (userId && carId) {
                    let res = await reportCar({
                        userId: userId,
                        carId: parseInt(carId),
                        reason: reason
                    }, token)
                    if (res) {
                        setReason('')
                        handleCloseModalReport()
                        toast.success("Bạn đã báo cáo xe này thành công")
                    }
                }
            } catch (err) {
                toast.error('Lỗi hệ thống')
            } finally {
                dispatch(setHideLoading())
            }
        }
    }

    const fetchCarData = async () => {
        const res = await getDetailCar(carId);
        if (res) {
            setAddress(res.district + " " + res.city)
            setTotalRentNotVoucher(res.pricePerDay * 1000) // + bao hiem xe
            setTotalRentVoucher((res.pricePerDay * 1000 + res.pricePerDay * 100) * dayRent)
            setCar(res)
            const imagesFromApi = [];
            res.images.forEach(image => {
                imagesFromApi.push({
                    original: image.imageLink,
                    thumbnail: image.imageLink,
                });
            });
            setCarImgs(imagesFromApi)
        }
    }

    const chkLikeCar = async () => {
        const res = await checkLikeCar(userId, carId);
        if (res) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }

    const fetchAllReviewOfCar = async () => {
        const res = await getAllReviewOfCar(carId);
        if (res && res.length > 0) {
            setAllReview(res)
        } else {
            setAllReview([])
        }
    }

    const fetchReviewScore = async () => {
        const res = await getReviewScore(carId)
        if (res) {
            setReviewScore({
                score: res.star,
                count: res.reviewCount,
                tripCount: res.tripCount
            })
        } else {
            setReviewScore({
                score: 0,
                count: 0,
                tripCount: 0
            })
        }
    }

    const fetchAllVoucherByUserId = async () => {
        if (userId) {
            const res = await getAllVoucherByUserId(userId, token);
            if (res && res.length > 0) {
                setAllVoucher(res)
            } else {
                setAllVoucher([])
            }
        }
    }

    const checkStatusRentCar = async () => {
        const res = await checkStatusRent(carId, beginDate, endDate);
        if (res === true) {
            setCarStatus(true)
        } else {
            setCarStatus(false)
        }
    }

    useEffect(() => {
        if (userId && carId) {
            chkLikeCar()
        }
        if (carId) {
            fetchCarData()
            fetchAllReviewOfCar()
            fetchReviewScore()
            fetchAllVoucherByUserId()
            checkStatusRentCar()
        }
    }, [])

    useEffect(() => {
        let totalHaveTax = totalRentNotVoucher + totalRentNotVoucher / 10
        setTotalRentVoucher(totalHaveTax * dayRent - voucher.voucherMoney)
    }, [dayRent, voucher.voucherId])

    useEffect(() => {
        checkStatusRentCar()
    }, [beginDate, endDate])

    return (
        <div className="relative">
            <ModalConfirmRent
                showModalConfirmRent={showModalConfirmRent}
                handleCloseModalConfirmRent={handleCloseModalConfirmRent}
                handleConfirmRent={handleConfirmRent}
                car={car && car}
                voucher={voucher && voucher}
                totalRentNotVoucher={totalRentNotVoucher}
                totalRentVoucher={totalRentVoucher}
                carImg={carImgs && carImgs.length > 0 && carImgs[0].original}
                locationName={address}
            />
            <ModalViewMap
                showModalMap={showModalMap}
                handleCloseModalMap={handleCloseModalMap}
                locationName={address}
            />
            <ModalViewVoucher
                showModalVoucher={showModalVoucher}
                handleCloseModalVoucher={handleCloseModalVoucher}
                allVoucher={allVoucher}
                handleChooseVoucher={handleChooseVoucher}
            />
            <ModalReviewCar showModalReview={showModalReview}
                handleCloseModalReview={handleCloseModalReview}
                rating={rating} text={text}
                handleRatingChange={handleRatingChange} handleChange={handleChange}
                handleReviewCar={handleReviewCar}
            />
            <ModalReportCar
                showModalReport={showModalReport}
                handleCloseModalReport={handleCloseModalReport}
                reason={reason}
                handleChangeReason={handleChangeReason}
                handleReportCar={handleReportCar}
            />
            <ModalViewAllImg
                showModalViewImg={showModalViewImg}
                handleCloseModalViewImg={handleCloseModalViewImg}
                allImgCar={allImgCar}
            />
            <div className="px-32 pb-20 flex flex-col gap-5">
                <div className="flex flex-row h-[600px] relative">
                    <div className="w-[calc(68%)] pr-6">
                        <img src={car && car.images && car.images[0] && car.images[0].imageLink} className="w-full h-full object-cover rounded-2xl cursor-pointer" alt="Car 1" />
                    </div>
                    <div className="w-[calc(32%)] flex flex-col gap-4">
                        <img src={car && car.images && car.images[1] && car.images[1].imageLink} className="h-[30.7%] object-cover rounded-2xl cursor-pointer" alt="Car 2" />
                        <img src={car && car.images && car.images[2] && car.images[2].imageLink} className="h-[30.7%] object-cover rounded-2xl cursor-pointer" alt="Car 3" />
                        <img src={car && car.images && car.images[3] && car.images[3].imageLink} className="h-[30.7%] object-cover rounded-2xl cursor-pointer" alt="Car 4" />
                    </div>
                    <div className="rounded-lg border bg-white flex flex-row absolute bottom-5 right-5 p-2 items-center gap-2 cursor-pointer" onClick={() => handleOpenModalViewImg(carImgs)}>
                        <i className="fa-regular fa-images"></i>
                        <p>Xem tất cả ảnh</p>
                    </div>
                </div>

                <div className="flex flex-row">
                    <div className="w-2/3 flex flex-col pr-10">
                        <div className="border-b-2 flex justify-between py-4">
                            <div>
                                <h1 className="text-4xl font-bold">{`${car && car.model && car.model} ${car && car.modelYear && car.modelYear}`}</h1>
                                <div className="flex flex-row mt-2">
                                    <label className="flex items-center gap-1">
                                        <svg className="star-rating" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 7.23331C14.7333 6.89998 14.4667 6.49998 14.1333 6.49998L10.3333 5.96665L8.59999 2.49998C8.53333 2.36665 8.46666 2.29998 8.33333 2.23331C7.99999 2.03331 7.59999 2.16665 7.39999 2.49998L5.73333 5.96665L1.93333 6.49998C1.73333 6.49998 1.59999 6.56665 1.53333 6.69998C1.26666 6.96665 1.26666 7.36665 1.53333 7.63331L4.26666 10.3L3.59999 14.1C3.59999 14.2333 3.59999 14.3666 3.66666 14.5C3.86666 14.8333 4.26666 14.9666 4.59999 14.7666L7.99999 12.9666L11.4 14.7666C11.4667 14.8333 11.6 14.8333 11.7333 14.8333C11.8 14.8333 11.8 14.8333 11.8667 14.8333C12.2 14.7666 12.4667 14.4333 12.4 14.0333L11.7333 10.2333L14.4667 7.56665C14.6 7.49998 14.6667 7.36665 14.6667 7.23331Z" fill="#FFC634"></path></svg>
                                        <span>{reviewScore && reviewScore.score}</span>
                                    </label>
                                    <span className="px-1">•</span>
                                    <label className="flex items-center gap-1">
                                        <svg width="20" height="20" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg" className=""><path d="M8.11719 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M40.2734 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.2188 52.3884V28.5931" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9484 21.0604H18.8959C17.5209 21.0604 16.4062 22.1751 16.4062 23.5501V28.5933" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9531 28.5931H7.07471C5.92895 28.5931 5 29.522 5 30.6678V50.3137C5 51.4596 5.92895 52.3884 7.07471 52.3884H28.0278" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M52.9282 18.2196H28.0317C26.8859 18.2196 25.957 19.1484 25.957 20.2943V50.3137C25.957 51.4596 26.8859 52.3884 28.0317 52.3884H52.9282C54.0741 52.3884 55.0029 51.4596 55.0029 50.3137V20.2943C55.0029 19.1484 54.0741 18.2196 52.9282 18.2196Z" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M32.1797 52.3884V18.2196" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M48.7695 18.2196V52.3884" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M29.0625 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M51.8828 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M35.293 18.2197V7.98977C35.293 6.61486 36.4076 5.50013 37.7826 5.50013H43.1768C44.5519 5.50013 45.6665 6.61486 45.6665 7.98977V18.2197" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                        <span>{reviewScore && reviewScore.tripCount} chuyến</span>
                                    </label>
                                    <span className="px-1">•</span>
                                    <label>{`${car && car.district && car.district} - ${car && car.city && car.city}`}</label>
                                </div>
                                <div className="tag py-3 flex flex-wrap gap-3">
                                    <p className="p-1 bg-[#eef7ff] text-sm rounded-xl">{car && car.transmission && car.transmission}</p>
                                    <p className="p-1 bg-[#eef7ff] text-sm rounded-xl">Giao xe tận nơi</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="rounded-full p-3 h-14 border cursor-pointer" onClick={copyLink}>
                                    <i className="fa-solid fa-link fa-lg"></i>
                                </div>
                                {
                                    liked ?
                                        <div className={`rounded-full p-3 h-14 border-2 cursor-pointer border-main`} onClick={dislikeCarAction}>
                                            <i className={`fa-regular fa-heart fa-lg text-main`}></i>
                                        </div>
                                        :
                                        <div className={`rounded-full p-3 h-14 border-2 cursor-pointer`} onClick={likeCarAction}>
                                            <i className={`fa-regular fa-heart fa-lg`}></i>
                                        </div>

                                }
                            </div>
                        </div>
                        <div className="border-b-2 py-4">
                            <h3 className="font-semibold text-xl">Đặc điểm</h3>
                            <div className="flex justify-between mt-4">
                                <div className="flex flex-row justify-center items-center gap-3">
                                    <div className="">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.914 23.3289C10.9148 23.3284 10.9156 23.3279 10.9163 23.3274C10.9155 23.3279 10.9148 23.3284 10.914 23.3289ZM10.914 23.3289C10.914 23.3289 10.914 23.3289 10.914 23.3289L11.3128 23.9114M10.914 23.3289L11.3128 23.9114M11.3128 23.9114L10.9807 23.2882L20.6697 23.9458C20.6682 23.9484 20.6656 23.9496 20.6631 23.9479C20.655 23.9424 20.6343 23.9284 20.6014 23.9074C20.6014 23.9073 20.6014 23.9073 20.6013 23.9073C20.5141 23.8516 20.3413 23.7468 20.0921 23.6208C20.0919 23.6207 20.0918 23.6206 20.0917 23.6206C19.3397 23.2404 17.8926 22.6674 16.0003 22.6674C14.1715 22.6674 12.7584 23.2026 11.9869 23.5817L11.9929 23.5929M11.3128 23.9114L11.331 23.9456C11.3324 23.9483 11.3352 23.9495 11.3377 23.9478C11.3444 23.9432 11.3592 23.9332 11.3821 23.9184L11.9929 23.5929L11.9929 23.5929M11.9929 23.5929C11.9909 23.5892 11.9889 23.5855 11.9868 23.5818C11.6767 23.7342 11.4702 23.8614 11.3821 23.9184L11.9929 23.5929ZM10.6691 24.2983L10.6691 24.2983C10.7406 24.4324 10.8728 24.5792 11.0793 24.6538C11.3072 24.7361 11.5609 24.7039 11.7614 24.5667L11.7614 24.5667C11.7978 24.5418 13.4597 23.4174 16.0003 23.4174C18.5426 23.4174 20.205 24.5432 20.2393 24.5667L20.2393 24.5667C20.4389 24.7034 20.6938 24.7372 20.9245 24.6528C21.1293 24.5779 21.2557 24.4338 21.3233 24.3136L22.4886 22.2427L24.3242 23.0447L21.6934 28.584H9.99882L7.65051 23.0635L9.57427 22.2435L10.6691 24.2983ZM24.4348 22.8117L24.4345 22.8124L24.4348 22.8117Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M12.75 4.66675C12.75 3.97639 13.3096 3.41675 14 3.41675H18C18.6904 3.41675 19.25 3.97639 19.25 4.66675V7.00008C19.25 7.13815 19.1381 7.25008 19 7.25008H13C12.8619 7.25008 12.75 7.13815 12.75 7.00008V4.66675Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M9.33398 22.6668L9.90564 11.2336C9.95887 10.1692 10.8374 9.3335 11.9031 9.3335H20.0982C21.1639 9.3335 22.0424 10.1692 22.0957 11.2336L22.6673 22.6668" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M14.667 7.35815V9.8901" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M17.334 7.35815V9.8901" stroke="#5FCF86" strokeWidth="1.5"></path></svg>
                                    </div>
                                    <div className="">
                                        <p className="text-gray-500">Số ghế</p>
                                        <span className="font-bold text-xl">{car && car.capacity && car.capacity} chỗ</span>
                                    </div>
                                </div>

                                <div className="flex flex-row justify-center items-center gap-3">
                                    <div className="">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.9163 7.99992C25.9163 9.05846 25.0582 9.91659 23.9997 9.91659C22.9411 9.91659 22.083 9.05846 22.083 7.99992C22.083 6.94137 22.9411 6.08325 23.9997 6.08325C25.0582 6.08325 25.9163 6.94137 25.9163 7.99992Z" stroke="#5FCF86" strokeWidth="1.5"></path><circle cx="23.9997" cy="23.9999" r="1.91667" stroke="#5FCF86" strokeWidth="1.5"></circle><path d="M17.9163 7.99992C17.9163 9.05846 17.0582 9.91659 15.9997 9.91659C14.9411 9.91659 14.083 9.05846 14.083 7.99992C14.083 6.94137 14.9411 6.08325 15.9997 6.08325C17.0582 6.08325 17.9163 6.94137 17.9163 7.99992Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M17.9163 23.9999C17.9163 25.0585 17.0582 25.9166 15.9997 25.9166C14.9411 25.9166 14.083 25.0585 14.083 23.9999C14.083 22.9414 14.9411 22.0833 15.9997 22.0833C17.0582 22.0833 17.9163 22.9414 17.9163 23.9999Z" stroke="#5FCF86" strokeWidth="1.5"></path><circle cx="7.99967" cy="7.99992" r="1.91667" stroke="#5FCF86" strokeWidth="1.5"></circle><path d="M10.1025 26.6666V21.3333H7.99837C7.59559 21.3333 7.25184 21.4053 6.96712 21.5494C6.68066 21.6918 6.46278 21.894 6.31348 22.1562C6.16244 22.4166 6.08691 22.723 6.08691 23.0754C6.08691 23.4296 6.1633 23.7343 6.31608 23.9895C6.46886 24.243 6.69021 24.4374 6.98014 24.5728C7.26834 24.7083 7.6173 24.776 8.02702 24.776H9.43587V23.8697H8.20931C7.99403 23.8697 7.81521 23.8402 7.67285 23.7812C7.53049 23.7221 7.42459 23.6336 7.35514 23.5155C7.28396 23.3975 7.24837 23.2508 7.24837 23.0754C7.24837 22.8984 7.28396 22.7491 7.35514 22.6275C7.42459 22.506 7.53136 22.414 7.67546 22.3515C7.81782 22.2872 7.9975 22.2551 8.21452 22.2551H8.97493V26.6666H10.1025ZM7.22233 24.2395L5.89681 26.6666H7.1416L8.43848 24.2395H7.22233Z" fill="#5FCF86"></path><path d="M24 10.6665V15.9998M24 21.3332V15.9998M16 10.6665V21.3332M8 10.6665V15.4998C8 15.776 8.22386 15.9998 8.5 15.9998H24" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path></svg>
                                        {/* <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.914 23.3289C10.9148 23.3284 10.9156 23.3279 10.9163 23.3274C10.9155 23.3279 10.9148 23.3284 10.914 23.3289ZM10.914 23.3289C10.914 23.3289 10.914 23.3289 10.914 23.3289L11.3128 23.9114M10.914 23.3289L11.3128 23.9114M11.3128 23.9114L10.9807 23.2882L20.6697 23.9458C20.6682 23.9484 20.6656 23.9496 20.6631 23.9479C20.655 23.9424 20.6343 23.9284 20.6014 23.9074C20.6014 23.9073 20.6014 23.9073 20.6013 23.9073C20.5141 23.8516 20.3413 23.7468 20.0921 23.6208C20.0919 23.6207 20.0918 23.6206 20.0917 23.6206C19.3397 23.2404 17.8926 22.6674 16.0003 22.6674C14.1715 22.6674 12.7584 23.2026 11.9869 23.5817L11.9929 23.5929M11.3128 23.9114L11.331 23.9456C11.3324 23.9483 11.3352 23.9495 11.3377 23.9478C11.3444 23.9432 11.3592 23.9332 11.3821 23.9184L11.9929 23.5929L11.9929 23.5929M11.9929 23.5929C11.9909 23.5892 11.9889 23.5855 11.9868 23.5818C11.6767 23.7342 11.4702 23.8614 11.3821 23.9184L11.9929 23.5929ZM10.6691 24.2983L10.6691 24.2983C10.7406 24.4324 10.8728 24.5792 11.0793 24.6538C11.3072 24.7361 11.5609 24.7039 11.7614 24.5667L11.7614 24.5667C11.7978 24.5418 13.4597 23.4174 16.0003 23.4174C18.5426 23.4174 20.205 24.5432 20.2393 24.5667L20.2393 24.5667C20.4389 24.7034 20.6938 24.7372 20.9245 24.6528C21.1293 24.5779 21.2557 24.4338 21.3233 24.3136L22.4886 22.2427L24.3242 23.0447L21.6934 28.584H9.99882L7.65051 23.0635L9.57427 22.2435L10.6691 24.2983ZM24.4348 22.8117L24.4345 22.8124L24.4348 22.8117Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M12.75 4.66675C12.75 3.97639 13.3096 3.41675 14 3.41675H18C18.6904 3.41675 19.25 3.97639 19.25 4.66675V7.00008C19.25 7.13815 19.1381 7.25008 19 7.25008H13C12.8619 7.25008 12.75 7.13815 12.75 7.00008V4.66675Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M9.33398 22.6668L9.90564 11.2336C9.95887 10.1692 10.8374 9.3335 11.9031 9.3335H20.0982C21.1639 9.3335 22.0424 10.1692 22.0957 11.2336L22.6673 22.6668" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M14.667 7.35815V9.8901" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M17.334 7.35815V9.8901" stroke="#5FCF86" strokeWidth="1.5"></path></svg> */}
                                    </div>
                                    <div className="">
                                        <p className="text-gray-500">Truyền động</p>
                                        <span className="font-bold text-xl">{car && car.transmission && car.transmission}</span>
                                    </div>

                                </div>

                                <div className="flex flex-row justify-center items-center gap-3">
                                    <div className="">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.3337 27.2499H7.66699C7.52892 27.2499 7.41699 27.138 7.41699 26.9999V12.4599C7.41699 12.3869 7.44888 12.3175 7.5043 12.27L14.652 6.14344L14.1639 5.574L14.652 6.14344C14.6973 6.1046 14.755 6.08325 14.8147 6.08325H24.3337C24.4717 6.08325 24.5837 6.19518 24.5837 6.33325V26.9999C24.5837 27.138 24.4717 27.2499 24.3337 27.2499Z" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path><path d="M12.0001 5.33325L7.42285 9.46712" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path><path d="M17.888 19.5212L16.7708 15.93C16.5378 15.1812 15.4785 15.1798 15.2436 15.928L14.1172 19.5164C13.7178 20.7889 14.6682 22.0833 16.0019 22.0833C17.3335 22.0833 18.2836 20.7927 17.888 19.5212Z" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path><path d="M23.2503 3.66675V5.66675C23.2503 5.80482 23.1384 5.91675 23.0003 5.91675H14.667C14.5827 5.91675 14.5365 5.8916 14.5072 5.86702C14.4721 5.83755 14.44 5.78953 14.4245 5.72738C14.4089 5.66524 14.4147 5.60775 14.4318 5.56523C14.4461 5.52975 14.4749 5.48584 14.5493 5.44616L18.2993 3.44616C18.3356 3.42685 18.376 3.41675 18.417 3.41675H23.0003C23.1384 3.41675 23.2503 3.52868 23.2503 3.66675Z" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path></svg>
                                        {/* <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.914 23.3289C10.9148 23.3284 10.9156 23.3279 10.9163 23.3274C10.9155 23.3279 10.9148 23.3284 10.914 23.3289ZM10.914 23.3289C10.914 23.3289 10.914 23.3289 10.914 23.3289L11.3128 23.9114M10.914 23.3289L11.3128 23.9114M11.3128 23.9114L10.9807 23.2882L20.6697 23.9458C20.6682 23.9484 20.6656 23.9496 20.6631 23.9479C20.655 23.9424 20.6343 23.9284 20.6014 23.9074C20.6014 23.9073 20.6014 23.9073 20.6013 23.9073C20.5141 23.8516 20.3413 23.7468 20.0921 23.6208C20.0919 23.6207 20.0918 23.6206 20.0917 23.6206C19.3397 23.2404 17.8926 22.6674 16.0003 22.6674C14.1715 22.6674 12.7584 23.2026 11.9869 23.5817L11.9929 23.5929M11.3128 23.9114L11.331 23.9456C11.3324 23.9483 11.3352 23.9495 11.3377 23.9478C11.3444 23.9432 11.3592 23.9332 11.3821 23.9184L11.9929 23.5929L11.9929 23.5929M11.9929 23.5929C11.9909 23.5892 11.9889 23.5855 11.9868 23.5818C11.6767 23.7342 11.4702 23.8614 11.3821 23.9184L11.9929 23.5929ZM10.6691 24.2983L10.6691 24.2983C10.7406 24.4324 10.8728 24.5792 11.0793 24.6538C11.3072 24.7361 11.5609 24.7039 11.7614 24.5667L11.7614 24.5667C11.7978 24.5418 13.4597 23.4174 16.0003 23.4174C18.5426 23.4174 20.205 24.5432 20.2393 24.5667L20.2393 24.5667C20.4389 24.7034 20.6938 24.7372 20.9245 24.6528C21.1293 24.5779 21.2557 24.4338 21.3233 24.3136L22.4886 22.2427L24.3242 23.0447L21.6934 28.584H9.99882L7.65051 23.0635L9.57427 22.2435L10.6691 24.2983ZM24.4348 22.8117L24.4345 22.8124L24.4348 22.8117Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M12.75 4.66675C12.75 3.97639 13.3096 3.41675 14 3.41675H18C18.6904 3.41675 19.25 3.97639 19.25 4.66675V7.00008C19.25 7.13815 19.1381 7.25008 19 7.25008H13C12.8619 7.25008 12.75 7.13815 12.75 7.00008V4.66675Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M9.33398 22.6668L9.90564 11.2336C9.95887 10.1692 10.8374 9.3335 11.9031 9.3335H20.0982C21.1639 9.3335 22.0424 10.1692 22.0957 11.2336L22.6673 22.6668" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M14.667 7.35815V9.8901" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M17.334 7.35815V9.8901" stroke="#5FCF86" strokeWidth="1.5"></path></svg> */}
                                    </div>
                                    <div className="">
                                        <p className="text-gray-500">Nhiên liệu</p>
                                        <span className="font-bold text-xl">{car && car.fuelType && car.fuelType}</span>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="border-b-2 py-4">
                            <h3 className="font-semibold text-xl">Mô tả</h3>
                            <p className="mt-4 text-gray-500">
                                {car && car.description ? car.description
                                    :
                                    <p>Không có</p>
                                }
                            </p>
                        </div>


                        <div className="border-b-2 py-4">
                            <h3 className="font-semibold text-xl">Các tiện nghi khác</h3>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {
                                    car && car.carFeatures && car.carFeatures.length > 0 &&
                                    car.carFeatures.map((item, index) => {
                                        return (
                                            <div className="w-[calc(25%-10px)] h-10 py-2 flex flex-row items-center gap-2" key={index}>
                                                <img className="h-full" src={item.feature && item.feature.featureIcon} />
                                                <p className="">{item.feature && item.feature.featureName}</p>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        </div>


                        <div className="border-b-2 py-4">
                            <h3 className="font-semibold text-xl">Giấy tờ thuê xe</h3>
                            <div className="my-4 rounded-2xl bg-[#fef7f4] p-4 border-l-8 border-[#f26a2b]">
                                <p className="text-gray-500">Chọn 1 trong 2 hình thức:</p>
                                <div className="flex flex-row gap-4 items-center font-semibold mt-3">
                                    <img className="h-6" src="/gplx_cccd.png" />
                                    <p>GPLX & CCCD gắn chip (đối chiếu) </p>
                                </div>
                                <div className="flex flex-row gap-4 items-center font-semibold mt-2">
                                    <img className="h-6" src="/passport.png" />
                                    <p>GPLX (đối chiếu) & Passport (giữ lại) </p>
                                </div>
                            </div>

                            <h3 className="font-semibold text-xl">Tài sản thế chấp</h3>
                            <div className="my-4 rounded-2xl bg-[#fef7f4] p-4 border-l-8 border-[#f26a2b]">
                                {
                                    car && !car.mortgage ?
                                        <p className="text-black">Không yêu cầu khách thuê thế chấp Tiền mặt hoặc Xe máy</p>
                                        :
                                        <p className="text-black">{formatMoney(car && car.mortgage && car.mortgage * 1000)} (tiền mặt/chuyển khoản cho chủ xe khi nhận xe) hoặc Xe máy (kèm cà vẹt gốc) giá trị {formatMoney(car && car.mortgage && car.mortgage * 1000)}</p>
                                }
                            </div>


                            <h3 className="font-semibold text-xl">Điều khoản</h3>
                            <div className="text-gray-500 my-4">
                                <p>Quy định khi sử dụng xe thuê:</p>

                                <ul className="list-disc">
                                    <li className="ml-4">Sử dụng xe đúng mục đích.</li>
                                    <li className="ml-4">Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.</li>
                                    <li className="ml-4">Không sử dụng xe thuê để cầm cố, thế chấp.</li>
                                    <li className="ml-4">Không hút thuốc, nhả kẹo cao su, xả rác trong xe.</li>
                                    <li className="ml-4">Không chở hoa quả, thực phẩm nặng mùi trong xe.</li>
                                    <li className="ml-4">Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe sạch sẽ hoặc gửi phụ thu phí vệ sinh xe.</li>
                                </ul>

                                <p>Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời!</p>
                            </div>


                            <h3 className="font-semibold text-xl">Chính sách huỷ chuyến</h3>
                            <p>Miễn phí hủy chuyến trong vòng 1 giờ sau khi đặt cọc</p>
                            <table className="w-full my-3 text-sm">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-3">Thời Điểm Hủy Chuyến</th>
                                        <th className="border px-4 py-3 text-center">Khách Thuê Hủy Chuyến</th>
                                        <th className="border px-4 py-3 text-center">Chủ Xe Hủy Chuyến</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border px-4 py-3">Trong Vòng 1h Sau Giữ Chỗ</td>
                                        <td className="border px-4 py-3">
                                            <div className="flex flex-col justify-center items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM15.84 10.59L12.32 14.11C12.17 14.26 11.98 14.33 11.79 14.33C11.6 14.33 11.4 14.26 11.26 14.11L9.5 12.35C9.2 12.06 9.2 11.58 9.5 11.29C9.79 11 10.27 11 10.56 11.29L11.79 12.52L14.78 9.53C15.07 9.24 15.54 9.24 15.84 9.53C16.13 9.82 16.13 10.3 15.84 10.59Z" fill="#12B76A"></path></svg>
                                                <p>Hoàn tiền giữ chỗ 100%</p>
                                            </div>
                                        </td>
                                        <td className="border px-4 py-3">
                                            <div className="flex flex-col justify-center items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM15.84 10.59L12.32 14.11C12.17 14.26 11.98 14.33 11.79 14.33C11.6 14.33 11.4 14.26 11.26 14.11L9.5 12.35C9.2 12.06 9.2 11.58 9.5 11.29C9.79 11 10.27 11 10.56 11.29L11.79 12.52L14.78 9.53C15.07 9.24 15.54 9.24 15.84 9.53C16.13 9.82 16.13 10.3 15.84 10.59Z" fill="#12B76A"></path></svg>
                                                <p>Không tốn phí</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-3">Trước Chuyến Đi hơn 7 Ngày</td>
                                        <td className="border px-4 py-3">
                                            <div className="flex flex-col justify-center items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM15.84 10.59L12.32 14.11C12.17 14.26 11.98 14.33 11.79 14.33C11.6 14.33 11.4 14.26 11.26 14.11L9.5 12.35C9.2 12.06 9.2 11.58 9.5 11.29C9.79 11 10.27 11 10.56 11.29L11.79 12.52L14.78 9.53C15.07 9.24 15.54 9.24 15.84 9.53C16.13 9.82 16.13 10.3 15.84 10.59Z" fill="#12B76A"></path></svg>
                                                <p>Hoàn tiền giữ chỗ 70%</p>
                                            </div>
                                        </td>
                                        <td className="border px-4 py-3">
                                            <div className="flex flex-col justify-center items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM15.84 10.59L12.32 14.11C12.17 14.26 11.98 14.33 11.79 14.33C11.6 14.33 11.4 14.26 11.26 14.11L9.5 12.35C9.2 12.06 9.2 11.58 9.5 11.29C9.79 11 10.27 11 10.56 11.29L11.79 12.52L14.78 9.53C15.07 9.24 15.54 9.24 15.84 9.53C16.13 9.82 16.13 10.3 15.84 10.59Z" fill="#12B76A"></path></svg>
                                                <p>Đền tiền 30%</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-3">Trong Vòng 7 Ngày Trước Chuyến Đi</td>
                                        <td className="border px-4 py-3">
                                            <div className="flex flex-col justify-center items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM14.67 13.39C14.97 13.69 14.96 14.16 14.67 14.45C14.52 14.59 14.33 14.67 14.14 14.67C13.95 14.67 13.75 14.59 13.61 14.44L12.25 13.07L10.9 14.44C10.75 14.59 10.56 14.67 10.36 14.67C10.17 14.67 9.98 14.59 9.84 14.45C9.54 14.16 9.53999 13.69 9.82999 13.39L11.2 12L9.82999 10.61C9.53999 10.31 9.54 9.84 9.84 9.55C10.13 9.26 10.61 9.26 10.9 9.56L12.25 10.93L13.61 9.56C13.9 9.26 14.37 9.26 14.67 9.55C14.96 9.84 14.97 10.31 14.67 10.61L13.3 12L14.67 13.39Z" fill="#F04438"></path></svg>
                                                <p>Không hoàn tiền</p>
                                            </div>
                                        </td>
                                        <td className="border px-4 py-3">
                                            <div className="flex flex-col justify-center items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM14.67 13.39C14.97 13.69 14.96 14.16 14.67 14.45C14.52 14.59 14.33 14.67 14.14 14.67C13.95 14.67 13.75 14.59 13.61 14.44L12.25 13.07L10.9 14.44C10.75 14.59 10.56 14.67 10.36 14.67C10.17 14.67 9.98 14.59 9.84 14.45C9.54 14.16 9.53999 13.69 9.82999 13.39L11.2 12L9.82999 10.61C9.53999 10.31 9.54 9.84 9.84 9.55C10.13 9.26 10.61 9.26 10.9 9.56L12.25 10.93L13.61 9.56C13.9 9.26 14.37 9.26 14.67 9.55C14.96 9.84 14.97 10.31 14.67 10.61L13.3 12L14.67 13.39Z" fill="#F04438"></path></svg>
                                                <p>Đền tiền 100%</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <ul className="list-disc pl-6 text-gray-500 text-sm">
                                <li className="">Khách thuê không nhận xe sẽ không được hoàn tiền giữ chỗ.</li>
                                <li className="">Chủ xe không giao xe sẽ hoàn & đền 100% tiền giữ chỗ cho bạn.</li>
                                <li className="">Tiền giữ chỗ & bồi thường cho chủ xe hủy chuyến (nếu có) sẽ được Mioto hoàn trả đến bạn bằng chuyển khoản ngân hàng trong vòng 1-3 ngày làm việc.</li>
                            </ul>
                        </div>


                        <div className="border-b-2 py-4">
                            <h3 className="font-semibold text-xl">Vị trí xe</h3>
                            <div className="flex justify-between mt-4">
                                <div>
                                    <p className="py-2 text-lg"><i className="fa-solid fa-location-dot mr-3"></i>{`${car && car.district && car.district} - ${car && car.city && car.city}`}</p>
                                    <p className="text-sm text-gray-500">Địa chỉ cụ thể sẽ được hiển thị sau khi đặt cọc</p>
                                </div>
                                <div className="flex flex-row items-center gap-2 font-bold cursor-pointer" onClick={handleOpenModalMap}>
                                    <i className="fa-regular fa-map"></i>
                                    <p>Xem bản đồ</p>
                                    <i className="fa-solid fa-angle-right"></i>
                                </div>
                            </div>
                        </div>

                        <div className="border-b-2 py-4">
                            <h3 className="font-semibold text-xl">Chủ xe</h3>
                            <div className="flex justify-between mt-4">
                                <div className="flex flex-row gap-3 items-center">
                                    <img className="h-20 rounded-full border" src={car && car.owners && car.owners.user ? car.owners.user.avatarImage : "/avaMale.png"} />
                                    <div>
                                        <p className="font-bold text-xl">{car && car.owners && car.owners.user && car.owners.user.fullname}</p>
                                        <div className="flex flex-row gap-1 font-semibold text-sm">
                                            <label className="flex items-center gap-1">
                                                <svg className="star-rating" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 7.23331C14.7333 6.89998 14.4667 6.49998 14.1333 6.49998L10.3333 5.96665L8.59999 2.49998C8.53333 2.36665 8.46666 2.29998 8.33333 2.23331C7.99999 2.03331 7.59999 2.16665 7.39999 2.49998L5.73333 5.96665L1.93333 6.49998C1.73333 6.49998 1.59999 6.56665 1.53333 6.69998C1.26666 6.96665 1.26666 7.36665 1.53333 7.63331L4.26666 10.3L3.59999 14.1C3.59999 14.2333 3.59999 14.3666 3.66666 14.5C3.86666 14.8333 4.26666 14.9666 4.59999 14.7666L7.99999 12.9666L11.4 14.7666C11.4667 14.8333 11.6 14.8333 11.7333 14.8333C11.8 14.8333 11.8 14.8333 11.8667 14.8333C12.2 14.7666 12.4667 14.4333 12.4 14.0333L11.7333 10.2333L14.4667 7.56665C14.6 7.49998 14.6667 7.36665 14.6667 7.23331Z" fill="#FFC634"></path></svg>
                                                <span>{reviewScore && reviewScore.score}</span>
                                            </label>
                                            <span className="px-1">•</span>
                                            <label className="flex items-center gap-1">
                                                <svg width="20" height="20" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg" className=""><path d="M8.11719 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M40.2734 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.2188 52.3884V28.5931" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9484 21.0604H18.8959C17.5209 21.0604 16.4062 22.1751 16.4062 23.5501V28.5933" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9531 28.5931H7.07471C5.92895 28.5931 5 29.522 5 30.6678V50.3137C5 51.4596 5.92895 52.3884 7.07471 52.3884H28.0278" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M52.9282 18.2196H28.0317C26.8859 18.2196 25.957 19.1484 25.957 20.2943V50.3137C25.957 51.4596 26.8859 52.3884 28.0317 52.3884H52.9282C54.0741 52.3884 55.0029 51.4596 55.0029 50.3137V20.2943C55.0029 19.1484 54.0741 18.2196 52.9282 18.2196Z" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M32.1797 52.3884V18.2196" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M48.7695 18.2196V52.3884" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M29.0625 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M51.8828 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M35.293 18.2197V7.98977C35.293 6.61486 36.4076 5.50013 37.7826 5.50013H43.1768C44.5519 5.50013 45.6665 6.61486 45.6665 7.98977V18.2197" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                                <span>{reviewScore && reviewScore.tripCount} chuyến</span>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <div className="flex flex-row items-center gap-5 font-bold">
                                    <div className="flex flex-col items-center">
                                        <p className="font-normal text-gray-500">Tỉ lệ phản hồi</p>
                                        <span>100%</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p className="font-normal text-gray-500">Thời gian phản hồi</p>
                                        <span>5 phút</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p className="font-normal text-gray-500">Tỉ lệ đồng ý</p>
                                        <span>80%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            userId !== 0 &&
                            <div className="flex justify-center mt-3">
                                <button className="rounded-lg py-3 px-5 text-white font-bold bg-main" onClick={handleOpenModalReview}>Đánh giá</button>
                            </div>
                        }
                        <div className="flex flex-row gap-1 text-lg my-3">
                            <label className="flex items-center gap-1 font-black">
                                <svg className="star-rating" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 7.23331C14.7333 6.89998 14.4667 6.49998 14.1333 6.49998L10.3333 5.96665L8.59999 2.49998C8.53333 2.36665 8.46666 2.29998 8.33333 2.23331C7.99999 2.03331 7.59999 2.16665 7.39999 2.49998L5.73333 5.96665L1.93333 6.49998C1.73333 6.49998 1.59999 6.56665 1.53333 6.69998C1.26666 6.96665 1.26666 7.36665 1.53333 7.63331L4.26666 10.3L3.59999 14.1C3.59999 14.2333 3.59999 14.3666 3.66666 14.5C3.86666 14.8333 4.26666 14.9666 4.59999 14.7666L7.99999 12.9666L11.4 14.7666C11.4667 14.8333 11.6 14.8333 11.7333 14.8333C11.8 14.8333 11.8 14.8333 11.8667 14.8333C12.2 14.7666 12.4667 14.4333 12.4 14.0333L11.7333 10.2333L14.4667 7.56665C14.6 7.49998 14.6667 7.36665 14.6667 7.23331Z" fill="#FFC634"></path></svg>
                                <span>{reviewScore && reviewScore.score}</span>
                            </label>
                            <span className="px-1">•</span>
                            <label className="flex items-center gap-1">
                                <span>{reviewScore && reviewScore.count} đánh giá</span>
                            </label>
                        </div>

                        <div className="flex flex-col gap-3 mt-3">
                            {
                                allReview && allReview.length > 0 ?
                                    allReview.map((item, index) => {
                                        return (
                                            <div className="rounded-lg border border-gray-500 p-4 flex justify-between" key={index}>
                                                <div className="w-5/6">
                                                    <div className="flex flex-row gap-4">
                                                        <img src={item.user && item.user.avatarImage ? item.user.avatarImage : "/avaMale.png"} className="rounded-full h-20 border" />
                                                        <div className="flex flex-col justify-center gap-2">
                                                            <h2 className="text-xl font-semibold">{item.user && item.user.fullname}</h2>
                                                            <div>
                                                                <Rating
                                                                    initialRating={item.reviewScore && item.reviewScore}
                                                                    onChange={handleRatingChange}
                                                                    fractions={2}
                                                                    emptySymbol={<i className="fas fa-star" style={{ color: '#dcdcdc', fontSize: '16px' }}></i>}
                                                                    fullSymbol={<i className="fas fa-star" style={{ color: '#ffd700', fontSize: '16px' }}></i>}
                                                                    readonly={true}
                                                                    direction="ltr"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 text-gray-500">
                                                        {item.content && item.content}
                                                    </div>
                                                </div>
                                                <div className="w-1/6 flex items-center justify-end text-gray-500 text-md">
                                                    <span>{format(item.reviewDate && item.reviewDate, 'dd/MM')}</span>
                                                </div>

                                            </div>
                                        )
                                    })
                                    :
                                    <div className="flex justify-center">
                                        <p className="font-semibold text-xl text-gray-500">Chưa có đánh giá</p>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="w-1/3">
                        <div className=" bg-[#f7fbff] rounded-lg flex flex-col p-4 gap-3 mb-3">
                            <h1 className="font-black text-3xl">{formatMoney(car && car.pricePerDay && car.pricePerDay * 1000)} /ngày</h1>
                            <div className="flex flex-row w-full cursor-pointer" onClick={() => handleOpenDateModal()}>
                                <div className={`rounded-tl-lg rounded-bl-lg bg-white p-3 w-1/2 ${carStatus ? "border border-gray-600" : "border-1 border-red-500"}`}>
                                    <p className="font-normal text-gray-500 mb-1 text-sm">Nhận xe</p>
                                    <p className="font-semibold text-lg">{beginDate}</p>
                                </div>
                                <div className={`rounded-tr-lg rounded-br-lg  bg-white p-3 w-1/2 ${carStatus ? "border border-gray-600" : "border-1 border-l-red-50 border-red-500"}`}>
                                    <p className="font-normal text-gray-500 mb-1 text-sm">Trả xe</p>
                                    <p className="font-semibold text-lg">{endDate}</p>
                                </div>
                            </div>
                            {
                                !carStatus &&
                                <div className="flex gap-2">
                                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.98665 3.29624L2.12572 11.6364C1.73993 12.4061 2.2886 13.3332 3.13733 13.3332L12.8592 13.3332C13.7079 13.3332 14.2652 12.4148 13.8708 11.6364L9.00988 3.29624C8.5898 2.45659 7.40673 2.45659 6.98665 3.29624Z" stroke="#F04438" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8 6.61328V9.05328" stroke="#F04438" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8 10.6665H8.00599" stroke="#F04438" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    <p className="text-red-500 text-[13px]">Xe bận trong khoảng thời gian trên. Vui lòng đặt xe khác hoặc thay đổi lịch trình thích hợp</p>
                                </div>
                            }
                            <div className="w-full rounded-md border bg-white p-3 cursor-pointer" onClick={handleOpenModalMap}>
                                <p className="text-sm">Địa điểm giao nhận xe</p>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="font-semibold">{`${car && car.district && car.district} - ${car && car.city && car.city}`}</p>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>

                            <div className="my-1 border"></div>

                            <div>
                                <div className="flex justify-between">
                                    <p>Đơn giá thuê</p>
                                    <span className="font-semibold">{formatMoney(totalRentNotVoucher)} / ngày</span>
                                </div>
                                <div className="flex justify-between">
                                    <p>Bảo hiểm thuê xe</p>
                                    <span className="font-semibold">{formatMoney(totalRentNotVoucher / 10)}/ ngày</span>
                                </div>
                            </div>

                            <div className="my-1 border"></div>

                            <div>
                                <div className="flex justify-between">
                                    <p>Tổng cộng</p>
                                    <span className="font-semibold">{formatMoney(totalRentNotVoucher + totalRentNotVoucher / 10)} x {dayRent} ngày</span>
                                </div>
                            </div>

                            <div className="my-1 border"></div>

                            <div className="flex justify-between items-center">
                                <div className="flex flex-row items-center w-3/4 gap-3">
                                    <p>Mã giảm giá</p>
                                    {
                                        voucher.voucherCode ?
                                            <>
                                                <p className="text-black font-bold text-lg">{voucher.voucherCode}</p>
                                                <i className="fa-regular fa-circle-xmark fa-lg cursor-pointer" onClick={handleCancelVoucher}></i>
                                            </>
                                            :
                                            <button className="p-1 bg-main text-white rounded-md w-1/3" onClick={handleOpenModalVoucher}>Chọn mã</button>
                                    }
                                </div>
                                <span className="font-semibold">{voucher.voucherMoney === 0 ? formatMoney(0) : formatMoney(-voucher.voucherMoney)}</span>
                            </div>


                            <div className="my-1 border"></div>
                            <div className="flex justify-between font-bold text-lg">
                                <p>Thành tiền</p>
                                <span className="font-black">{formatMoney(totalRentVoucher)}</span>
                            </div>
                            {
                                carStatus ?
                                    <button className="p-3 bg-main text-white font-bold text-lg rounded-md uppercase" onClick={handleOpenModalConfirmRent}>Chọn thuê</button>
                                    :
                                    <div className="text-center p-3 bg-gray-300 text-white font-bold text-lg rounded-md uppercase cursor-not-allowed">Chọn thuê</div>

                            }
                        </div>

                        <p className="text-center text-lg font-semibold hover:text-main cursor-pointer" onClick={handleOpenModalReport}><i className="fa-regular fa-flag mr-3"></i>Báo cáo xe này</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DetailCar