import Modal from 'react-bootstrap/Modal';
import AddressSelector from '../features/AdressSelector';
import { useState } from 'react';
import { postAddress } from '../api/userAPI';
import { toast } from 'react-toastify';


function ModalAddAdress({ showModalAddress, handleCloseModalAddress }) {
    const [valueAddress, setValueAddress] = useState({
        city: '',
        district: '',
        ward: '',
        streetAddress: ''
    })

    const handleChangeAddress = (name, value) => {
        setValueAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmitAddAddress = async () => {
        let res = await postAddress(6, valueAddress)
        if (res) {
            toast.success('Thêm địa chỉ thành công')
            handleCloseModalAddress()
        }
    }

    return (
        <Modal
            size="lg"
            className=''
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModalAddress} onHide={handleCloseModalAddress}
        >
            <Modal.Header className='mt-3 flex justify-between'>
                <i className="fa-regular fa-circle-xmark fa-2xl cursor-pointer invisible" onClick={() => handleCloseModalAddress()}></i>
                <h2 className='font-semibold text-2xl text-center'>Thêm địa chỉ mới</h2>
                <i className="fa-regular fa-circle-xmark fa-2xl cursor-pointer" onClick={() => handleCloseModalAddress()}></i>
            </Modal.Header>
            <Modal.Body className='p-4 pt-2' >
                <AddressSelector valueAddress={valueAddress} setValueAddress={setValueAddress} handleChangeAddress={handleChangeAddress} />
            </Modal.Body>
            <Modal.Footer>
                <button className='p-3 bg-main rounded-lg text-white font-semibold px-4' onClick={() => handleSubmitAddAddress()}>Lưu</button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddAdress