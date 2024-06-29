import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminIdSelector } from '../../redux/selector';
import { setModalDelete, setModalEditUser, setModalObject, setModalObjectDelete, setModalUserId } from '../../redux/Slice/ModalSlice';

function HeaderAdmin() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const dispatch = useDispatch()
    const adminId = useSelector(adminIdSelector)


    const handleDeleteModal = () => {
        dispatch(setModalDelete())
        dispatch(setModalObjectDelete("logout-admin"))
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
                    <ul className="flex justify-end items-center">
                        <li className="hover:opacity-70 px-2 text-sm font-semibold py-2 cursor-pointer transition-colors duration-200" onClick={handleOpenModalEdit}><i className="fa-xl fa-solid fa-user-pen"></i></li>
                        <li className="hover:opacity-70 px-2 text-sm font-semibold py-2 cursor-pointer transition-colors duration-200" onClick={handleDeleteModal}><i className="fa-xl fa-solid fa-right-from-bracket"></i></li>
                    </ul>
                </div>
            </nav >
        </>
    );
}

export default (HeaderAdmin);
