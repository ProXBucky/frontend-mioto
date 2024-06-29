import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { beginDateSelector, endDateSelector } from '../../redux/selector';
import MapComponent from '../../container/Common/MapComponent';
import { formatMoney } from '../../utils/formatMoney';
import { calculateDays } from '../../utils/calculateDays';
import { useState } from 'react';


function ModalConfirmRent({ showModalConfirmRent, handleCloseModalConfirmRent, handleConfirmRent, car, voucher, totalRentNotVoucher, totalRentVoucher, carImg, locationName }) {
    const beginDate = useSelector(beginDateSelector)
    const endDate = useSelector(endDateSelector)
    const dayRent = calculateDays(beginDate, endDate)

    const [isTerm1Checked, setIsTerm1Checked] = useState(false);
    const [isTerm2Checked, setIsTerm2Checked] = useState(false);

    const handleTerm1Change = () => {
        setIsTerm1Checked(!isTerm1Checked);
    };

    const handleTerm2Change = () => {
        setIsTerm2Checked(!isTerm2Checked);
    };

    const isContinueButtonEnabled = isTerm1Checked && isTerm2Checked;
    return (
        <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModalConfirmRent} onHide={handleCloseModalConfirmRent}
        >
            <Modal.Header className='mt-3 flex justify-between'>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer invisible" onClick={handleCloseModalConfirmRent}></i>
                <h2 className='font-semibold text-2xl text-center'>Xác nhận thuê xe</h2>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseModalConfirmRent}></i>
            </Modal.Header>
            <Modal.Body className='px-5 flex flex-col items-center' >
                <h2 className='font-bold text-2xl mb-2'>{`${car && car.model && car.model} ${car && car.modelYear && car.modelYear}`}</h2>
                <div className='flex flex-row w-full border-t-2 pt-4'>
                    <div className='w-1/3'>
                        <img src={carImg} className='rounded-xl' />
                    </div>
                    <div className='w-2/3 pl-10'>
                        <h3 className='font-semibold text-lg'>Thời gian thuê xe</h3>
                        <div className='flex flex-row gap-20 w-full mt-2'>
                            <p>Bắt đầu: {beginDate}</p>
                            <p>Kết thúc: {endDate}</p>
                        </div>

                        <h3 className='font-semibold text-lg mt-5'>Chủ xe</h3>
                        <div className="flex flex-col gap-3 mt-2">
                            <div className="flex flex-row gap-3 items-center">
                                <img className="h-20 rounded-full border" src={car && car && car.user ? car.user.avatarImage : "/avaMale.png"} />
                                <div>
                                    <p className="font-semibold text-lg">{car && car && car.user && car.user.fullname}</p>
                                    <div className="flex flex-row gap-1 font-semibold text-sm">
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
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <p className='font-semibold'>Số điện thoại: {car && car && car.user && car.user.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-3 w-full'>
                    <h3 className='font-semibold text-lg mb-2'>Địa chỉ nhận xe</h3>
                    <p className='my-2 text-lg font-normal'>{locationName}</p>
                    <MapComponent locationName={locationName} />
                </div>

                <div className='mt-3 w-full'>
                    <h3 className='font-semibold text-lg mb-2'>Bảng giá</h3>
                    <div className='flex flex-row items-end'>
                        <div className="w-3/5">
                            <div className=" bg-gray-100 flex flex-col p-4 gap-3 border">
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
                                            voucher.voucherCode &&
                                            <>
                                                <p className="text-black font-bold text-lg">{voucher.voucherCode}</p>
                                            </>
                                        }
                                    </div>
                                    <span className="font-semibold">{voucher.voucherMoney === 0 ? formatMoney(0) : formatMoney(-voucher.voucherMoney)}</span>
                                </div>
                                <div className="my-1 border"></div>
                                <div className="flex justify-between font-bold text-lg">
                                    <p>Thành tiền</p>
                                    <span className="font-bold">{formatMoney(totalRentVoucher)}</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-2/5 pl-5'>
                            <div className="rounded-lg flex flex-col gap-3 text-center">
                                <div className="flex flex-col font-semibold text-lg w-full bg-gray-100 p-3">
                                    <p className='text-gray-400 uppercase text-sm font-bold mb-2'>Tiền cọc</p>
                                    <span className="font-semibold text-green-500">{formatMoney(totalRentVoucher * 30 / 100)}</span>
                                </div>

                                <div className="flex flex-col font-semibold text-lg w-full bg-gray-100 p-3">
                                    <p className='text-gray-400 uppercase text-sm font-bold mb-2'>Thanh toán cho chủ xe sau khi nhận xe</p>
                                    <span className="font-bold">{formatMoney(totalRentVoucher * 70 / 100)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-2 w-full">
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
                <div className='mt-2 w-full'>
                    <div>
                        <label className='flex flex-row gap-2 font-semibold cursor-pointer'>
                            <input type="checkbox" checked={isTerm1Checked} onChange={handleTerm1Change} />
                            <p>Tôi đã có đầy đủ giấy tờ chủ xe yêu cầu</p>
                        </label>
                    </div>
                    <div className='mt-2'>
                        <label className=' flex flex-row gap-2 font-semibold cursor-pointer'>
                            <input type="checkbox" checked={isTerm2Checked} onChange={handleTerm2Change} />
                            <p>
                                Tôi đã hiểu và đồng ý với chính sách hủy chuyến của Mioto
                            </p>
                        </label>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='flex justify-between'>
                <button className='p-3 bg-gray-600 rounded-lg text-white font-semibold px-4 w-[48%]' onClick={handleCloseModalConfirmRent}>Hủy bỏ</button>
                <button className={`p-3 rounded-lg text-white font-semibold px-4 w-[48%] ${isContinueButtonEnabled ? "bg-main" : "bg-green-200"}`} disabled={!isContinueButtonEnabled} onClick={handleConfirmRent}>Đặt xe</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirmRent