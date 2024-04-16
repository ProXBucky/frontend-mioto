import Modal from 'react-bootstrap/Modal';
import DatePicker from './DatePicker';

function ModalDatePickerComponent({ showDateModal, handleCloseDateModal }) {

    return (
        <Modal
            size="lg"
            className=''
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showDateModal} onHide={handleCloseDateModal}
        >
            <Modal.Header className='mt-3 flex justify-between'>
                <i class="fa-regular fa-circle-xmark fa-2xl cursor-pointer invisible" onClick={() => handleCloseDateModal()}></i>
                <h2 className='font-semibold text-2xl text-center'>Thời gian</h2>
                <i class="fa-regular fa-circle-xmark fa-2xl cursor-pointer" onClick={() => handleCloseDateModal()}></i>
            </Modal.Header>
            <Modal.Body className='p-4 pt-2' >
                <div className='border-2 rounded-md p-4 flex justify-center'>
                    <DatePicker />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className='p-3 bg-main rounded-lg text-white font-semibold px-4'>Tiếp tục</button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDatePickerComponent