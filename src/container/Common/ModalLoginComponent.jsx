import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

function ModalComponent({ showModal, handleClose, modalType, onSubmit, handleOpenModalForgetPassword, handleOpenRegisterModal }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullname: '',
        phone: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ username: '', password: '', fullname: '', phone: '', email: '' });
        handleClose();
    };

    const openForget = () => {
        handleClose();
        handleOpenModalForgetPassword();
    }

    const openRegister = () => {
        handleClose();
        handleOpenRegisterModal();
    }

    const [checkPass, setCheckPass] = useState(true)

    return (
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModal} onHide={handleClose}
        >
            <Modal.Header className='border-none justify-end mt-3'>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={() => handleClose()}></i>
            </Modal.Header>
            <Modal.Body className='p-4 pt-2' >
                <Form onSubmit={handleSubmit}>
                    <h1 className='text-center text-2xl font-semibold'>{modalType === 'register' ? 'Đăng ký' : 'Đăng nhập'}</h1>
                    <Form.Group className='' controlId="formBasicUsername">
                        <Form.Label className='font-semibold text-gray-500'>{modalType === 'register' ? 'Tên đăng nhập' : 'Tên đăng nhập/ Email'}</Form.Label>
                        <Form.Control
                            className="p-2 px-3"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className='mt-2 relative' controlId="formBasicPassword">
                        <Form.Label className='font-semibold text-gray-500'>Mật khẩu</Form.Label>
                        <Form.Control
                            className="p-2 px-3 "
                            type={checkPass ? 'password' : 'text'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {
                            checkPass ? <i className="absolute top-[60%] right-2 fa-regular cursor-pointer fa-eye-slash" onClick={() => setCheckPass(false)}></i> : <i className="absolute top-[60%] right-2 fa-regular cursor-pointer fa-eye" onClick={() => setCheckPass(true)}></i>
                        }
                    </Form.Group>
                    {
                        modalType !== 'register' && (
                            <>
                                <p className='text-right pt-2 text-main font-semibold cursor-pointer' onClick={openForget}>Quên mật khẩu?</p>
                            </>
                        )
                    }

                    {modalType === 'register' && (
                        <>
                            <Form.Group className='mt-2' controlId="formBasicFullname">
                                <Form.Label className='font-semibold text-gray-500'>Họ và tên</Form.Label>
                                <Form.Control
                                    className="p-2 px-3"
                                    type="text"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mt-2' controlId="formBasicPhone">
                                <Form.Label className='font-semibold text-gray-500'>Số điện thoại</Form.Label>
                                <Form.Control
                                    className="p-2 px-3"
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mt-2' controlId="formBasicPhone">
                                <Form.Label className='font-semibold text-gray-500'>Email</Form.Label>
                                <Form.Control
                                    className="p-2 px-3"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </>
                    )}

                    <Button variant="primary" type="submit" className="mt-4 w-full py-3 text-lg font-semibold border-none text-white bg-main hover:opacity-80">
                        {modalType === 'register' ? 'Đăng ký' : 'Đăng nhập'}
                    </Button>
                    {
                        modalType !== 'register' && (
                            <>
                                <div className='text-center py-2'>
                                    <span>Bạn chưa là thành viên? </span>
                                    <span className='text-right py-2 text-main font-semibold cursor-pointer' onClick={openRegister}>Đăng ký ngay</span>
                                </div>
                                <div className="w-full flex justify-between pb-4 mt-2">
                                    <a className="btn btn--s btn-secondary bg-white text-black w-[calc(50%-5px)] rounded-lg flex justify-center items-center gap-2 font-semibold text-sm py-2 border-main">
                                        <div className="wrap-svg">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="8" cy="8" r="7" fill="#1877F2"></circle>
                                                <path d="M10.6069 10.1408L10.9178 8.16505H8.97261V6.8835C8.97261 6.34285 9.24383 5.81553 10.1151 5.81553H11V4.1335C11 4.1335 10.1973 4 9.43013 4C7.82742 4 6.78083 4.94647 6.78083 6.65922V8.16505H5V10.1408H6.78083V14.9172C7.13835 14.972 7.50412 15 7.87672 15C8.24932 15 8.61509 14.972 8.97261 14.9172V10.1408H10.6069Z" fill="white"></path>
                                            </svg>
                                        </div>
                                        <span>Facebook</span>
                                    </a>
                                    <a className="btn btn--s btn-secondary bg-white text-black w-[calc(50%-5px)] rounded-lg flex justify-center items-center gap-2 font-semibold text-sm py-2 border-main">
                                        <div className="wrap-svg"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.0007 8.15571C15.0007 7.58016 14.953 7.16016 14.8499 6.72461H8.14357V9.32236H12.08C12.0007 9.96793 11.5721 10.9402 10.6197 11.5935L10.6064 11.6804L12.7268 13.2902L12.8737 13.3046C14.2229 12.0835 15.0007 10.2868 15.0007 8.15571Z" fill="#4285F4"></path>
                                            <path d="M8.14312 15.0004C10.0717 15.0004 11.6907 14.3781 12.8733 13.3048L10.6193 11.5936C10.0161 12.0059 9.20659 12.2936 8.14312 12.2936C6.25425 12.2936 4.6511 11.0726 4.07962 9.38477L3.99585 9.39174L1.79101 11.064L1.76218 11.1425C2.93676 13.4292 5.34946 15.0004 8.14312 15.0004Z" fill="#34A853"></path>
                                            <path d="M4.08003 9.38399C3.92924 8.94844 3.84197 8.48174 3.84197 7.99954C3.84197 7.51729 3.92924 7.05064 4.0721 6.61509L4.06811 6.52233L1.83563 4.82324L1.76259 4.85729C1.27848 5.80619 1.0007 6.87177 1.0007 7.99954C1.0007 9.12732 1.27848 10.1928 1.76259 11.1417L4.08003 9.38399Z" fill="#FBBC05"></path>
                                            <path d="M8.14316 3.70665C9.48441 3.70665 10.3892 4.27442 10.905 4.7489L12.9209 2.82C11.6829 1.69223 10.0717 1 8.14316 1C5.34948 1 2.93677 2.5711 1.76218 4.85775L4.0717 6.61555C4.65111 4.92777 6.25428 3.70665 8.14316 3.70665Z" fill="#EA4335"></path>
                                        </svg>
                                        </div>
                                        <span>Google</span>
                                    </a>
                                </div>

                            </>
                        )
                    }
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalComponent