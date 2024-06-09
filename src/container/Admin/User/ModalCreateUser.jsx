import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import AvatarEditor from 'react-avatar-editor';
import { useDispatch, useSelector } from 'react-redux';
import { clearModalAddUser } from '../../../redux/Slice/ModalSlice';
import { setHideLoading, setShowLoading } from '../../../redux/Slice/AppSlice';
import { editInformationUserById } from '../../../api/userAPI';
import { adminTokenSelector, modalAddUserSelector, } from '../../../redux/selector';
import { createNewUserByAdmin } from '../../../api/adminAPI';
import { toast } from 'react-toastify';

function ModalCreateUser() {
    const modalCreateUser = useSelector(modalAddUserSelector)
    const token = useSelector(adminTokenSelector)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        fullname: '',
        phone: '',
        username: '',
        password: '',
        email: '',
        dob: '',
        gender: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const [editor, setEditor] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setShowLoading())
            if (editor) {
                const canvas = editor.getImageScaledToCanvas();
                const dataURL = canvas.toDataURL();
                formData['avatarImage'] = dataURL;
            }
            let res = await createNewUserByAdmin(formData, token)
            if (res) {
                setFormData({ fullname: '', phone: '', email: '', dob: '', gender: '', username: '', password: '' });
                handleCloseCreate()
            }
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
        finally {
            dispatch(setHideLoading())
        }
    };

    const handleCloseCreate = () => {
        dispatch(clearModalAddUser())
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalCreateUser}
        >
            <Modal.Header className='border-none justify-between mt-3 px-5'>
                <h1 className='text-center text-2xl font-bold'>Tạo người dùng</h1>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseCreate}></i>
            </Modal.Header>
            <Modal.Body className='p-4 px-5' >
                <Form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-5'>
                        <div className='w-full flex justify-between items-start'>
                            <div className='w-[45%]'>
                                <Form.Group className='mt-2 relative' controlId="formBasicFullname">
                                    <Form.Label className='font-semibold text-gray-500'>Tên đăng nhập</Form.Label>
                                    <Form.Control
                                        className="p-2 px-3"
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className='mt-2 relative' controlId="formBasicFullname">
                                    <Form.Label className='font-semibold text-gray-500'>Mật khẩu</Form.Label>
                                    <Form.Control
                                        className="p-2 px-3"
                                        type="text"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className='mt-2 relative' controlId="formBasicFullname">
                                    <Form.Label className='font-semibold text-gray-500'>Họ và tên</Form.Label>
                                    <Form.Control
                                        className="p-2 px-3"
                                        type="text"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className='mt-2 relative' controlId="formBasicPhone">
                                    <Form.Label className='font-semibold text-gray-500'>Điện thoại</Form.Label>
                                    <Form.Control
                                        className="p-2 px-3 "
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className='w-[45%]'>
                                <Form.Group className='mt-2 relative' controlId="formBasicEmail">
                                    <Form.Label className='font-semibold text-gray-500'>Email</Form.Label>
                                    <Form.Control
                                        className="p-2 px-3 "
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Label className='font-semibold text-gray-500 mt-2 relative'>Giới tính</Form.Label>
                                <Form.Select value={formData.gender} name="gender" onChange={handleChange}>
                                    <option value="">Hãy chọn giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </Form.Select>

                                <Form.Group className='mt-2 relative' controlId="formBasicDOB">
                                    <Form.Label className='font-semibold text-gray-500'>Ngày sinh</Form.Label>
                                    <Form.Control
                                        className="p-2 px-3 "
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className='text-center w-full flex flex-col items-center gap-2'>
                            <label htmlFor="avaInput" className="rounded-2xl bg-main p-3 mb-2 text-white font-semibold cursor-pointer">
                                Chọn ảnh
                            </label>
                            <input type="file" id="avaInput" className='hidden' onChange={handleFileChange} />
                            {selectedFile && (
                                <AvatarEditor
                                    ref={setEditor}
                                    image={selectedFile}
                                    width={250}
                                    height={250}
                                    border={50}
                                    color={[0, 0, 0, 0.3]} // Màu nền của khung cắt
                                    scale={1}
                                />
                            )}
                        </div>
                    </div>

                    <Button variant="primary" type="submit" className="mt-4 w-full py-3 text-lg font-semibold border-none text-white bg-main hover:opacity-80">
                        Tạo mới
                    </Button>
                </Form>
            </Modal.Body>

        </Modal>
    );
}

export default ModalCreateUser