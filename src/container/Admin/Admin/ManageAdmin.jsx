import { useEffect, useState } from "react"
import { getAllAdmin } from "../../../api/appAPI"
import { useSelector } from "react-redux"
import { adminTokenSelector } from "../../../redux/selector"

function ManageAdmin() {
    const [admins, setAdmins] = useState([])
    const adminToken = useSelector(adminTokenSelector)


    const fetchAllAdmins = async () => {
        let res = await getAllAdmin(adminToken)
        if (res && res.length > 0) {
            setAdmins(res)
        } else {
            setAdmins([])
        }
    }

    useEffect(() => {
        fetchAllAdmins()
    }, [])

    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Nhân viên</h2>
                <button className="py-2 px-3 bg-black text-white font-semibold rounded-md"><i className="fa-solid fa-plus mr-2"></i>Thêm nhân viên</button>
            </div>
            <div className="w-full h-40 bg-white mt-10">
                <table class="min-w-full bg-white">
                    <thead>
                        <tr class="bg-gray-50 text-gray-500 text-sm leading-normal">
                            <th class="py-3 px-6 text-left">Họ tên</th>
                            <th class="py-3 px-6 text-left">Số điện thoại</th>
                            <th class="py-3 px-6 text-center">Chức vụ</th>
                            <th class="py-3 px-6 text-center">Email</th>
                            <th class="py-3 px-6 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-600 text-sm font-normal">
                        {
                            admins && admins.length > 0 &&
                            admins.map((admin, index) => {
                                return (
                                    <tr class="border-b border-gray-200 hover:bg-gray-100" key={index}>
                                        <td class="py-3 px-6 text-left whitespace-nowrap">
                                            <div class="flex items-center gap-2">
                                                {/* <img className="h-10 rounded-full border" src={admin.avatarImage ? admin.avatarImage : "/avaMale.png"} /> */}
                                                <span class="font-medium">{admin.fullname}</span>
                                            </div>
                                        </td>
                                        <td class="py-3 px-6 text-left">
                                            <span>{admin.phone}</span>
                                        </td>
                                        <td class="py-3 px-6 text-center">
                                            <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{admin.role}</span>
                                        </td>
                                        <td class="py-3 px-6 text-center">
                                            <span class="text-sm">{admin.email}</span>
                                        </td>
                                        <td class="py-3 px-6 text-center">
                                            <div class="flex item-center justify-center">
                                                <i className="fa-solid fa-ellipsis"></i>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageAdmin