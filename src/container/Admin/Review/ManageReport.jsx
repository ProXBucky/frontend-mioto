import { useEffect, useState } from "react"
import { getAllReport } from "../../../api/appAPI"
import { useDispatch, useSelector } from "react-redux"
import { adminTokenSelector } from "../../../redux/selector"
import { format } from "date-fns"
import { toast } from "react-toastify"
import { deleteReviewByReviewId } from "../../../api/adminAPI"

function ManageReport() {
    const [reports, setReports] = useState([])
    const adminToken = useSelector(adminTokenSelector)


    const fetchAllReports = async () => {
        let res = await getAllReport(adminToken)
        if (res && res.length > 0) {
            setReports(res)
        } else {
            setReports([])
        }
    }

    const deleteReviewByID = async (reviewId) => {
        try {
            if (window.confirm("Bạn có muốn xóa báo cáo này không?")) {
                let res = await deleteReviewByReviewId(reviewId, adminToken);
                if (res) {
                    fetchAllReports()
                    toast.success("Xóa báo cáo thành công");
                }
            }
        } catch (error) {
            console.log(error)
            toast.error("Lỗi hệ thống, xóa báo cáo thất bại")
        }
    }


    useEffect(() => {
        fetchAllReports()
    }, [])


    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Báo cáo</h2>
            </div>
            <div className="w-full mt-10 pb-16">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm leading-normal">
                            <th className="py-3 px-6 text-center">Người báo cáo</th>
                            <th className="py-3 px-3 text-center">Nội dung</th>
                            <th className="py-3 px-6 text-center">Đối tượng</th>
                            <th className="py-3 px-4 text-center">Ngày</th>
                            <th className="py-3 px-6 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-normal">
                        {
                            reports && reports.length > 0 &&
                            reports.map((report, index) => {
                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={index}>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <div className="flex flex-col items-center gap-2">
                                                <img className="h-10 rounded-full border" src={report.user.avatarImage ? report.user.avatarImage : "/avaMale.png"} />
                                                <span className="font-medium">{report.user.fullname}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-3 text-left">
                                            <span>{report.reason}</span>
                                        </td>
                                        <td className="py-3 w-[200px] text-center flex flex-col justify-center items-center">
                                            <img className="h-10 rounded-full border" src={report.car.user.avatarImage ? report.car.user.avatarImage : "/avaMale.png"} />
                                            <span>{report.car.user.fullname}</span>
                                            <p className="font-semibold">{report.car.model}</p>
                                            <p className="font-semibold">{report.car.plateNumber}</p>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <span className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm">{format(report.reportDate, "dd/MM/yyyy")}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <i className="fa-solid fa-trash fa-lg cursor-pointer fa-lg" style={{ color: "#ff0000" }} onClick={() => deleteReviewByID(report.reportId)}></i>
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

export default ManageReport