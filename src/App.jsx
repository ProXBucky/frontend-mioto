import React, { lazy, Suspense, useEffect, memo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import ModalComponent from './component/ModalLoginComponent';
import ModalDatePickerComponent from './component/ModalDatePickerComponent';
import ModalLocationPickComponent from './component/ModalLocationPickComponent';
import ModalForgetPassword from './component/ModalForgetPassword';
import ModalEditComponent from './component/ModalEditComponent';
import Home from './component/Home/Home';
import Header from './component/Header';
import Footer from './component/Footer';
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
// import AccountInformation from './component/AccountInformation/AccountInformation';
// import MyAccount from './component/AccountInformation/DetailInformation/MyAccount';
// import FavoriteCar from './component/AccountInformation/DetailInformation/FavoriteCar';
// import MyCar from './component/AccountInformation/DetailInformation/MyCar';
// import MyTrip from './component/AccountInformation/DetailInformation/MyTrip';
// import MyVoucher from './component/AccountInformation/DetailInformation/MyVoucher';
// import ChangePassword from './component/AccountInformation/DetailInformation/ChangePassword';
// import MyAddress from './component/AccountInformation/DetailInformation/MyAddress';
// import DetailCar from './features/car/detailCar';
// import CarMenu from './component/CarMenu/CarMenu';
// import About from './component/AboutUs/About';
// import CarRegist from './component/CarRegist/CarRegist';

// import { appLoad, clearRedirect } from '../reducers/common';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalAddAdress from './component/ModalAddAddress';

function App() {
  // const dispatch = useDispatch();
  // const redirectTo = useSelector((state) => state.common.redirectTo);
  // const appLoaded = useSelector((state) => state.common.appLoaded);

  // useEffect(() => {
  //   if (redirectTo) {
  //     dispatch(clearRedirect());
  //   }
  // }, [redirectTo]);

  // useEffect(() => {
  //   const token = window.localStorage.getItem('jwt');
  //   dispatch(appLoad(token));
  // }, []);

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
    setShowModalEdit(false);
  };

  const handleOpenEdit = () => {
    setShowModalEdit(true);
  };

  const handleCloseModalAddress = () => {
    setShowModalAddress(false);
  };

  const handleOpenModalAddress = () => {
    setShowModalAddress(true);
  };

  const handleRegisterSubmit = (formData) => {
    // Gọi API đăng ký với dữ liệu formData
    console.log('Register form data:', formData);
    // Đóng modal sau khi gửi
    handleCloseRegisterModal();
  };

  const handleLoginSubmit = (formData) => {
    // Gọi API đăng nhập với dữ liệu formData
    console.log('Login form data:', formData);
    // Đóng modal sau khi gửi
    handleCloseLoginModal();
  };

  // const handleSubmitModalForgetPassword = (formData) => {
  //   // Gọi API đăng nhập với dữ liệu formData
  //   console.log('Login form data:', formData);
  //   // Đóng modal sau khi gửi
  //   handleCloseModalForgetPassword();
  // };

  // const handleSubmitAddAddress = (formData) => {
  //   console.log('address', formData)
  //   handleCloseModalAddress()
  // }

  if (appLoaded) {
    return (
      <>
        <Header handleOpenRegisterModal={handleOpenRegisterModal} handleOpenLoginModal={handleOpenLoginModal} />
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route exact path="/" element={<Home handleOpenDateModal={handleOpenDateModal} handleOpenLocationModal={handleOpenLocationModal} />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/owner/register" element={<CarRegist />} />
            <Route path="/account/*" element={<AccountInformation />}>
              <Route path="myaccount" element={<MyAccount handleOpenEdit={handleOpenEdit} />} />
              <Route path="favorite" element={<FavoriteCar />} />
              <Route path="mycar" element={<MyCar />} />
              <Route path="mytrip" element={<MyTrip />} />
              <Route path="myvoucher" element={<MyVoucher />} />
              <Route path="changepassword" element={<ChangePassword />} />
              <Route path="myaddress" element={<MyAddress handleOpenModalAddress={handleOpenModalAddress} />} />
            </Route>
            <Route path="/car" element={<DetailCar />} />
            <Route path="/find" element={<CarMenu handleOpenDateModal={handleOpenDateModal} handleOpenLocationModal={handleOpenLocationModal} />} />

            {/* <Route path="/register" element={<AuthScreen isRegisterScreen />}  */}
          </Routes>
        </Suspense>
        <Footer />


        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
        <ToastContainer />
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
        // handleSubmitModalForgetPassword={handleSubmitModalForgetPassword}
        />
        <ModalEditComponent
          showModalEdit={showModalEdit}
          handleCloseEdit={handleCloseEdit}
        />
        <ModalAddAdress
          showModalAddress={showModalAddress}
          handleCloseModalAddress={handleCloseModalAddress}
        // handleSubmitAddAddress={handleSubmitAddAddress}
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
