
import { useEffect, useState } from "react"
import { getAllVoucher } from "../../../api/appAPI"
import { useDispatch, useSelector } from "react-redux"
import { adminTokenSelector } from "../../../redux/selector"
import { format } from "date-fns"
import { setModalAddVoucher, setModalFeedVoucher, setModalVoucherId } from "../../../redux/Slice/ModalSlice"
import { formatMoney } from "../../../utils/formatMoney"
import { deleteVoucher } from "../../../api/adminAPI"
import { toast } from "react-toastify"

function ManageVoucher() {
    const dispatch = useDispatch()
    const [vouchers, setVouchers] = useState([])
    const adminToken = useSelector(adminTokenSelector)

    const fetchAllVouchers = async () => {
        let res = await getAllVoucher(adminToken)
        if (res && res.length > 0) {
            setVouchers(res)
        } else {
            setVouchers([])
        }
    }

    const handleOpenModalCreate = () => {
        dispatch(setModalAddVoucher())
    }

    const feedVoucherByID = async (voucherId) => {
        dispatch(setModalVoucherId(voucherId))
        dispatch(setModalFeedVoucher())
    }

    const deleteVoucherByID = async (voucherId) => {
        try {
            if (window.confirm("Bạn có muốn xóa mã giảm giá này không?")) {
                let res = await deleteVoucher(voucherId, adminToken);
                if (res) {
                    fetchAllVouchers()
                    toast.success("Xóa mã giảm giá thành công");
                }
            }
        } catch (error) {
            console.log(error)
            toast.error("Lỗi hệ thống, xóa mã giảm giá thất bại")
        }
    }


    useEffect(() => {
        fetchAllVouchers()
    }, [])


    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Mã giảm giá</h2>
                <button className="py-2 px-3 bg-black text-white font-semibold rounded-md" onClick={handleOpenModalCreate}><i className="fa-solid fa-plus mr-2"></i>Thêm mã giảm giá</button>
            </div>
            <div className="w-full mt-10 pb-16">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Mã code</th>
                            <th className="py-3 px-3 text-center">Mô tả</th>
                            <th className="py-3 px-4 text-center">Thể loại</th>
                            <th className="py-3 px-6 text-center">Giá trị</th>
                            <th className="py-3 px-3 text-center">Hạn sử dụng</th>
                            <th className="py-3 px-6 text-center">Xóa</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-normal">
                        {
                            vouchers && vouchers.length > 0 &&
                            vouchers.map((voucher, index) => {
                                return (
                                    <tr className="border-b font-semibold border-gray-200 hover:bg-gray-100" key={index}>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <span>{voucher.voucherCode}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <span>{voucher.description}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <span>{voucher.type === "money" ? "Giảm thẳng" : "Giảm theo phần trăm"}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <span className="text-sm">{voucher.type === "money" ? formatMoney(voucher.discountPercent * 1000) : voucher.discountPercent + "%"}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <span>{voucher.expireDate && format(voucher.expireDate, 'dd/MM/yyyy')}</span>
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <div className="flex flex-row gap-2">
                                                <i className="fa-solid fa-circle-plus fa-xl cursor-pointer" onClick={() => feedVoucherByID(voucher.voucherId)}></i>
                                                <i className="fa-solid fa-trash fa-lg cursor-pointer fa-xl" style={{ color: "#ff0000" }} onClick={() => deleteVoucherByID(voucher.voucherId)}></i>
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

export default ManageVoucher