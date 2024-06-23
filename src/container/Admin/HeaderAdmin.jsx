import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminIdSelector, adminTokenSelector } from '../../redux/selector';
import { clearAdminFullname, clearAdminId, clearAdminRole, clearAdminToken, clearAvatarImageAdmin } from '../../redux/Slice/CookieSlice';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { logoutAdmin } from '../../api/authAPI';
import { setModalEditUser, setModalObject, setModalUserId } from '../../redux/Slice/ModalSlice';

function HeaderAdmin() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const adminToken = useSelector(adminTokenSelector)
    const adminId = useSelector(adminIdSelector)

    const handleLogout = async () => {
        try {
            if (window.confirm("Bạn có muốn đăng xuất không?")) {
                let res = await logoutAdmin(adminToken);
                if (res) {
                    Cookies.remove('adminAccessToken');
                    Cookies.remove('adminId');
                    Cookies.remove('adminFullname');
                    Cookies.remove('adminRole');
                    Cookies.remove('avatarImageAdmin')
                    dispatch(clearAdminToken())
                    dispatch(clearAdminId())
                    dispatch(clearAdminFullname())
                    dispatch(clearAdminRole())
                    dispatch(clearAvatarImageAdmin())
                    navigate('/login')
                    toast.success("Hẹn gặp bạn lần sau");
                }
            }
        } catch (error) {
            console.log(error)
            toast.error("Lỗi hệ thống, đăng xuất thất bại")
        }
    }

    const handleOpenModalEdit = () => {
        toggleDropdown()
        dispatch(setModalObject("admin"))
        dispatch(setModalUserId(adminId))
        dispatch(setModalEditUser())
    }

    return (
        <>
            <nav className="h-auto px-12 py-3 w-full sticky top-0 bg-gray-100 z-50">
                <div className="flex justify-end" >
                    <ul className="flex justify-end items-center gap-6">
                        <li>
                            <i className="fa-solid fa-bell fa-xl cursor-pointer" style={{ color: "#5fcf86" }}></i>
                        </li>
                        <li className='relative'>
                            <i className="fa-solid fa-ellipsis fa-xl cursor-pointer" onClick={toggleDropdown} style={{ color: "#5fcf86" }}></i>
                            <div
                                className={`absolute top-9 right-0 transform transition-transform duration-300 
                                    ${isDropdownOpen ? 'w-32 scale-100' : 'w-32 scale-0'} 
                                    overflow-hidden bg-gray-100 text-black mt-2 rounded shadow-lg`}
                            >
                                <ul>
                                    <li className="hover:bg-gray-200 px-3 text-sm font-semibold py-2 cursor-pointer transition-colors duration-200" onClick={handleOpenModalEdit}>Thông tin</li>
                                    <li className="hover:bg-gray-200 px-3 text-sm font-semibold py-2 cursor-pointer transition-colors duration-200" onClick={handleLogout}>Đăng xuất</li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav >
        </>
    );
}

export default (HeaderAdmin);
