// import { Modal } from "bootstrap"
import Modal from 'react-bootstrap/Modal';

function ModalLocationPickComponent({ showLocationModal, handleCloseLocationModal }) {
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showLocationModal} onHide={handleCloseLocationModal}
        >
            <Modal.Header className='mt-3 flex justify-between'>
                <i class="fa-regular fa-circle-xmark fa-2xl cursor-pointer invisible" onClick={() => handleCloseLocationModal()}></i>
                <h2 className='font-semibold text-2xl text-center'>Địa điểm</h2>
                <i class="fa-regular fa-circle-xmark fa-2xl cursor-pointer" onClick={() => handleCloseLocationModal()}></i>
            </Modal.Header>
            <Modal.Body className='p-4 pt-4 relative' >
                <input className="py-2 pl-12 pr-2 w-full border-2 rounded-lg outline-none" placeholder='Hà Nội' />
                <div className='absolute left-10 top-9'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.9989 14.1714C9.86891 14.1714 8.12891 12.4414 8.12891 10.3014C8.12891 8.16141 9.86891 6.44141 11.9989 6.44141C14.1289 6.44141 15.8689 8.17141 15.8689 10.3114C15.8689 12.4514 14.1289 14.1714 11.9989 14.1714ZM11.9989 7.94141C10.6989 7.94141 9.62891 9.00141 9.62891 10.3114C9.62891 11.6214 10.6889 12.6814 11.9989 12.6814C13.3089 12.6814 14.3689 11.6214 14.3689 10.3114C14.3689 9.00141 13.2989 7.94141 11.9989 7.94141Z" fill="black"></path><path d="M12.0016 22.76C10.5216 22.76 9.03164 22.2 7.87164 21.09C4.92164 18.25 1.66164 13.72 2.89164 8.33C4.00164 3.44 8.27164 1.25 12.0016 1.25C12.0016 1.25 12.0016 1.25 12.0116 1.25C15.7416 1.25 20.0116 3.44 21.1216 8.34C22.3416 13.73 19.0816 18.25 16.1316 21.09C14.9716 22.2 13.4816 22.76 12.0016 22.76ZM12.0016 2.75C9.09164 2.75 5.35164 4.3 4.36164 8.66C3.28164 13.37 6.24164 17.43 8.92164 20C10.6516 21.67 13.3616 21.67 15.0916 20C17.7616 17.43 20.7216 13.37 19.6616 8.66C18.6616 4.3 14.9116 2.75 12.0016 2.75Z" fill="black"></path></svg>
                </div>
                <div className='h-0 border my-4'></div>
                <div className='flex flex-wrap gap-3'>
                    <div className='rounded-3xl border border-gray-400 p-2 px-3 flex flex-row gap-2 justify-center items-center cursor-pointer hover:bg-gray-300'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2748 2.72494C16.6831 2.13327 15.7248 2.14161 15.1498 2.74994L11.9915 6.04161L4.28314 3.49161L2.66647 5.10827L9.09147 9.06661L5.84147 12.4499L3.75814 12.1083L2.2998 13.5666L5.36647 14.6416L6.44147 17.7083L7.89981 16.2499L7.55814 14.1666L10.9415 10.9166L14.8998 17.3416L16.5165 15.7249L13.9665 8.01661L17.2581 4.85828C17.8498 4.27494 17.8581 3.31661 17.2748 2.72494Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        <label className='font-medium text-lg cursor-pointer'>Hà Nội</label>
                    </div>

                    <div className='rounded-3xl border border-gray-400 p-2 px-3 flex flex-row gap-2 justify-center items-center cursor-pointer hover:bg-gray-300'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2748 2.72494C16.6831 2.13327 15.7248 2.14161 15.1498 2.74994L11.9915 6.04161L4.28314 3.49161L2.66647 5.10827L9.09147 9.06661L5.84147 12.4499L3.75814 12.1083L2.2998 13.5666L5.36647 14.6416L6.44147 17.7083L7.89981 16.2499L7.55814 14.1666L10.9415 10.9166L14.8998 17.3416L16.5165 15.7249L13.9665 8.01661L17.2581 4.85828C17.8498 4.27494 17.8581 3.31661 17.2748 2.72494Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        <label className='font-medium text-lg cursor-pointer'>TP.HCM</label>
                    </div>

                    <div className='rounded-3xl border border-gray-400 p-2 px-3 flex flex-row gap-2 justify-center items-center cursor-pointer hover:bg-gray-300'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2748 2.72494C16.6831 2.13327 15.7248 2.14161 15.1498 2.74994L11.9915 6.04161L4.28314 3.49161L2.66647 5.10827L9.09147 9.06661L5.84147 12.4499L3.75814 12.1083L2.2998 13.5666L5.36647 14.6416L6.44147 17.7083L7.89981 16.2499L7.55814 14.1666L10.9415 10.9166L14.8998 17.3416L16.5165 15.7249L13.9665 8.01661L17.2581 4.85828C17.8498 4.27494 17.8581 3.31661 17.2748 2.72494Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        <label className='font-medium text-lg cursor-pointer'>Đà Nẵng</label>
                    </div>

                    <div className='rounded-3xl border border-gray-400 p-2 px-3 flex flex-row gap-2 justify-center items-center cursor-pointer hover:bg-gray-300'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2748 2.72494C16.6831 2.13327 15.7248 2.14161 15.1498 2.74994L11.9915 6.04161L4.28314 3.49161L2.66647 5.10827L9.09147 9.06661L5.84147 12.4499L3.75814 12.1083L2.2998 13.5666L5.36647 14.6416L6.44147 17.7083L7.89981 16.2499L7.55814 14.1666L10.9415 10.9166L14.8998 17.3416L16.5165 15.7249L13.9665 8.01661L17.2581 4.85828C17.8498 4.27494 17.8581 3.31661 17.2748 2.72494Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        <label className='font-medium text-lg cursor-pointer'>Bình Dương</label>
                    </div>

                    <div className='rounded-3xl border border-gray-400 p-2 px-3 flex flex-row gap-2 justify-center items-center cursor-pointer hover:bg-gray-300'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2748 2.72494C16.6831 2.13327 15.7248 2.14161 15.1498 2.74994L11.9915 6.04161L4.28314 3.49161L2.66647 5.10827L9.09147 9.06661L5.84147 12.4499L3.75814 12.1083L2.2998 13.5666L5.36647 14.6416L6.44147 17.7083L7.89981 16.2499L7.55814 14.1666L10.9415 10.9166L14.8998 17.3416L16.5165 15.7249L13.9665 8.01661L17.2581 4.85828C17.8498 4.27494 17.8581 3.31661 17.2748 2.72494Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        <label className='font-medium text-lg cursor-pointer'>Đà Lạt</label>
                    </div>

                    <div className='rounded-3xl border border-gray-400 p-2 px-3 flex flex-row gap-2 justify-center items-center cursor-pointer hover:bg-gray-300'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2748 2.72494C16.6831 2.13327 15.7248 2.14161 15.1498 2.74994L11.9915 6.04161L4.28314 3.49161L2.66647 5.10827L9.09147 9.06661L5.84147 12.4499L3.75814 12.1083L2.2998 13.5666L5.36647 14.6416L6.44147 17.7083L7.89981 16.2499L7.55814 14.1666L10.9415 10.9166L14.8998 17.3416L16.5165 15.7249L13.9665 8.01661L17.2581 4.85828C17.8498 4.27494 17.8581 3.31661 17.2748 2.72494Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        <label className='font-medium text-lg cursor-pointer'>Phú Quốc</label>
                    </div>

                    <div className='rounded-3xl border border-gray-400 p-2 px-3 flex flex-row gap-2 justify-center items-center cursor-pointer hover:bg-gray-300'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2748 2.72494C16.6831 2.13327 15.7248 2.14161 15.1498 2.74994L11.9915 6.04161L4.28314 3.49161L2.66647 5.10827L9.09147 9.06661L5.84147 12.4499L3.75814 12.1083L2.2998 13.5666L5.36647 14.6416L6.44147 17.7083L7.89981 16.2499L7.55814 14.1666L10.9415 10.9166L14.8998 17.3416L16.5165 15.7249L13.9665 8.01661L17.2581 4.85828C17.8498 4.27494 17.8581 3.31661 17.2748 2.72494Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        <label className='font-medium text-lg cursor-pointer'>Nha Trang</label>
                    </div>

                    <div className='rounded-3xl border border-gray-400 p-2 px-3 flex flex-row gap-2 justify-center items-center cursor-pointer hover:bg-gray-300'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2748 2.72494C16.6831 2.13327 15.7248 2.14161 15.1498 2.74994L11.9915 6.04161L4.28314 3.49161L2.66647 5.10827L9.09147 9.06661L5.84147 12.4499L3.75814 12.1083L2.2998 13.5666L5.36647 14.6416L6.44147 17.7083L7.89981 16.2499L7.55814 14.1666L10.9415 10.9166L14.8998 17.3416L16.5165 15.7249L13.9665 8.01661L17.2581 4.85828C17.8498 4.27494 17.8581 3.31661 17.2748 2.72494Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        <label className='font-medium text-lg cursor-pointer'>Hải Phòng</label>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalLocationPickComponent