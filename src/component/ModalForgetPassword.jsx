import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

function ModalForgetPassword({ showModalForgetPassword, handleCloseModalForgetPassword, handleSubmitModalForgetPassword }) {
    const [formData, setFormData] = useState({
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModalForgetPassword} onHide={handleCloseModalForgetPassword}
        >
            <Modal.Header className='border-none justify-end mt-3'>
                <i class="fa-regular fa-circle-xmark fa-2xl cursor-pointer" onClick={() => handleCloseModalForgetPassword()}></i>
            </Modal.Header>
            <Modal.Body className='p-4 pt-2' >
                <Form onSubmit={handleSubmitModalForgetPassword}>
                    <h1 className='text-center text-2xl font-semibold'>Quên mật khẩu</h1>
                    <Form.Group className='' controlId="formBasicUsername">
                        <Form.Label className='font-semibold text-gray-500'>Email</Form.Label>
                        <Form.Control
                            className="p-2 px-3"
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-4 w-full py-3 text-lg font-semibold border-none text-white bg-main hover:opacity-80">
                        Gửi
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalForgetPassword