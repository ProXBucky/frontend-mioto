import { useNavigate } from "react-router-dom"
import ChooseSelector from "../../../features/ChooseSelector"
import "./RegisterSelfDrive.css"
import AddressSelector from "../../../features/AdressSelector"
import { useEffect, useState } from "react"
import { getAllCarFeature } from "../../../api/appAPI"
function RegisterSelfDrive() {
    const [featureArray, setFeatureArray] = useState([])
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

    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const handleCheckboxChange = (event) => {
        const featureCode = event.target.value;
        if (event.target.checked) {
            setSelectedFeatures([...selectedFeatures, featureCode]);
        } else {
            setSelectedFeatures(selectedFeatures.filter(code => code !== featureCode));
        }
    };

    const [selectedImages, setSelectedImages] = useState([]);

    const handleDeleteAllImages = () => {
        setSelectedImages([])
    }

    const handleImageChange = async (event) => {
        const files = event.target.files;
        const imagesArray = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            // Tạo một promise để đảm bảo rằng việc đọc file đã hoàn thành trước khi thêm vào mảng
            const promise = new Promise((resolve) => {
                reader.onload = (e) => {
                    resolve(e.target.result);
                };
            });

            reader.readAsDataURL(file);
            const imageDataUrl = await promise;
            imagesArray.push(imageDataUrl);
        }

        setSelectedImages([...selectedImages, ...imagesArray]);
    };


    const handleAddCar = () => {
        console.log(valueAddress)
        console.log(formData)
        console.log(formData1)
        console.log(selectedFeatures)
        console.log(selectedImages)

    }

    const navigate = useNavigate()

    const backto = () => {
        navigate('/car-register')
    }

    useEffect(() => {
        const fetchAllFeature = async () => {
            try {
                const res = await getAllCarFeature()
                if (res && res.length > 0) {
                    setFeatureArray(res)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllFeature()
    }, [])


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
                                    {
                                        featureArray && featureArray.length > 0 &&
                                        featureArray.map((item, index) => {
                                            return (
                                                <div className="squaredThree have-label cursor-pointer border w-[calc(33%-10px)]" key={index}>
                                                    <input id={item.featureCode} type="checkbox"
                                                        className="hidden" name="filter-car-feature" value={item.featureCode}
                                                        onChange={handleCheckboxChange}
                                                        checked={selectedFeatures.includes(item.featureCode)} />
                                                    <label className="description w-full cursor-pointer" htmlFor={item.featureCode}>
                                                        <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                            <img loading="lazy" className="img-fluid h-7" src={item.featureIcon}
                                                                alt={item.featureName} />
                                                            <span>{item.featureName}</span>
                                                        </div>
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
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
                            <p className="text-sm text-gray-600">Nếu không cần cọc thì để trống.</p>
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

                    <div className='mt-5'>
                        <label className='font-bold text-xl mb-2 block'>Chọn hình ảnh xe</label>
                        <div className="w-full flex justify-between">
                            <label htmlFor="ip" className="p-3 border rounded-md bg-main text-white font-bold cursor-pointer">Chọn ảnh</label>
                            {
                                selectedImages.length > 0 &&
                                <button className="p-3 bg-main text-white rounded-md font-bold" onClick={() => handleDeleteAllImages()}>Xóa tất cả ảnh</button>
                            }
                        </div>
                        <input
                            id="ip"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                        />

                        <div className="flex flex-wrap gap-2">
                            {
                                selectedImages.map((imageUrl, index) => {
                                    return (
                                        <img
                                            className="cursor-pointer"
                                            key={index}
                                            src={imageUrl}
                                            alt={`Image ${index}`}
                                            style={{ maxWidth: '200px', maxHeight: '200px', margin: '15px' }}
                                        />
                                    )
                                })


                            }
                        </div>
                    </div>

                    <button className="mt-4 w-full py-3 text-lg font-semibold border-none rounded-md text-white bg-main hover:opacity-80" onClick={() => handleAddCar()}>
                        Đăng ký
                    </button>
                </div >
            </div >
        </div >
    )
}

export default RegisterSelfDrive


