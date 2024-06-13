import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminTokenSelector, modalObjectSelector, modalUserIdSelector, modalViewUserSelector } from "../../../redux/selector";
import { ModalBody } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { clearModalUserId, clearModalViewUser, setModalObject } from "../../../redux/Slice/ModalSlice";
import { getInformationUserById } from "../../../api/appAPI";
import { format } from "date-fns";
import { findInformationAdminById } from "../../../api/adminAPI";

function ModalViewUser() {
    const dispatch = useDispatch()
    const token = useSelector(adminTokenSelector)
    const userId = useSelector(modalUserIdSelector);
    const modalViewUser = useSelector(modalViewUserSelector)
    const modalObject = useSelector(modalObjectSelector)

    const [userInfo, setUserInfo] = useState({})

    const fetchDataUser = async () => {
        if (userId && token) {
            if (modalObject === "user") {
                let res = await getInformationUserById(userId, token)
                if (res) {
                    setUserInfo(res)
                } else {
                    setUserInfo({})
                }
            }
            else if (modalObject === "admin") {
                let res = await findInformationAdminById(userId, token)
                if (res) {
                    setUserInfo(res)
                } else {
                    setUserInfo({})
                }
            }
        }
    }

    const handleCloseModal = () => {
        dispatch(clearModalUserId())
        dispatch(clearModalViewUser())
        dispatch(setModalObject(null))
    }

    useEffect(() => {
        fetchDataUser()
    }, [])

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalViewUser}
        >
            <Modal.Header className='border-none justify-between mt-3 px-10'>
                <h2 className="text-2xl font-bold">Thông tin tài khoản</h2>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseModal}></i>
            </Modal.Header>
            <ModalBody>
                <div className="bg-white rounded-2xl py-2 px-4" >
                    <div className="flex flex-row items-center">
                        <div className="w-1/3 flex justify-center flex-col gap-2 items-center px-3">
                            <div className="rounded-full overflow-hidden border-2">
                                <img src={userInfo && userInfo.avatarImage ? userInfo.avatarImage : '/avaMale.png'} />
                            </div>
                            <h2 className="text-lg font-semibold">{userInfo && userInfo.fullname && userInfo.fullname}</h2>
                            {
                                modalObject === "user" &&
                                <p className="text-sm">Tham gia: {userInfo && userInfo.joinDate && format(userInfo.joinDate, 'dd/MM/yyyy')}</p>
                            }
                        </div>
                        <div className="w-2/3 text-gray-500 pl-5">
                            <div className="bg-gray-100 rounded-lg p-3 flex flex-col gap-3">
                                <div className="flex flex-row justify-between">
                                    <p className="text-sm">Tên đăng nhập</p>
                                    <span className="text-black text-base font-semibold">{userInfo && userInfo.username && userInfo.username}</span>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p className="text-sm">Ngày sinh</p>
                                    <span className="text-black text-base font-semibold">{userInfo && userInfo.dob ? format(userInfo.dob, 'dd-MM-yyyy') : '----/----/--------'}</span>
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

                                {
                                    modalObject === "admin" &&
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm">Chức vụ</p>
                                        {
                                            userInfo && userInfo.role === "staff" ?
                                                <span className="text-black text-base font-semibold">Nhân viên</span>
                                                :
                                                <span className="text-black text-base font-semibold">Quản trị viên</span>
                                        }
                                    </div>
                                }

                            </div>

                        </div>
                    </div>
                </div >
            </ModalBody>
        </Modal>
    )

}

export default ModalViewUser