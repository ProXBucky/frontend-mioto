import React, { lazy, Suspense, useEffect, memo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import Home from './component/Home/Home';
import Header from './component/Header';
import { Routes, Route } from "react-router-dom";
import Footer from './component/Footer';
import About from './component/AboutUs/About';
import CarRegist from './component/CarRegist/CarRegist';
import ModalComponent from './component/ModalLoginComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import ModalDatePickerComponent from './component/ModalDatePickerComponent';
import ModalLocationPickComponent from './component/ModalLocationPickComponent';
import AccountInformation from './component/AccountInformation/AccountInformation';
import MyAccount from './component/AccountInformation/DetailInformation/MyAccount';
import FavoriteCar from './component/AccountInformation/DetailInformation/FavoriteCar';
import MyCar from './component/AccountInformation/DetailInformation/MyCar';
import MyTrip from './component/AccountInformation/DetailInformation/MyTrip';
import MyVoucher from './component/AccountInformation/DetailInformation/MyVoucher';
import ChangePassword from './component/AccountInformation/DetailInformation/ChangePassword';
import MyAddress from './component/AccountInformation/DetailInformation/MyAddress';

// import { appLoad, clearRedirect } from '../reducers/common';

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

  if (appLoaded) {
    return (
      <>
        <Header handleOpenRegisterModal={handleOpenRegisterModal} handleOpenLoginModal={handleOpenLoginModal} />
        {/* <Suspense fallback={<p>Loading...</p>}> */}
        <Routes>
          <Route exact path="/" element={<Home handleOpenDateModal={handleOpenDateModal} handleOpenLocationModal={handleOpenLocationModal} />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/owner/register" element={<CarRegist />} />
          <Route path="/account/*" element={<AccountInformation />}>
            <Route path="myaccount" element={<MyAccount />} />
            <Route path="favorite" element={<FavoriteCar />} />
            <Route path="mycar" element={<MyCar />} />
            <Route path="mytrip" element={<MyTrip />} />
            <Route path="myvoucher" element={<MyVoucher />} />
            <Route path="changepassword" element={<ChangePassword />} />
            <Route path="myaddress" element={<MyAddress />} />
          </Route>
          {/* <Route path="/register" element={<AuthScreen isRegisterScreen />} 
          {/* </Suspense> */}
        </Routes>
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
        />
        <ModalDatePickerComponent
          showDateModal={showDateModal}
          handleCloseDateModal={handleCloseDateModal}
        />
        <ModalLocationPickComponent
          showLocationModal={showLocationModal}
          handleCloseLocationModal={handleCloseLocationModal}
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
