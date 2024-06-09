import { NavLink, Outlet } from "react-router-dom"
import "./adminApp.css"
import HeaderAdmin from "./HeaderAdmin";
import { useSelector } from "react-redux";
import { adminFullnameSelector } from "../../redux/selector";



function AdminApp() {

    const adminFullname = useSelector(adminFullnameSelector)


    return (
        <div className="bg-gray-100 h-dvh flex flex-row">
            <div className="w-1/6 border-r-2 px-3 py-5 flex flex-col items-center  overflow-y-auto">
                <img className="h-8" src="/logo-mini.png" />
                <h2 className="text-2xl font-bold mt-4">Xin chào bạn!</h2>
                <p className="text-lg font-semibold">{adminFullname}</p>
                <div className="py-4 w-full">
                    <NavLink to="/admin/dashboard" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-chart-line"></i>
                            <p className="font-medium text-gray-600 text-sm">Thống kê</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/staff" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-user-tie"></i>
                            <p className="font-medium text-gray-600 text-sm">Nhân viên</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/user" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-user"></i>
                            <p className="font-medium text-gray-600 text-sm">Người dùng</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/car" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-car"></i>
                            <p className="font-medium text-gray-600 text-sm">Phương tiện</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/order" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-regular w-10 fa-calendar"></i>
                            <p className="font-medium text-gray-600 text-sm">Đơn đặt xe</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/history" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-clock-rotate-left"></i>
                            <p className="font-medium text-gray-600 text-sm">Lịch sử</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/blog" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-book"></i>
                            <p className="font-medium text-gray-600 text-sm">Blog</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/voucher" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-ticket"></i>
                            <p className="font-medium text-gray-600 text-sm">Mã giảm giá</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/report" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-flag"></i>
                            <p className="font-medium text-gray-600 text-sm">Đơn báo cáo</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/review" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-comment"></i>
                            <p className="font-medium text-gray-600 text-sm">Bình luận</p>
                        </div>
                    </NavLink>
                    {/* <div className="cursor-pointer" onClick={() => handleLogout()}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-right-from-bracket"></i>
                            <p className="font-medium text-gray-600 text-sm">Đăng xuất</p>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="w-5/6 overflow-y-auto">
                <HeaderAdmin />
                <div className="px-12 mt-10 h-[1000px]">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}


export default AdminApp