import React, { Suspense } from 'react';
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
import { ToastContainer } from 'react-toastify';
import ModalAddAdress from './component/ModalAddAddress';
import { About, CarRegist, AccountInformation, MyAccount, FavoriteCar, MyCar, MyTrip, MyVoucher, ChangePassword, MyAddress, DetailCar, CarMenu } from './App';

export function App() {
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
    const appLoaded = true;
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
                    transition:Bounce />
                <ToastContainer />
                <ModalComponent
                    showModal={showRegisterModal}
                    handleClose={handleCloseRegisterModal}
                    modalType="register"
                    onSubmit={handleRegisterSubmit} />
                <ModalComponent
                    showModal={showLoginModal}
                    handleClose={handleCloseLoginModal}
                    modalType="login"
                    onSubmit={handleLoginSubmit}
                    handleOpenModalForgetPassword={handleOpenModalForgetPassword} />
                <ModalDatePickerComponent
                    showDateModal={showDateModal}
                    handleCloseDateModal={handleCloseDateModal} />
                <ModalLocationPickComponent
                    showLocationModal={showLocationModal}
                    handleCloseLocationModal={handleCloseLocationModal} />
                <ModalForgetPassword
                    showModalForgetPassword={showModalForgetPassword}
                    handleCloseModalForgetPassword={handleCloseModalForgetPassword} />
                <ModalEditComponent
                    showModalEdit={showModalEdit}
                    handleCloseEdit={handleCloseEdit} />
                <ModalAddAdress
                    showModalAddress={showModalAddress}
                    handleCloseModalAddress={handleCloseModalAddress}
                    handleSubmitAddAddress={handleSubmitAddAddress} />

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
