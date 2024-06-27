import { useEffect, useState } from "react"
import { getAllUser } from "../../../api/appAPI"
import { useDispatch, useSelector } from "react-redux"
import { adminTokenSelector, modalAddUserSelector, modalChangePasswordUserSelector, modalDeleteUserSelector, modalEditUserSelector } from "../../../redux/selector"
import { format } from "date-fns"
import { setModalAddUser, setModalChangePasswordUser, setModalDeleteUser, setModalEditUser, setModalObject, setModalUserId, setModalViewUser } from "../../../redux/Slice/ModalSlice"
import { setHideLoading, setShowLoading } from "../../../redux/Slice/AppSlice"
import { toast } from "react-toastify"
import { deleteUser } from "../../../api/adminAPI"

function ManageUser() {
    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
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

    const fetchAllUsers = async () => {
        let res = await getAllUser(adminToken)
        if (res && res.length > 0) {
            setUsers(res)
        } else {
            setUsers([])
        }
    }

    const handleOpenModalCreate = () => {
        dispatch(setModalObject("user"))
        dispatch(setModalAddUser())
    }

    const handleOpenModalView = (userId, index) => {
        toggleDropdown(index)
        dispatch(setModalObject("user"))
        dispatch(setModalUserId(userId))
        dispatch(setModalViewUser())

    }

    const handleOpenModalEdit = (userId, index) => {
        toggleDropdown(index)
        dispatch(setModalObject("user"))
        dispatch(setModalUserId(userId))
        dispatch(setModalEditUser())
    }

    const filteredUsers = users.filter(user =>
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModalDelete = async (userId, index) => {
        try {
            toggleDropdown(index)
            if (window.confirm("Bạn có xóa nhân viên này không?")) {
                dispatch(setShowLoading())
                let res = await deleteUser(userId, adminToken)
                if (res) {
                    toast.success("Xóa thành công")
                    fetchAllUsers()
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

    const handleOpenModalChangePassword = (userId, index) => {
        toggleDropdown(index)
        dispatch(setModalObject("user"))
        dispatch(setModalUserId(userId))
        dispatch(setModalChangePasswordUser())
    }



    useEffect(() => {
        fetchAllUsers()
    }, [])

    useEffect(() => {
        fetchAllUsers()
    }, [modalEditUser, modalDeleteUser, modalChangePasswordUser, modalAddUser])

    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Người dùng</h2>
                <button className="py-2 px-3 bg-black text-white font-semibold rounded-md" onClick={handleOpenModalCreate}><i className="fa-solid fa-plus mr-2"></i>Thêm người dùng</button>
            </div>
            <input
                type="text"
                placeholder="Tìm kiếm theo tên"
                className="p-3 border border-gray-300 rounded-md w-1/4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="w-full mt-6 pb-16">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Họ tên</th>
                            <th className="py-3 px-3 text-center">Tên đăng nhập</th>
                            <th className="py-3 px-4 text-left">Số điện thoại</th>
                            <th className="py-3 px-6 text-left">Ngày sinh</th>
                            <th className="py-3 px-6 text-center">Email</th>
                            <th className="py-3 px-6 text-center">Ngày tham gia</th>
                            <th className="py-3 px-6 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-normal">
                        {
                            filteredUsers && filteredUsers.length > 0 ?
                                filteredUsers.map((user, index) => {
                                    return (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={index}>
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <img className="h-10 rounded-full border" src={user.avatarImage ? user.avatarImage : "/avaMale.png"} />
                                                    <span className="font-medium">{user.fullname}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span>{user.username}</span>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <span>{user.phone}</span>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <span>{user.dob ? format(user.dob, 'dd/MM/yyyy') : "Không có"}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span className="text-sm">{user.email}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm">{format(user.joinDate, "dd/MM/yyyy")}</span>
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
                                                                <li className="hover:bg-gray-200 px-3 text-sm font-semibold py-2 cursor-pointer transition-colors duration-200 flex gap-2 items-center" onClick={() => handleOpenModalView(user.userId, index)}>
                                                                    <i className="fa-solid fa-eye"></i>
                                                                    <p>Chi tiết</p>
                                                                </li>
                                                                <li className="hover:bg-gray-200 px-3 text-sm font-semibold py-2 cursor-pointer transition-colors duration-200 flex gap-2 items-center" onClick={() => handleOpenModalEdit(user.userId, index)}>
                                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                                    <p>Sửa</p>
                                                                </li>
                                                                <li className="hover:bg-gray-200 px-3 text-sm font-semibold py-2 cursor-pointer transition-colors duration-200 flex gap-2 items-center" onClick={() => handleOpenModalChangePassword(user.userId, index)}>
                                                                    <i className="fa-solid fa-lock"></i>
                                                                    <p>Đổi mật khẩu</p>
                                                                </li>
                                                                <li className="hover:bg-gray-200 px-3 text-sm font-semibold py-2 cursor-pointer transition-colors duration-200 flex gap-2 items-center" onClick={() => handleOpenModalDelete(user.userId, index)}>
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
                                    <td colSpan={7}>Không có người dùng nào</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageUser