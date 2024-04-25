import { useNavigate } from "react-router-dom"
import ChooseSelector from "../../../features/ChooseSelector"
import "./RegisterSelfDrive.css"
import AddressSelector from "../../../features/AdressSelector"
import { useState } from "react"
function RegisterSelfDrive() {
    const [valueAddress, setValueAddress] = useState({
        city: '',
        district: '',
        ward: '',
        streetAddress: ''
    })

    const handleChangeAddress = (name, value) => {
        setValueAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [formData1, setFormData1] = useState({
        hangXe: '',
        mauXe: ''
    });

    const handleChange1 = (name, value) => {
        setFormData1(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [formData, setFormData] = useState({
        bienSo: '',
        moTa: '',
        giaThue: '',
        giaCoc: '',
        namSanXuat: '',
        truyenDong: '',
        loaiNhienLieu: '',
        soGhe: ''
    });




    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddCar = () => {
        console.log(valueAddress)
        console.log(formData)
        console.log(formData1)
    }

    const navigate = useNavigate()

    const backto = () => {
        navigate('/car-register')
    }

    return (
        <div className="px-32 bg-gray-100 border-t-2" >
            <div className='border-none justify-start mt-3 flex flex-row items-center gap-2 cursor-pointer'>
                <i className="fa-solid fa-chevron-left fa-xl" onClick={() => backto()}></i>
                <p>Quay lại</p>
            </div>
            <div className='p-4 pt-2 flex flex-col items-center gap-4' >
                <h1 className='text-center text-3xl font-bold'>Đăng ký xe</h1>
                <div className="w-2/3 border-2 bg-white p-5">
                    <div className=''>
                        <div className="flex flex-col gap-3 w-1/2">
                            <label className='font-bold text-xl'>Biển số xe</label>
                            <p className="text-red-500 text-sm">Lưu ý: Biển số sẽ không thể thay đổi sau khi đăng kí.</p>
                            <input
                                className="p-2 px-3 border rounded-md outline-none" type="text" name="bienSo"
                                value={formData.bienSo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className='mt-5'>
                        <div className="flex flex-col gap-3 w-full">
                            <label className='font-bold text-xl'>Thông tin cơ bản</label>
                            <p className="text-red-500 text-sm">Lưu ý: Các thông tin cơ bản sẽ không thể thay đổi sau khi đăng kí.</p>
                            <div className="flex flex-wrap gap-14">
                                <ChooseSelector handleChange1={handleChange1} />
                                <div className="flex-col flex w-[calc(50%-30px)]">
                                    <label htmlFor="year">Năm sản xuất</label>
                                    <select id="year" className='p-2 border mt-2 rounded-md cursor-pointer' name="namSanXuat" onChange={handleChange}>
                                        <option value="">Chọn năm</option>
                                        {Array.from({ length: 20 }, (_, i) => i + 2005).map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>


                                <div className="flex-col flex w-[calc(50%-30px)]">
                                    <label>Truyền động</label>
                                    <select id="transition" className='p-2 border mt-2 rounded-md cursor-pointer' name="truyenDong" onChange={handleChange}>
                                        <option value="">Chọn truyền động</option>
                                        <option value="Số tự động">Số tự động</option>
                                        <option value="Số sàn">Số sàn</option>
                                    </select>
                                </div>

                                <div className="flex-col flex w-[calc(50%-30px)]">
                                    <label>Loại nhiên liệu</label>
                                    <select id="fuelType" className='p-2 border mt-2 rounded-md cursor-pointer' name="loaiNhienLieu" onChange={handleChange}>
                                        <option value="">Chọn nhiên liệu</option>
                                        <option value="Xăng">Xăng</option>
                                        <option value="Dầu diesel">Dầu diesel</option>
                                        <option value="Điện">Điện</option>
                                    </select>
                                </div>

                                <div className="flex-col flex w-[calc(50%-30px)]">
                                    <label htmlFor="capacity">Số ghế</label>
                                    <select id="capacity" className='p-2 border mt-2 rounded-md cursor-pointer' name="soGhe" onChange={handleChange}>
                                        <option value="">Chọn số ghế</option>
                                        {Array.from({ length: 17 }, (_, i) => i + 4).map((number) => (
                                            <option key={number} value={number}>{number}</option>
                                        ))}
                                    </select>
                                </div>


                            </div>

                        </div>
                    </div>

                    <div className='mt-5'>
                        <div className="flex flex-col gap-3 w-full">
                            <label className='font-bold text-xl'>Mô tả</label>
                            <textarea className="textarea outline-0 p-2 border h-32" name="moTa" value={formData.moTa} onChange={handleChange}
                                placeholder="Huyndai Elantra số tự động đăng kí tháng 06/2018. Xe gia đình mới đẹp, nội thất nguyên bản, sạch sẽ, bảo dưỡng thường xuyên, rửa xe miễn phí cho khách. Xe rộng rãi, an toàn, tiện nghi, phù hợp cho gia đình du lịch. Xe trang bị hệ thống cảm biến lùi, gạt mưa tự động, đèn pha tự động, camera hành trình, hệ thống giải trí AV cùng nhiều tiện nghi khác..."></textarea>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <div className="flex flex-col gap-3 w-full">
                            <label className='font-bold text-xl'>Tính năng</label>
                            <div className="mt-3 flex flex-wrap gap-5">
                                <div className="list-feature flex flex-wrap gap-3">
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="mp" type="checkbox" className="hidden" name="filter-car-feature" value="mp" />
                                        <label className="description w-full cursor-pointer" for="mp">
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7" src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/map-v2.png"
                                                    alt="Bản đồ" />
                                                <span>Bản đồ</span>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="bt" type="checkbox" className="hidden" name="filter-car-feature" value="bt" />
                                        <label className="description w-full cursor-pointer" for="bt">
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/bluetooth-v2.png" alt="Bluetooth" />
                                                <span>Bluetooth</span>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="p360c" type="checkbox" className="hidden" name="filter-car-feature" value="p360c" />
                                        <label className="description w-full cursor-pointer" for="p360c">
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/360_camera-v2.png" alt="Camera 360" />
                                                <span>Camera 360</span>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="pc" type="checkbox" className="hidden" name="filter-car-feature" value="pc" />
                                        <label className="description w-full cursor-pointer" for="pc">
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/parking_camera-v2.png" alt="Camera cập lề" />
                                                <span>Camera cập lề</span>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="dc" type="checkbox" className="hidden" name="filter-car-feature" value="dc" />
                                        <label className="description w-full cursor-pointer" for="dc">
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/dash_camera-v2.png" alt="Camera hành trình" />
                                                <span>Camera hành trình</span>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="sc" type="checkbox" className="hidden" name="filter-car-feature" value="sc" />
                                        <label className="description w-full cursor-pointer" for="sc">
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/reverse_camera-v2.png" alt="Camera lùi" />
                                                <span>Camera lùi</span>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="tpms" type="checkbox" className="hidden" name="filter - car - feature" value="tpms" />
                                        <label label className="description w-full cursor-pointer" for="tpms" >
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/tpms-v2.png" alt="Cảm biến lốp" />
                                                <span>Cảm biến lốp</span>
                                            </div>
                                        </label >
                                    </div >
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="is" type="checkbox" className="hidden" name="filter - car - feature" value="is" />
                                        <label label className="description w-full cursor-pointer" for="is" >
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/impact_sensor-v2.png" alt="Cảm biến va chạm" />
                                                <span>Cảm biến va chạm</span>
                                            </div>
                                        </label >
                                    </div >
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="hd" type="checkbox" className="hidden" name="filter - car - feature" value="hd" />
                                        <label label className="description w-full cursor-pointer" for="hd" >
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/head_up-v2.png" alt="Cảnh báo tốc độ" />
                                                <span>Cảnh báo tốc độ</span>
                                            </div>
                                        </label >
                                    </div >
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="sr" type="checkbox" className="hidden" name="filter - car - feature" value="sr" />
                                        <label label className="description w-full cursor-pointer" for="sr" >
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/sunroof-v2.png" alt="Cửa sổ trời" />
                                                <span>Cửa sổ trời</span>
                                            </div>
                                        </label >
                                    </div >
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="gp" type="checkbox" className="hidden" name="filter - car - feature" value="gp" />
                                        <label label className="description w-full cursor-pointer" for="gp" >
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/gps-v2.png" alt="Định vị GPS" />
                                                <span>Định vị GPS</span>
                                            </div>
                                        </label >
                                    </div >
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="bs" type="checkbox" className="hidden" name="filter - car - feature" value="bs" />
                                        <label label className="description w-full cursor-pointer" for="bs" >
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/babyseat-v2.png" alt="Ghế trẻ em" />
                                                <span>Ghế trẻ em</span>
                                            </div>
                                        </label >
                                    </div >
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="us" type="checkbox" className="hidden" name="filter - car - feature" value="us" />
                                        <label label className="description w-full cursor-pointer" for="us" >
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/usb-v2.png" alt="Khe cắm USB" />
                                                <span>Khe cắm USB</span>
                                            </div>
                                        </label >
                                    </div >
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="st" type="checkbox" className="hidden" name="filter - car - feature" value="st" />
                                        <label label className="description w-full cursor-pointer" for="st" >
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/spare_tire-v2.png" alt="Lốp dự phòng" />
                                                <span>Lốp dự phòng</span>
                                            </div>
                                        </label >
                                    </div >
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="dvd" type="checkbox" className="hidden" name="filter - car - feature" value="dvd" />
                                        <label label className="description w-full cursor-pointer" for="dvd" >
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/dvd-v2.png" alt="Màn hình DVD" />
                                                <span>Màn hình DVD</span>
                                            </div>
                                        </label >
                                    </div >
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="bn" type="checkbox" className="hidden" name="filter - car - feature" value="bn" />
                                        <label label className="description w-full cursor-pointer" for="bn" >
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/bonnet-v2.png" alt="Nắp thùng xe bán tải" />
                                                <span>Nắp thùng xe bán tải</span>
                                            </div>
                                        </label >
                                    </div >
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="ep" type="checkbox" className="hidden" name="filter - car - feature" value="ep" />
                                        <label label className="description w-full cursor-pointer" for="ep" >
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/etc-v2.png" alt="ETC" />
                                                <span>ETC</span>
                                            </div>
                                        </label >
                                    </div >
                                    <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]">
                                        <input id="ab" type="checkbox" className="hidden" name="filter - car - feature" value="ab" />
                                        <label label className="description w-full cursor-pointer" for="ab" >
                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                <img loading="lazy" className="img-fluid h-7"
                                                    src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/airbags-v2.png" alt="Túi khí an toàn" />
                                                <span>Túi khí an toàn</span>
                                            </div>
                                        </label >
                                    </div >
                                </div >

                            </div >

                        </div >
                    </div >


                    <div className='mt-5'>
                        <div className="flex flex-col gap-3 w-full">
                            <label className='font-bold text-xl'>Đơn giá thuê mặc định</label>
                            <p className="text-sm text-gray-600">Đơn giá áp dụng cho tất cả các ngày. Bạn có thuể tuỳ chỉnh giá khác cho các ngày đặc biệt (cuối tuần, lễ, tết...) trong mục quản lý xe sau khi đăng kí.</p>
                            <div className="flex flex-row items-center gap-2">
                                <input
                                    className="p-2 px-3 border rounded-md outline-none w-1/2" type="number" name="giaThue" placeholder="Giá tiền/ngày K(VND)"
                                    value={formData.giaThue}
                                    onChange={handleChange}
                                    required
                                />
                                <label>K(VND)</label>
                            </div>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <div className="flex flex-col gap-3 w-full">
                            <label className='font-bold text-xl'>Giá cọc khi thuê xe</label>
                            <p className="text-sm text-gray-600">Nếu không cần cọc thì viết 0.</p>
                            <div className="flex flex-row items-center gap-2">
                                <input
                                    className="p-2 px-3 border rounded-md outline-none w-1/2" type="number" name="giaCoc" placeholder="Giá cọc K(VND)"
                                    value={formData.giaCoc}
                                    onChange={handleChange}
                                    required
                                />
                                <label>K(VND)</label>
                            </div>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <label className='font-bold text-xl mb-2'>Địa chỉ giao xe</label>
                        <AddressSelector handleChangeAddress={handleChangeAddress} />
                    </div>
                    <button className="mt-4 w-full py-3 text-lg font-semibold border-none text-white bg-main hover:opacity-80" onClick={() => handleAddCar()}>
                        Đăng ký
                    </button>
                </div >
            </div >
        </div >
    )
}

export default RegisterSelfDrive


