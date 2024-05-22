import React, { lazy, Suspense, memo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import ModalComponent from './component/ModalLoginComponent';
import ModalDatePickerComponent from './component/ModalDatePickerComponent';
import ModalLocationPickComponent from './component/ModalLocationPickComponent';
import ModalForgetPassword from './component/ModalForgetPassword';
import ModalEditComponent from './component/ModalEditComponent';
import ModalAddAdress from './component/ModalAddAddress';
import Home from './component/Home/Home';
import Header from './component/Header';
import Footer from './component/Footer';
import Cookies from 'js-cookie';
import ScrollToTop from './component/ScrollToTop';

const AccountInformation = lazy(() =>
  import('./component/AccountInformation/AccountInformation')
);
const MyAccount = lazy(() =>
  import('./component/AccountInformation/DetailInformation/MyAccount')
);
const FavoriteCar = lazy(() =>
  import('./component/AccountInformation/DetailInformation/FavoriteCar')
);
const MyCar = lazy(() =>
  import('./component/AccountInformation/DetailInformation/MyCar')
);
const MyTrip = lazy(() =>
  import('./component/AccountInformation/DetailInformation/MyTrip')
);
const MyVoucher = lazy(() =>
  import('./component/AccountInformation/DetailInformation/MyVoucher')
);
const ChangePassword = lazy(() =>
  import('./component/AccountInformation/DetailInformation/ChangePassword')
);
const MyAddress = lazy(() =>
  import('./component/AccountInformation/DetailInformation/MyAddress')
);
const DetailCar = lazy(() =>
  import('./features/car/detailCar')
);
const CarMenu = lazy(() =>
  import('./component/CarMenu/CarMenu')
);
const About = lazy(() =>
  import('./component/AboutUs/About')
);
const CarRegist = lazy(() =>
  import('./component/CarRegist/CarRegist')
);
const PageNotFound = lazy(() =>
  import('./component/PageNotFound')
);
const RegisterCar = lazy(() =>
  import('./component/AccountInformation/RegisterCar/RegisterCar')
);
const RegisterSelfDrive = lazy(() =>
  import('./component/AccountInformation/DetailInformation/RegisterSelfDrive')
);
const CarByCity = lazy(() =>
  import('./component/CarByCity/CarByCity')
);

import { createNewUser } from './api/userAPI';
import { loginUser } from './api/authAPI';
import { setAvatarImage, setFullname, setToken, setUserId } from './redux/Slice/CookieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { tokenSelector } from './redux/selector';


function App() {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector)
  const appLoaded = true
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showModalForgetPassword, setShowModalForgetPassword] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalAddress, setShowModalAddress] = useState(false);


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
      let res = await createNewUser(formData);
      if (res) {
        toast.success('Đăng ký thành công');
      }
      handleCloseRegisterModal();
    } catch (error) {
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
  };

  const handleLoginSubmit = async (formData) => {
    try {
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
      }
      handleCloseLoginModal();
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
  };

  if (appLoaded) {
    return (
      <>
        <Header handleOpenRegisterModal={handleOpenRegisterModal} handleOpenLoginModal={handleOpenLoginModal} />
        <ScrollToTop />
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route exact path="/" element={<Home handleOpenDateModal={handleOpenDateModal} handleOpenLocationModal={handleOpenLocationModal} />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/owner/register" element={<CarRegist />} />
            <Route path="/account/*" element={token ? <AccountInformation /> : <PageNotFound />}>
              <Route path="myaccount" element={<MyAccount handleOpenEdit={handleOpenEdit} showModalEdit={showModalEdit} />} />
              <Route path="favorite" element={<FavoriteCar />} />
              <Route path="mycar" element={<MyCar />} />
              <Route path="mycar/:carId" element={<RegisterSelfDrive type="view" />} />
              <Route path="mycar/edit/:carId" element={<RegisterSelfDrive type="edit" />} />
              <Route path="mytrip" element={<MyTrip />} />
              <Route path="myvoucher" element={<MyVoucher />} />
              <Route path="changepassword" element={<ChangePassword />} />
              <Route path="myaddress" element={<MyAddress handleOpenModalAddress={handleOpenModalAddress} />} />
            </Route>
            <Route path="/car-register" element={<RegisterCar />} />
            <Route path="/register-mode/selfdrive" element={<RegisterSelfDrive type="create" />} />
            <Route path="/car/:carId" element={<DetailCar handleOpenDateModal={handleOpenDateModal} handleOpenLoginModal={handleOpenLoginModal} />} />
            <Route path="/find/:city" element={<CarMenu handleOpenDateModal={handleOpenDateModal} handleOpenLocationModal={handleOpenLocationModal} />} />
            <Route path="/city/:city" element={<CarByCity handleOpenDateModal={handleOpenDateModal} handleOpenLocationModal={handleOpenLocationModal} />} />
            <Route path="*" element={< PageNotFound />} />
          </Routes>
        </Suspense>
        <Footer />

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
  return (
    <>
      <Header />
      <p>Loading...</p>
    </>
  );
}

export default memo(App);
