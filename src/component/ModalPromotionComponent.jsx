import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

function ModalPromotionComponent({ showModal, handleClose, imageURL, title, content }) {

    return (
        <Modal
            size="lg"
            className=''
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModal} onHide={handleClose}
        >
            <Modal.Header className='border-none justify-end mt-3'>
                <i class="fa-regular fa-circle-xmark fa-2xl cursor-pointer" onClick={() => handleClose()}></i>
            </Modal.Header>
            <Modal.Body className='p-4 pt-2' >
                <img className='w-full mb-3' src={imageURL} />
                <div className='px-4'>
                    <h1 className='py-2 pb-4 text-xl text-center font-semibold'>{title}</h1>
                    <div className='border-b-[3px] border-main mx-auto w-1/4'>
                    </div>
                    <p className='w-full text-base font-normal whitespace-pre-line break-words'>
                        {content}
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalPromotionComponent