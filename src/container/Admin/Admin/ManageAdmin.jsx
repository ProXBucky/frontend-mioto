import { useEffect, useState } from "react"
import { getAllAdmin } from "../../../api/appAPI"
import { useDispatch, useSelector } from "react-redux"
import { adminTokenSelector, modalAddUserSelector, modalChangePasswordUserSelector, modalDeleteUserSelector, modalEditUserSelector } from "../../../redux/selector"
import { setModalAddUser, setModalChangePasswordUser, setModalDeleteUser, setModalEditUser, setModalObject, setModalUserId, setModalViewUser } from "../../../redux/Slice/ModalSlice"
import { format } from "date-fns"
import { deleteAdmin } from "../../../api/adminAPI"
import { setHideLoading, setShowLoading } from "../../../redux/Slice/AppSlice";
import { toast } from "react-toastify"

function ManageAdmin() {
    const [admins, setAdmins] = useState([])
    const dispatch = useDispatch()

    const fetchAllAdmins = async () => {
        let res = await getAllAdmin(adminToken)
        if (res && res.length > 0) {
            setAdmins(res)
        } else {
            setAdmins([])
        }
    }

    const modalEditUser = useSelector(modalEditUserSelector)
    const modalDeleteUser = useSelector(modalDeleteUserSelector)
    const modalChangePasswordUser = useSelector(modalChangePasswordUserSelector)
    const modalAddUser = useSelector(modalAddUserSelector)
    const adminToken = useSelector(adminTokenSelector)
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    const handleOpenModalCreate = () => {
        dispatch(setModalObject("admin"))
        dispatch(setModalAddUser())
    }

    const handleOpenModalView = (userId, index) => {
        toggleDropdown(index)
        dispatch(setModalObject("admin"))
        dispatch(setModalUserId(userId))
        dispatch(setModalViewUser())

    }

    const handleOpenModalEdit = (userId, index) => {
        toggleDropdown(index)
        dispatch(setModalObject("admin"))
        dispatch(setModalUserId(userId))
        dispatch(setModalEditUser())
    }

    const handleOpenModalDelete = (userId, index) => {
        toggleDropdown(index)
        dispatch(setModalObject("admin"))
        dispatch(setModalUserId(userId))
        dispatch(setModalDeleteUser())
    }

    const handleOpenModalChangePassword = (userId, index) => {
        toggleDropdown(index)
        dispatch(setModalObject("admin"))
        dispatch(setModalUserId(userId))
        dispatch(setModalChangePasswordUser())
    }

    const filteredAdmin = admins.filter(admin =>
        admin.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteAdmin = async (adminId, index) => {
        try {
            toggleDropdown(index)
            if (window.confirm("Bạn có xóa nhân viên này không?")) {
                dispatch(setShowLoading())
                let res = await deleteAdmin(adminId, adminToken)
                if (res) {
                    toast.success("Xóa thành công thành công")
                    fetchAllAdmins()
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

    useEffect(() => {
        fetchAllAdmins()
    }, [])

    useEffect(() => {
        fetchAllAdmins()
    }, [modalEditUser, modalDeleteUser, modalChangePasswordUser, modalAddUser])

    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Nhân viên</h2>
                <button className="py-2 px-3 bg-black text-white font-semibold rounded-md" onClick={handleOpenModalCreate}><i className="fa-solid fa-plus mr-2"></i>Thêm nhân viên</button>
            </div>
            <input
                type="text"
                placeholder="Tìm kiếm theo tên"
                className="p-3 border border-gray-300 rounded-md w-1/4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="w-full h-40 bg-white mt-6">
                <table class="min-w-full bg-white">
                    <thead>
                        <tr class="bg-gray-50 text-gray-500 text-sm leading-normal">
                            <th class="py-3 px-6 text-left">Họ tên</th>
                            <th class="py-3 px-6 text-left">Tên đăng nhập</th>
                            <th class="py-3 px-6 text-left">Ngày sinh</th>
                            <th class="py-3 px-6 text-left">Số điện thoại</th>
                            <th class="py-3 px-6 text-center">Email</th>
                            <th class="py-3 px-6 text-center">Chức vụ</th>
                            <th class="py-3 px-6 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-600 text-sm font-normal">
                        {
                            filteredAdmin && filteredAdmin.length > 0 ?
                                filteredAdmin.map((admin, index) => {
                                    return (
                                        <tr class="border-b border-gray-200 hover:bg-gray-100" key={index}>
                                            <td class="py-3 px-6 text-left whitespace-nowrap">
                                                <div class="flex items-center gap-2">
                                                    <img className="h-10 rounded-full border" src={admin.avatarImage ? admin.avatarImage : "/avaMale.png"} />
                                                    <span class="font-medium">{admin.fullname}</span>
                                                </div>
                                            </td>
                                            <td class="py-3 px-6 text-left whitespace-nowrap">
                                                <span class="font-medium">{admin.username}</span>
                                            </td>
                                            <td class="py-3 px-6 text-left whitespace-nowrap">
                                                <span class="font-medium">{admin.dob ? format(admin.dob, "dd/MM/yyyy") : "Không có"}</span>
                                            </td>
                                            <td class="py-3 px-6 text-left">
                                                <span>{admin.phone}</span>
                                            </td>
                                            <td class="py-3 px-6 text-center">
                                                <span class="text-sm">{admin.email}</span>
                                            </td>
                                            <td class="py-3 px-6 text-center">
                                                <span class="bg-green-200 text-gray-700 py-1 px-3 rounded-full text-sm">{admin.role === "Staff" ? "Nhân viên" : "Quản trị viên"}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center relative">
                                                    <i
                                                        className="fa-solid fa-ellipsis fa-xl cursor-pointer"
                                                        onClick={() => toggleDropdown(index)}
                                                    ></i>
                                                    {openDropdownIndex === index && (
                                                        <div
                                                            className="absolute right-16 top-[-40px] transform transition-transform duration-300 
                                                                w-36 scale-100 
                                                                overflow-hidden bg-gray-100 text-black mt-2 rounded shadow-lg"
                                                        >
                                                            <ul>
                                                                <li className="hover:bg-gray-200 px-3 text-sm font-semibold py-2 cursor-pointer transition-colors duration-200 flex gap-2 items-center" onClick={() => handleOpenModalView(admin.adminId, index)}>
                                                                    <i className="fa-solid fa-eye"></i>
                                                                    <p>Chi tiết</p>
                                                                </li>
                                                                <li className="hover:bg-gray-200 px-3 text-sm font-semibold py-2 cursor-pointer transition-colors duration-200 flex gap-2 items-center" onClick={() => handleOpenModalEdit(admin.adminId, index)}>
                                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                                    <p>Sửa</p>
                                                                </li>
                                                                <li className="hover:bg-gray-200 px-3 text-sm font-semibold py-2 cursor-pointer transition-colors duration-200 flex gap-2 items-center" onClick={() => handleOpenModalChangePassword(admin.adminId, index)}>
                                                                    <i className="fa-solid fa-lock"></i>
                                                                    <p>Đổi mật khẩu</p>
                                                                </li>
                                                                <li className="hover:bg-gray-200 px-3 text-sm font-semibold py-2 cursor-pointer transition-colors duration-200 flex gap-2 items-center" onClick={() => handleDeleteAdmin(admin.adminId, index)}>
                                                                    <i className="fa-solid fa-trash-can"></i>
                                                                    <p>Xóa</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr className="w-full text-base h-20 text-center">
                                    <td colSpan={7}>Không có nhân viên nào</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageAdmin