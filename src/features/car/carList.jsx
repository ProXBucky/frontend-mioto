import { useNavigate } from "react-router-dom"

function CarList({ isHiddenTitle, carArray }) {
    const navigate = useNavigate()

    const navigateDetailCar = (carId) => {
        navigate(`/car/${carId}`)
    }

    return (
        <div className="px-32 py-10 bg-gray-100">
            {
                !isHiddenTitle ?
                    <div className='text-center mb-20'>
                        <h1 className='h-12 text-5xl font-bold'>Xe Dành Cho Bạn</h1>
                    </div>
                    :
                    ''
            }
            <div className="flex flex-wrap gap-3">
                {
                    carArray && carArray.length > 0 &&
                    carArray.map((car, index) => {
                        return (
                            <div className="w-[calc(25%-15px)] bg-white p-3 rounded-xl border-2 cursor-pointer" key={index} onClick={() => navigateDetailCar(car.carId)}>
                                <img src={car.images && car.images[0].imageLink} className="rounded-xl" />
                                <div className="tag py-3 flex flex-wrap gap-3">
                                    <p className="p-1 bg-[#eef7ff] text-sm rounded-xl">{car.transmission && car.transmission}</p>
                                    <p className="p-1 bg-[#eef7ff] text-sm rounded-xl">Giao xe tận nơi</p>
                                </div>
                                <span className="text-md font-extrabold flex flex-row">
                                    {`${car.model && car.model} ${car.modelYear && car.modelYear}`}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.65372 3.63C9.89372 3.29813 11.2114 3 12 3C12.7886 3 14.1063 3.29813 15.3463 3.63C16.6149 3.9675 17.8937 4.36687 18.6457 4.60875C18.9601 4.71096 19.2389 4.8984 19.4499 5.14954C19.661 5.40068 19.7958 5.70533 19.8389 6.0285C20.52 11.0651 18.9394 14.7979 17.0217 17.2672C16.2085 18.3236 15.2388 19.2538 14.1451 20.0269C13.767 20.2944 13.3663 20.5296 12.9474 20.73C12.6274 20.8785 12.2834 21 12 21C11.7166 21 11.3737 20.8785 11.0526 20.73C10.6337 20.5296 10.233 20.2944 9.85486 20.0269C8.76118 19.2538 7.79153 18.3236 6.97829 17.2672C5.06058 14.7979 3.48001 11.0651 4.16115 6.0285C4.20422 5.70533 4.33903 5.40068 4.55008 5.14954C4.76114 4.8984 5.03988 4.71096 5.35429 4.60875C6.44594 4.25641 7.54607 3.93007 8.65372 3.63Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M11.3333 12.6668L9.5 10.8335" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.9997 9L11.333 12.6667" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </span>
                                <span className="text-sm text-gray-500"><i className="fa-solid fa-location-dot mr-1 text-black"></i>{`${car.district && car.district}, ${car.city && car.city}`}</span>
                                <div className="border-b-2 py-1"></div>
                                <div className="footer flex flex-row justify-between pt-3 text-sm">
                                    <div className="flex flex-row">
                                        <label className="flex items-center gap-1">
                                            <svg className="star-rating" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 7.23331C14.7333 6.89998 14.4667 6.49998 14.1333 6.49998L10.3333 5.96665L8.59999 2.49998C8.53333 2.36665 8.46666 2.29998 8.33333 2.23331C7.99999 2.03331 7.59999 2.16665 7.39999 2.49998L5.73333 5.96665L1.93333 6.49998C1.73333 6.49998 1.59999 6.56665 1.53333 6.69998C1.26666 6.96665 1.26666 7.36665 1.53333 7.63331L4.26666 10.3L3.59999 14.1C3.59999 14.2333 3.59999 14.3666 3.66666 14.5C3.86666 14.8333 4.26666 14.9666 4.59999 14.7666L7.99999 12.9666L11.4 14.7666C11.4667 14.8333 11.6 14.8333 11.7333 14.8333C11.8 14.8333 11.8 14.8333 11.8667 14.8333C12.2 14.7666 12.4667 14.4333 12.4 14.0333L11.7333 10.2333L14.4667 7.56665C14.6 7.49998 14.6667 7.36665 14.6667 7.23331Z" fill="#FFC634"></path></svg>
                                            <span>5.0</span>
                                        </label>
                                        <span className="px-1">•</span>
                                        <label className="flex items-center gap-1">
                                            <svg width="20" height="20" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg" className=""><path d="M8.11719 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M40.2734 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.2188 52.3884V28.5931" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9484 21.0604H18.8959C17.5209 21.0604 16.4062 22.1751 16.4062 23.5501V28.5933" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9531 28.5931H7.07471C5.92895 28.5931 5 29.522 5 30.6678V50.3137C5 51.4596 5.92895 52.3884 7.07471 52.3884H28.0278" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M52.9282 18.2196H28.0317C26.8859 18.2196 25.957 19.1484 25.957 20.2943V50.3137C25.957 51.4596 26.8859 52.3884 28.0317 52.3884H52.9282C54.0741 52.3884 55.0029 51.4596 55.0029 50.3137V20.2943C55.0029 19.1484 54.0741 18.2196 52.9282 18.2196Z" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M32.1797 52.3884V18.2196" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M48.7695 18.2196V52.3884" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M29.0625 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M51.8828 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M35.293 18.2197V7.98977C35.293 6.61486 36.4076 5.50013 37.7826 5.50013H43.1768C44.5519 5.50013 45.6665 6.61486 45.6665 7.98977V18.2197" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                            <span>23 chuyến</span>
                                        </label>
                                    </div>
                                    <label>
                                        <p><span className="text-main font-black">{car.pricePerDay && car.pricePerDay}K</span> / ngày</p>
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default CarList