import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalUserId: 0,
    modalViewUser: false,
    modalEditUser: false,
    modalAddUser: false,
    modalDeleteUser: false,
    modalChangePasswordUser: false,
    modalObject: null,

    modalCarId: 0,
    modalViewCar: false,
    modalEditCar: false,
    modalAddCar: false,
    modalDeleteCar: false,

    modalAddVoucher: false,
    modalVoucherId: 0,
    modalFeedVoucher: false,

    modalRentId: 0,
    modalViewRent: false,

    modalBlogId: 0,
    modalViewBlog: false,
    modalAddBlog: false
};

export const ModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalUserId(state, action) {
            state.modalUserId = action.payload
        },
        clearModalUserId(state, action) {
            state.modalUserId = 0
        },
        setModalViewUser(state, action) {
            state.modalViewUser = true
        },
        clearModalViewUser(state, action) {
            state.modalViewUser = false
        },
        setModalEditUser(state, action) {
            state.modalEditUser = true
        },
        clearModalEditUser(state, action) {
            state.modalEditUser = false
        },
        setModalAddUser(state, action) {
            state.modalAddUser = true
        },
        clearModalAddUser(state, action) {
            state.modalAddUser = false
        },
        setModalDeleteUser(state, action) {
            state.modalDeleteUser = true
        },
        clearModalDeleteUser(state, action) {
            state.modalDeleteUser = false
        },
        setModalChangePasswordUser(state, action) {
            state.modalChangePasswordUser = true
        },
        clearModalChangePasswordUser(state, action) {
            state.modalChangePasswordUser = false
        },
        setModalObject(state, action) {
            state.modalObject = action.payload
        },
        clearModalObject(state, action) {
            state.modalObject = null
        },

        setModalCarId(state, action) {
            state.modalCarId = action.payload
        },
        clearModalCarId(state, action) {
            state.modalCarId = 0
        },
        setModalViewCar(state, action) {
            state.modalViewCar = true
        },
        clearModalViewCar(state, action) {
            state.modalViewCar = false
        },
        setModalEditCar(state, action) {
            state.modalEditCar = true
        },
        clearModalEditCar(state, action) {
            state.modalEditCar = false
        },
        setModalAddCar(state, action) {
            state.modalAddCar = true
        },
        clearModalAddCar(state, action) {
            state.modalAddCar = false
        },
        setModalDeleteCar(state, action) {
            state.modalDeleteCar = true
        },
        clearModalDeleteCar(state, action) {
            state.modalDeleteCar = false
        },



        setModalAddVoucher(state, action) {
            state.modalAddVoucher = true
        },
        clearModalAddVoucher(state, action) {
            state.modalAddVoucher = false
        },
        setModalVoucherId(state, action) {
            state.modalVoucherId = action.payload
        },
        clearModalVoucherId(state, action) {
            state.modalVoucherId = 0
        },
        setModalFeedVoucher(state, action) {
            state.modalFeedVoucher = true
        },
        clearModalFeedVoucher(state, action) {
            state.modalFeedVoucher = false
        },


        setModalViewRent(state, action) {
            state.modalViewRent = true
        },
        clearModalViewRent(state, action) {
            state.modalViewRent = false
        },
        setModalRentId(state, action) {
            state.modalRentId = action.payload
        },
        clearModalRentId(state, action) {
            state.modalRentId = 0
        },


        setModalBlogId(state, action) {
            state.modalBlogId = action.payload
        },
        clearModalBlogId(state, action) {
            state.modalBlogId = 0
        },
        setModalViewBlog(state, action) {
            state.modalViewBlog = true
        },
        clearModalViewBlog(state, action) {
            state.modalViewBlog = false
        },
        setModalAddBlog(state, action) {
            state.modalAddBlog = true
        },
        clearModalAddBlog(state, action) {
            state.modalAddBlog = false
        },
    },
});

export const { setModalUserId, clearModalUserId, setModalEditUser, clearModalEditUser, setModalDeleteUser, clearModalDeleteUser,
    setModalViewUser, clearModalViewUser, setModalAddUser, clearModalAddUser, setModalChangePasswordUser, clearModalChangePasswordUser,
    setModalObject, clearModalObject,
    setModalCarId, clearModalCarId, setModalEditCar, clearModalEditCar, setModalDeleteCar, clearModalDeleteCar, setModalViewCar, clearModalViewCar,
    setModalAddCar, clearModalAddCar, setModalAddVoucher, clearModalAddVoucher, setModalVoucherId, clearModalVoucherId, setModalFeedVoucher, clearModalFeedVoucher,
    setModalViewRent, clearModalViewRent, setModalRentId, clearModalRentId,
    setModalAddBlog, clearModalAddBlog, setModalViewBlog, clearModalViewBlog, setModalBlogId, clearModalBlogId
} = ModalSlice.actions;

