import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

function ModalComponent({ showModal, handleClose, modalType, onSubmit, handleOpenModalForgetPassword }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullname: '',
        phone: '',
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
        setFormData({ username: '', password: '', fullname: '', phone: '' }); // Clear form data after submission
        handleClose();
    };

    const openForget = (e) => {
        handleClose();
        handleOpenModalForgetPassword();
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
                <i class="fa-regular fa-circle-xmark fa-2xl cursor-pointer" onClick={() => handleClose()}></i>
            </Modal.Header>
            <Modal.Body className='p-4 pt-2' >
                <Form onSubmit={handleSubmit}>
                    <h1 className='text-center text-2xl font-semibold'>{modalType === 'register' ? 'Đăng ký' : 'Đăng nhập'}</h1>
                    <Form.Group className='' controlId="formBasicUsername">
                        <Form.Label className='font-semibold text-gray-500'>Tên đăng nhập</Form.Label>
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
                            checkPass ? <i class="absolute top-[60%] right-2 fa-regular cursor-pointer fa-eye-slash" onClick={() => setCheckPass(false)}></i> : <i class="absolute top-[60%] right-2 fa-regular cursor-pointer fa-eye" onClick={() => setCheckPass(true)}></i>
                        }
                    </Form.Group>
                    {
                        modalType !== 'register' && (
                            <>
                                <p className='text-right pt-2 text-main font-semibold cursor-pointer' onClick={() => openForget()}>Quên mật khẩu?</p>
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
                        </>
                    )}

                    <Button variant="primary" type="submit" className="mt-4 w-full py-3 text-lg font-semibold border-none text-white bg-main hover:opacity-80">
                        {modalType === 'register' ? 'Đăng ký' : 'Đăng nhập'}
                    </Button>
                    {/* {
                        modalType !== 'register' && (
                            <div className='text-center py-2'>
                                <span>Bạn chưa là thành viên? </span>
                                <span className='text-right py-2 text-main font-semibold'>Đăng ký ngay</span>
                            </div>
                        )
                    } */}
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalComponent