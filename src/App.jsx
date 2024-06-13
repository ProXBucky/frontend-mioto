import React, { lazy, Suspense, memo, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState } from 'react';
import ModalComponent from './container/Common/ModalLoginComponent';
import ModalDatePickerComponent from './container/Common/ModalDatePickerComponent';
import ModalLocationPickComponent from './container/Common/ModalLocationPickComponent';
import ModalForgetPassword from './container/Common/ModalForgetPassword';
import ModalEditComponent from './container/Common/ModalEditComponent';
import ModalAddAdress from './container/Common/ModalAddAddress';
import Home from './container/Home/Home';
import Header from './container/Common/Header';
import Footer from './container/Common/Footer';
import Cookies from 'js-cookie';
import ScrollToTop from './container/Common/ScrollToTop';
import LoadingComponent from './container/Common/LoadingComponent';

const AccountInformation = lazy(() =>
  import('./container/AccountInformation/AccountInformation')
);
const MyAccount = lazy(() =>
  import('./container/AccountInformation/DetailInformation/MyAccount')
);
const FavoriteCar = lazy(() =>
  import('./container/AccountInformation/DetailInformation/FavoriteCar')
);
const MyCar = lazy(() =>
  import('./container/AccountInformation/DetailInformation/MyCar')
);
const MyTrip = lazy(() =>
  import('./container/AccountInformation/DetailInformation/MyTrip')
);
const MyVoucher = lazy(() =>
  import('./container/AccountInformation/DetailInformation/MyVoucher')
);
const ChangePassword = lazy(() =>
  import('./container/AccountInformation/DetailInformation/ChangePassword')
);
const MyAddress = lazy(() =>
  import('./container/AccountInformation/DetailInformation/MyAddress')
);
const DetailCar = lazy(() =>
  import('./features/car/detailCar')
);
const CarMenu = lazy(() =>
  import('./container/CarMenu/CarMenu')
);
const About = lazy(() =>
  import('./container/AboutUs/About')
);
const CarRegist = lazy(() =>
  import('./container/CarRegist/CarRegist')
);
const PageNotFound = lazy(() =>
  import('./container/Common/PageNotFound')
);
const RegisterCar = lazy(() =>
  import('./container/AccountInformation/RegisterCar/RegisterCar')
);
const RegisterSelfDrive = lazy(() =>
  import('./container/AccountInformation/DetailInformation/RegisterSelfDrive')
);
const CarByCity = lazy(() =>
  import('./container/CarByCity/CarByCity')
);
const DetailRent = lazy(() =>
  import('./features/rent/DetailRent')
);
const LoginAdmin = lazy(() =>
  import('./container/Admin/LoginAdmin')
);

import AdminApp from './container/Admin/AdminApp';


import { createNewUser } from './api/userAPI';
import { loginUser } from './api/authAPI';
import { setAvatarImage, setFullname, setToken, setUserId } from './redux/Slice/CookieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { adminIdSelector, appLoadSelector, loadingSelector, modalAddUserSelector, modalChangePasswordUserSelector, modalEditUserSelector, modalViewCarSelector, modalViewUserSelector, tokenSelector } from './redux/selector';
import { setAppLoad, setHideLoading, setShowLoading } from './redux/Slice/AppSlice';
import ManageUser from './container/Admin/User/ManageUser';
import ManageAdmin from './container/Admin/Admin/ManageAdmin';
import ModalViewUser from './container/Admin/User/ModalViewUser';
import ModalEditUser from './container/Admin/User/ModalEditUser';
import ModalChangePassword from './container/Admin/User/ModalChangePassword';
import ModalCreateUser from './container/Admin/User/ModalCreateUser';
import ManageCar from './container/Admin/Car/ManageCar';
import ModalViewCar from './container/Admin/Car/ModalViewCar';


function App() {
  const dispatch = useDispatch();
  const adminId = useSelector(adminIdSelector)
  const token = useSelector(tokenSelector)
  const appLoad = useSelector(appLoadSelector)
  const loading = useSelector(loadingSelector)
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showModalForgetPassword, setShowModalForgetPassword] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalAddress, setShowModalAddress] = useState(false);

  const modalViewUser = useSelector(modalViewUserSelector)
  const modalEditUser = useSelector(modalEditUserSelector)
  const modalChangePasswordUser = useSelector(modalChangePasswordUserSelector)
  const modalAddUser = useSelector(modalAddUserSelector)

  const modalViewCar = useSelector(modalViewCarSelector)

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleOpenRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleCloseDateModal = () => {
    setShowDateModal(false);
  };

  const handleOpenDateModal = () => {
    setShowDateModal(true);
  };

  const handleCloseLocationModal = () => {
    setShowLocationModal(false);
  };

  const handleOpenLocationModal = () => {
    setShowLocationModal(true);
  };

  const handleCloseModalForgetPassword = () => {
    setShowModalForgetPassword(false);
  };

  const handleOpenModalForgetPassword = () => {
    setShowModalForgetPassword(true);
  };

  const handleCloseEdit = () => {
    if (token) {
      setShowModalEdit(false);
    }
  };

  const handleOpenEdit = () => {
    if (token) {
      setShowModalEdit(true);
    }
  };

  const handleCloseModalAddress = () => {
    setShowModalAddress(false);
  };

  const handleOpenModalAddress = () => {
    setShowModalAddress(true);
  };


  const handleRegisterSubmit = async (formData) => {
    try {
      dispatch(setShowLoading())
      let res = await createNewUser(formData);
      if (res) {
        toast.success('Đăng ký thành công');
        handleCloseRegisterModal();
      }
    }
    catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Tên người dùng/email đã tồn tại. Vui lòng chọn tên người dùng/email khác.');
      }
      else if (error.response && error.response.status === 400) {
        toast.error('Đăng ký lỗi')
      }
      else {
        toast.error('Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau.');
      }
      console.error('Error registering user:', error);
    }
    finally {
      dispatch(setHideLoading())
    }
  };

  const handleLoginSubmit = async (formData) => {
    try {
      dispatch(setShowLoading())
      let res = await loginUser(formData);
      if (res) {
        Cookies.set('accessToken', res.token, { expires: 1 / 24 });
        Cookies.set('userId', res.userId, { expires: 1 / 24 });
        Cookies.set('fullname', res.fullname, { expires: 1 / 24 });
        Cookies.set('avatarImage', res.avatarImage, { expires: 1 / 24 });
        dispatch(setToken(res.token))
        dispatch(setUserId(res.userId))
        dispatch(setFullname(res.fullname))
        dispatch(setAvatarImage(res.avatarImage))
        toast.success('Đăng nhập thành công');
        dispatch(setAppLoad())
        handleCloseLoginModal();
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Sai mật khẩu');
      }
      else if (error.response && error.response.status === 404) {
        toast.error('Tài khoản không tồn tại')
      }
      else {
        toast.error('Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau.');
      }
      console.error('Lỗi:', error);
    }
    finally {
      dispatch(setHideLoading())
    }
  };

  const prevAppLoadRef = useRef(appLoad);
  const location = useLocation();
  const noHeaderFooterRoutes = ['/login', '/admin'];
  const isNoHeaderFooterRoute = noHeaderFooterRoutes.some(route => location.pathname.startsWith(route));

  useEffect(() => {
    if (prevAppLoadRef.current !== appLoad) {
      window.location.reload();
      prevAppLoadRef.current = appLoad;
    }
  }, [appLoad]);

  return (
    <>
      {!isNoHeaderFooterRoute && <Header handleOpenRegisterModal={handleOpenRegisterModal} handleOpenLoginModal={handleOpenLoginModal} />}
      <ScrollToTop />
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route exact path="/" element={<Home handleOpenDateModal={handleOpenDateModal} handleOpenLocationModal={handleOpenLocationModal} />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/owner/register" element={<CarRegist handleOpenLoginModal={handleOpenLoginModal} />} />
          <Route path="/account/*" element={token ? <AccountInformation /> : <PageNotFound />}>
            <Route path="myaccount" element={<MyAccount handleOpenEdit={handleOpenEdit} showModalEdit={showModalEdit} />} />
            <Route path="favorite" element={<FavoriteCar />} />
            <Route path="mycar" element={<MyCar />} />
            <Route path="mycar/:carId" element={<RegisterSelfDrive type="view" />} />
            <Route path="mycar/edit/:carId" element={<RegisterSelfDrive type="edit" />} />
            <Route path="mytrip" element={<MyTrip />} />
            <Route path="mytrip/detail-trip/:rentId" element={<DetailRent />} />
            <Route path="myvoucher" element={<MyVoucher />} />
            <Route path="changepassword" element={<ChangePassword />} />
            <Route path="myaddress" element={<MyAddress handleOpenModalAddress={handleOpenModalAddress} />} />
          </Route>
          <Route path="/car-register" element={<RegisterCar />} />
          <Route path="/register-mode/selfdrive" element={<RegisterSelfDrive type="create" />} />
          <Route path="/car/:carId" element={<DetailCar handleOpenDateModal={handleOpenDateModal} handleOpenLoginModal={handleOpenLoginModal} />} />
          <Route path="/find" element={<CarMenu handleOpenDateModal={handleOpenDateModal} handleOpenLocationModal={handleOpenLocationModal} />} />
          <Route path="/city/:city" element={<CarByCity handleOpenDateModal={handleOpenDateModal} handleOpenLocationModal={handleOpenLocationModal} />} />
          <Route path="/login" element={<LoginAdmin />} />
          <Route path="/admin/*" element={adminId ? <AdminApp /> : <Navigate to="/login" />} >
            <Route path="user" element={<ManageUser />} />
            <Route path="staff" element={<ManageAdmin />} />
            <Route path="car" element={<ManageCar />} />
          </Route>

          <Route path="*" element={< PageNotFound />} />
        </Routes>
      </Suspense>
      {!isNoHeaderFooterRoute && <Footer />}
      {loading && <LoadingComponent />}

      {modalViewUser && <ModalViewUser />}
      {modalEditUser && <ModalEditUser />}
      {modalChangePasswordUser && <ModalChangePassword />}
      {modalAddUser && <ModalCreateUser />}

      {modalViewCar && <ModalViewCar />}
      {/* {modalEditUser && <ModalEditUser />}
      {modalAddUser && <ModalCreateUser />} */}


      <ModalComponent
        showModal={showRegisterModal}
        handleClose={handleCloseRegisterModal}
        modalType="register"
        onSubmit={handleRegisterSubmit}
      />
      <ModalComponent
        showModal={showLoginModal}
        handleClose={handleCloseLoginModal}
        modalType="login"
        onSubmit={handleLoginSubmit}
        handleOpenModalForgetPassword={handleOpenModalForgetPassword}
        handleOpenRegisterModal={handleOpenRegisterModal}
      />
      <ModalDatePickerComponent
        showDateModal={showDateModal}
        handleCloseDateModal={handleCloseDateModal}
      />
      <ModalLocationPickComponent
        showLocationModal={showLocationModal}
        handleCloseLocationModal={handleCloseLocationModal}
      />
      <ModalForgetPassword
        showModalForgetPassword={showModalForgetPassword}
        handleCloseModalForgetPassword={handleCloseModalForgetPassword}
      />
      <ModalEditComponent
        showModalEdit={showModalEdit}
        handleCloseEdit={handleCloseEdit}
      />
      <ModalAddAdress
        showModalAddress={showModalAddress}
        handleCloseModalAddress={handleCloseModalAddress}
      />
      <ToastContainer
        position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false}
        closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition:Bounce
      />

    </>
  );
}

export default memo(App);
