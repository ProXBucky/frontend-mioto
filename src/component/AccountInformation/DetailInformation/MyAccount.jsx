import { useEffect, useState } from "react"
import { getInformationLicenseById, getInformationUserById, postInformationLicenseById } from "../../../api/userAPI"
import AvatarEditor from 'react-avatar-editor';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { tokenSelector, userIdSelector } from "../../../redux/selector";



function MyAccount({ handleOpenEdit }) {
    const token = useSelector(tokenSelector)
    const userId = useSelector(userIdSelector);
    const [userInfo, setUserInfo] = useState({})
    const [selectedFile, setSelectedFile] = useState(null);
    const [editor, setEditor] = useState(null);
    const [editLicense, setEditLicense] = useState(false)
    const [formData, setFormData] = useState({
        licenseNumber: '',
    });
    const [imageLicense, setImageLicense] = useState('')
    const [scale, setScale] = useState(0)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleScaleChange = (e) => {
        const newScale = parseFloat(e.target.value);
        setScale(newScale);
    };

    useEffect(() => {
        const fetchDataUser = async () => {
            if (userId && token) {
                let res = await getInformationUserById(userId, token)           // FIX_DATA
                setUserInfo(res)
            }
        }
        const fetchDataLicense = async () => {
            if (userId && token) {
                let ress = await getInformationLicenseById(userId, token)
                setFormData({
                    'licenseNumber': ress.licenseNumber
                })
                setImageLicense(ress.fileUpload)
            }
        }
        fetchDataUser()
        fetchDataLicense()
    }, [])



    const closeEditLicense = () => {
        setEditLicense(false)
        setSelectedFile('')
    }

    const postInformationLicense = async () => {
        if (userId) {
            try {
                if (editor) {
                    const canvas = editor.getImageScaledToCanvas();
                    const dataURL = canvas.toDataURL();
                    formData['fileUpload'] = dataURL;
                }
                let res = await postInformationLicenseById(userId, formData, token)
                if (res) {
                    toast.success('Cập nhật thành công')
                    setEditLicense(false)
                }
            } catch (error) {
                console.log(error)
                toast.error('Lỗi hệ thống')
            }
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl py-5 px-4" >
                <div className="flex flex-row justify-between pb-3">
                    <div className="flex flex-row gap-2 items-center">
                        <h2 className="text-2xl font-bold">
                            Thông tin tài khoản
                        </h2>
                        <div className="cursor-pointer w-7 h-7 p-1 border rounded-full" onClick={() => handleOpenEdit()}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.30732 14.1607L14.1673 4.30065L11.7007 1.83398L1.84065 11.694L1.83398 14.1673L4.30732 14.1607Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.2344 4.08789L11.9144 5.76788" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg></div>
                    </div>
                    <div className="border border-gray-300 rounded-lg flex flex-row items-center gap-1 p-3">
                        <svg width="40" height="41" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg" className=""><path d="M8.11719 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M40.2734 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.2188 52.3884V28.5931" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9484 21.0604H18.8959C17.5209 21.0604 16.4062 22.1751 16.4062 23.5501V28.5933" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9531 28.5931H7.07471C5.92895 28.5931 5 29.522 5 30.6678V50.3137C5 51.4596 5.92895 52.3884 7.07471 52.3884H28.0278" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M52.9282 18.2196H28.0317C26.8859 18.2196 25.957 19.1484 25.957 20.2943V50.3137C25.957 51.4596 26.8859 52.3884 28.0317 52.3884H52.9282C54.0741 52.3884 55.0029 51.4596 55.0029 50.3137V20.2943C55.0029 19.1484 54.0741 18.2196 52.9282 18.2196Z" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M32.1797 52.3884V18.2196" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M48.7695 18.2196V52.3884" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M29.0625 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M51.8828 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M35.293 18.2197V7.98977C35.293 6.61486 36.4076 5.50013 37.7826 5.50013H43.1768C44.5519 5.50013 45.6665 6.61486 45.6665 7.98977V18.2197" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <span className="text-main text-4xl font-bold">
                            0
                        </span>
                        <p>chuyến</p>
                    </div>
                </div>
                <div className="flex flex-row items-center">
                    <div className="w-1/3 flex justify-center flex-col gap-3 items-center px-3">
                        <div className="rounded-full overflow-hidden">
                            <img src={userInfo && userInfo.avatarImage ? userInfo.avatarImage : '/avaMale.png'} />
                        </div>
                        <h2 className="text-lg font-semibold">{userInfo && userInfo.fullname && userInfo.fullname}</h2>
                        <p className="text-sm">Tham gia: {userInfo && userInfo.joinDate && userInfo.joinDate}</p>
                    </div>
                    <div className="w-2/3 text-gray-500 pl-5">
                        <div className="bg-gray-100 rounded-lg p-3 flex flex-col gap-3">
                            <div className="flex flex-row justify-between">
                                <p className="text-sm">Ngày sinh</p>
                                <span className="text-black text-base font-semibold">{userInfo && userInfo.dob ? userInfo.dob : '----/----/--------'}</span>
                            </div>

                            <div className="flex flex-row justify-between">
                                <p className="text-sm">Giới tính</p>
                                <span className="text-black text-base font-semibold">{userInfo && userInfo.gender ? userInfo.gender : 'Chưa cập nhật'}</span>
                            </div>

                            <div className="flex flex-row justify-between">
                                <p className="text-sm">Số điện thoại</p>
                                <span className="text-black text-base font-semibold">{userInfo && userInfo.phone ? userInfo.phone : 'Chưa cập nhật'}</span>
                            </div>

                            <div className="flex flex-row justify-between">
                                <p className="text-sm">Email</p>
                                <span className="text-black text-base font-semibold">{userInfo && userInfo.email ? userInfo.email : 'Chưa cập nhật'}</span>
                            </div>

                        </div>

                    </div>
                </div>
            </div >

            <div className="bg-white rounded-2xl py-5 px-4" >
                <div className="flex flex-row justify-between pb-3">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-bold">
                            Giấy phép lái xe
                        </h2>
                    </div>
                    {
                        !editLicense ?
                            <div className="border border-black rounded-lg flex flex-row items-center gap-1 p-2 px-3 cursor-pointer" onClick={() => setEditLicense(true)}>
                                <p className="font-semibold text-sm">Chỉnh sửa</p>
                                <div><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.30732 14.1607L14.1673 4.30065L11.7007 1.83398L1.84065 11.694L1.83398 14.1673L4.30732 14.1607Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.2344 4.08789L11.9144 5.76788" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg></div>
                            </div>
                            :
                            <div className="flex gap-4">
                                <div className="border border-black rounded-lg flex flex-row items-center gap-1 p-2 px-3 cursor-pointer" onClick={() => closeEditLicense()}>
                                    Hủy bỏ
                                </div>
                                <div className="border rounded-lg flex flex-row items-center gap-1 p-2 px-3 bg-main text-white cursor-pointer" onClick={() => postInformationLicense()}>
                                    Lưu
                                </div>
                            </div>
                    }

                </div>
                <div className="flex flex-row">
                    <div className="w-1/2 flex justify-center flex-col gap-3 pr-5">
                        <h3 className="mb-1 font-semibold text-lg">Thông tin chung</h3>
                        <div>
                            <label className="font-semibold text-gray-500 text-md w-full">Số GPLX</label>
                            <input className="outline-none w-full p-2 mt-2 rounded-lg bg-white border disabled:opacity-50 disabled:pointer-events-none" disabled={!editLicense} placeholder="Nhập số GPLX đã cấp" name="licenseNumber" onChange={handleChange} value={formData.licenseNumber} />
                        </div>
                        <div>
                            <label className="font-semibold text-gray-500 text-md w-full">Họ và tên</label>
                            <p className="outline-none w-full p-2 mt-2 rounded-lg bg-white border">
                                {userInfo && userInfo.fullname && userInfo.fullname}
                            </p>
                        </div>
                        <div>
                            <label className="font-semibold text-gray-500 text-md w-full">Ngày sinh</label>
                            <p className="outline-none w-full p-2 mt-2 rounded-lg bg-white border" >
                                {userInfo && userInfo.dob && userInfo.dob}
                            </p>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex flex-row gap-2 items-center justify-center">
                            <h3 className="font-semibold text-lg">Hình ảnh</h3>
                            {
                                editLicense ?
                                    <div>
                                        <label htmlFor="avatarInput" className="cursor-pointer">
                                            <svg width="45" height="46" viewBox="0 0 45 46" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.2498 36.7042H32.7748C36.8623 36.7042 39.8436 32.0659 39.8436 28.1559C39.8183 26.8801 39.5373 25.6232 39.0181 24.4628C38.4989 23.3024 37.7524 22.2631 36.8248 21.4092C35.3633 20.1219 33.4613 19.4807 31.5373 19.6267C31.3697 19.6453 31.2002 19.6297 31.0386 19.5808C30.8769 19.5319 30.7263 19.4508 30.5956 19.3421C30.4648 19.2333 30.3564 19.0992 30.2767 18.9473C30.1969 18.7955 30.1475 18.629 30.1311 18.4575C29.3623 5.96087 11.0623 6.13337 10.7811 18.975C10.7766 19.2372 10.6981 19.4924 10.555 19.71C10.412 19.9276 10.2105 20.0984 9.97484 20.2017C8.24176 21.0791 6.84492 22.523 6.00592 24.3042C5.16693 26.0855 4.93382 28.1021 5.34359 30.0342C5.57802 31.2377 6.05826 32.377 6.75292 33.3777C7.44758 34.3785 8.34102 35.2181 9.37484 35.8417C10.6707 36.5604 12.1426 36.8799 13.6123 36.7617H15.9561" stroke="#5FCF86" strokeWidth="2.44717" strokeLinecap="round" strokeLinejoin="round"></path><path d="M22.5 36.7808V23.4983" stroke="#5FCF86" strokeWidth="2.44717" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18.4307 27.3316L22.4994 23.1917L26.5682 27.3316" stroke="#5FCF86" strokeWidth="2.44717" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                        </label>
                                        <input type="file" id="avatarInput" style={{ display: 'none' }} onChange={handleFileChange} />
                                    </div>
                                    :
                                    <div className="invisible">
                                        <label htmlFor="avatarInput" className="cursor-pointer">
                                            <svg width="45" height="46" viewBox="0 0 45 46" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.2498 36.7042H32.7748C36.8623 36.7042 39.8436 32.0659 39.8436 28.1559C39.8183 26.8801 39.5373 25.6232 39.0181 24.4628C38.4989 23.3024 37.7524 22.2631 36.8248 21.4092C35.3633 20.1219 33.4613 19.4807 31.5373 19.6267C31.3697 19.6453 31.2002 19.6297 31.0386 19.5808C30.8769 19.5319 30.7263 19.4508 30.5956 19.3421C30.4648 19.2333 30.3564 19.0992 30.2767 18.9473C30.1969 18.7955 30.1475 18.629 30.1311 18.4575C29.3623 5.96087 11.0623 6.13337 10.7811 18.975C10.7766 19.2372 10.6981 19.4924 10.555 19.71C10.412 19.9276 10.2105 20.0984 9.97484 20.2017C8.24176 21.0791 6.84492 22.523 6.00592 24.3042C5.16693 26.0855 4.93382 28.1021 5.34359 30.0342C5.57802 31.2377 6.05826 32.377 6.75292 33.3777C7.44758 34.3785 8.34102 35.2181 9.37484 35.8417C10.6707 36.5604 12.1426 36.8799 13.6123 36.7617H15.9561" stroke="#5FCF86" strokeWidth="2.44717" strokeLinecap="round" strokeLinejoin="round"></path><path d="M22.5 36.7808V23.4983" stroke="#5FCF86" strokeWidth="2.44717" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18.4307 27.3316L22.4994 23.1917L26.5682 27.3316" stroke="#5FCF86" strokeWidth="2.44717" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                        </label>
                                        <input type="file" id="avatarInput" style={{ display: 'none' }} onChange={handleFileChange} />
                                    </div>
                            }
                        </div>
                        <div className="border-2 border-dashed rounded-xl w-full h-[300px] relative">
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                {
                                    editLicense ?
                                        <>
                                            {selectedFile && (
                                                <div className="flex justify-center flex-col">
                                                    <AvatarEditor
                                                        ref={(ref) => setEditor(ref)}
                                                        image={selectedFile}
                                                        width={250}
                                                        height={150}
                                                        border={50}
                                                        color={[255, 255, 255, 0.2]}
                                                        scale={scale}
                                                        rotate={0}
                                                    />
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="2"
                                                        step="0.01"
                                                        value={scale}
                                                        onChange={handleScaleChange}
                                                    />
                                                </div>
                                            )}
                                        </>
                                        :
                                        <img src={imageLicense} />
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div >

            <div className="bg-white rounded-2xl py-5 px-4" >
                <div className="flex flex-row justify-between pb-3">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-bold">
                            Danh sách xe
                        </h2>
                    </div>
                    <div className="border border-black rounded-lg flex flex-row items-center gap-1 p-2 px-3 invisible" />

                </div>
                <div className="flex justify-center items-center">
                    <div className="flex items-center flex-col">
                        <img src="/nocar.svg" />
                        <h3 className="font-bold text-xl text-gray-500">Không tìm thấy xe nào</h3>
                    </div>
                </div>
            </div >

        </div >
    )
}

export default MyAccount