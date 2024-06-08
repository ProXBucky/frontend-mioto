import { NavLink, Outlet, useNavigate } from "react-router-dom"
import "./adminApp.css"
import { useDispatch, useSelector } from "react-redux";
import { adminFullnameSelector, adminTokenSelector, tokenSelector } from "../../redux/selector";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { logoutAdmin } from "../../api/authAPI";
import { clearAdminFullname, clearAdminId, clearAdminToken } from "../../redux/Slice/CookieSlice";



function AdminApp() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const adminToken = useSelector(adminTokenSelector)
    const adminFullname = useSelector(adminFullnameSelector)

    const handleLogout = async () => {
        try {
            if (window.confirm("Bạn có muốn đăng xuất không?")) {
                let res = await logoutAdmin(adminToken);
                if (res) {
                    Cookies.remove('adminAccessToken');
                    Cookies.remove('adminId');
                    Cookies.remove('adminFullname');
                    dispatch(clearAdminToken())
                    dispatch(clearAdminId())
                    dispatch(clearAdminFullname())
                    navigate('/login')
                    toast.success("Hẹn gặp bạn lần sau");
                }
            }
        } catch (error) {
            console.log(error)
            toast.error("Lỗi hệ thống, đăng xuất thất bại")
        }
    }

    return (
        <div className="bg-gray-100 h-dvh flex flex-row">
            <div className="w-1/6 border-r-2 px-3 py-5 flex flex-col items-center  overflow-y-auto">
                <img className="h-8" src="/logo-mini.png" />
                <h2 className="text-2xl font-bold mt-4">Xin chào bạn!</h2>
                <p className="text-lg font-semibold">{adminFullname}</p>
                <div className="py-4 border-2 w-full">
                    <NavLink to="/account/myaccount" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-[10px] px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.76 10.86C13.3782 10.86 14.69 9.54819 14.69 7.93C14.69 6.31181 13.3782 5 11.76 5C10.1418 5 8.83 6.31181 8.83 7.93C8.83 9.54819 10.1418 10.86 11.76 10.86Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.84 19.0001V17.3301C5.84 15.3801 7.42 13.8101 9.36 13.8101H14.63C16.58 13.8101 18.15 15.3901 18.15 17.3301V19.0001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="font-medium text-gray-600 text-sm">Tài khoản của tôi</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/myaccount" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-[10px] px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.76 10.86C13.3782 10.86 14.69 9.54819 14.69 7.93C14.69 6.31181 13.3782 5 11.76 5C10.1418 5 8.83 6.31181 8.83 7.93C8.83 9.54819 10.1418 10.86 11.76 10.86Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.84 19.0001V17.3301C5.84 15.3801 7.42 13.8101 9.36 13.8101H14.63C16.58 13.8101 18.15 15.3901 18.15 17.3301V19.0001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="font-medium text-gray-600 text-sm">Tài khoản của tôi</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/myaccount" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-[10px] px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.76 10.86C13.3782 10.86 14.69 9.54819 14.69 7.93C14.69 6.31181 13.3782 5 11.76 5C10.1418 5 8.83 6.31181 8.83 7.93C8.83 9.54819 10.1418 10.86 11.76 10.86Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.84 19.0001V17.3301C5.84 15.3801 7.42 13.8101 9.36 13.8101H14.63C16.58 13.8101 18.15 15.3901 18.15 17.3301V19.0001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="font-medium text-gray-600 text-sm">Tài khoản của tôi</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/myaccount" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-[10px] px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.76 10.86C13.3782 10.86 14.69 9.54819 14.69 7.93C14.69 6.31181 13.3782 5 11.76 5C10.1418 5 8.83 6.31181 8.83 7.93C8.83 9.54819 10.1418 10.86 11.76 10.86Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.84 19.0001V17.3301C5.84 15.3801 7.42 13.8101 9.36 13.8101H14.63C16.58 13.8101 18.15 15.3901 18.15 17.3301V19.0001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="font-medium text-gray-600 text-sm">Tài khoản của tôi</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/myaccount" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-[10px] px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.76 10.86C13.3782 10.86 14.69 9.54819 14.69 7.93C14.69 6.31181 13.3782 5 11.76 5C10.1418 5 8.83 6.31181 8.83 7.93C8.83 9.54819 10.1418 10.86 11.76 10.86Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.84 19.0001V17.3301C5.84 15.3801 7.42 13.8101 9.36 13.8101H14.63C16.58 13.8101 18.15 15.3901 18.15 17.3301V19.0001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="font-medium text-gray-600 text-sm">Tài khoản của tôi</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/myaccount" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-[10px] px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.76 10.86C13.3782 10.86 14.69 9.54819 14.69 7.93C14.69 6.31181 13.3782 5 11.76 5C10.1418 5 8.83 6.31181 8.83 7.93C8.83 9.54819 10.1418 10.86 11.76 10.86Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.84 19.0001V17.3301C5.84 15.3801 7.42 13.8101 9.36 13.8101H14.63C16.58 13.8101 18.15 15.3901 18.15 17.3301V19.0001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="font-medium text-gray-600 text-sm">Tài khoản của tôi</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/myaccount" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-[10px] px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.76 10.86C13.3782 10.86 14.69 9.54819 14.69 7.93C14.69 6.31181 13.3782 5 11.76 5C10.1418 5 8.83 6.31181 8.83 7.93C8.83 9.54819 10.1418 10.86 11.76 10.86Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.84 19.0001V17.3301C5.84 15.3801 7.42 13.8101 9.36 13.8101H14.63C16.58 13.8101 18.15 15.3901 18.15 17.3301V19.0001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="font-medium text-gray-600 text-sm">Tài khoản của tôi</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/myaccount" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-[10px] px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.76 10.86C13.3782 10.86 14.69 9.54819 14.69 7.93C14.69 6.31181 13.3782 5 11.76 5C10.1418 5 8.83 6.31181 8.83 7.93C8.83 9.54819 10.1418 10.86 11.76 10.86Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.84 19.0001V17.3301C5.84 15.3801 7.42 13.8101 9.36 13.8101H14.63C16.58 13.8101 18.15 15.3901 18.15 17.3301V19.0001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="font-medium text-gray-600 text-sm">Tài khoản của tôi</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/myaccount" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-[10px] px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.76 10.86C13.3782 10.86 14.69 9.54819 14.69 7.93C14.69 6.31181 13.3782 5 11.76 5C10.1418 5 8.83 6.31181 8.83 7.93C8.83 9.54819 10.1418 10.86 11.76 10.86Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.84 19.0001V17.3301C5.84 15.3801 7.42 13.8101 9.36 13.8101H14.63C16.58 13.8101 18.15 15.3901 18.15 17.3301V19.0001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="font-medium text-gray-600 text-sm">Tài khoản của tôi</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/myaccount" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-[10px] px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.76 10.86C13.3782 10.86 14.69 9.54819 14.69 7.93C14.69 6.31181 13.3782 5 11.76 5C10.1418 5 8.83 6.31181 8.83 7.93C8.83 9.54819 10.1418 10.86 11.76 10.86Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.84 19.0001V17.3301C5.84 15.3801 7.42 13.8101 9.36 13.8101H14.63C16.58 13.8101 18.15 15.3901 18.15 17.3301V19.0001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="font-medium text-gray-600 text-sm">Tài khoản của tôi</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/myaccount" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-[10px] px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.76 10.86C13.3782 10.86 14.69 9.54819 14.69 7.93C14.69 6.31181 13.3782 5 11.76 5C10.1418 5 8.83 6.31181 8.83 7.93C8.83 9.54819 10.1418 10.86 11.76 10.86Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.84 19.0001V17.3301C5.84 15.3801 7.42 13.8101 9.36 13.8101H14.63C16.58 13.8101 18.15 15.3901 18.15 17.3301V19.0001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="font-medium text-gray-600 text-sm">Tài khoản của tôi</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/myaccount" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-[10px] px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.76 10.86C13.3782 10.86 14.69 9.54819 14.69 7.93C14.69 6.31181 13.3782 5 11.76 5C10.1418 5 8.83 6.31181 8.83 7.93C8.83 9.54819 10.1418 10.86 11.76 10.86Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.84 19.0001V17.3301C5.84 15.3801 7.42 13.8101 9.36 13.8101H14.63C16.58 13.8101 18.15 15.3901 18.15 17.3301V19.0001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="font-medium text-gray-600 text-sm">Tài khoản của tôi</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/myaccount" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-[10px] px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.76 10.86C13.3782 10.86 14.69 9.54819 14.69 7.93C14.69 6.31181 13.3782 5 11.76 5C10.1418 5 8.83 6.31181 8.83 7.93C8.83 9.54819 10.1418 10.86 11.76 10.86Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.84 19.0001V17.3301C5.84 15.3801 7.42 13.8101 9.36 13.8101H14.63C16.58 13.8101 18.15 15.3901 18.15 17.3301V19.0001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="font-medium text-gray-600 text-sm">Tài khoản của tôi</p>
                        </div>
                    </NavLink>
                    <div className="cursor-pointer" onClick={() => handleLogout()}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-[10px] px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.74907H18.12C18.9125 2.71374 19.6868 2.99377 20.2734 3.52788C20.86 4.06199 21.2111 4.8067 21.25 5.59907V18.3991C21.2111 19.1914 20.86 19.9362 20.2734 20.4703C19.6868 21.0044 18.9125 21.2844 18.12 21.2491H12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.9993 12H2.7793" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.75 12L6.75 16" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.75 12L6.75 8" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="font-medium text-gray-600 text-sm">Đăng xuất</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-5/6  overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}


export default AdminApp