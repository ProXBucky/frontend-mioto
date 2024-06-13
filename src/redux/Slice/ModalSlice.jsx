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
    },
});

export const { setModalUserId, clearModalUserId, setModalEditUser, clearModalEditUser, setModalDeleteUser, clearModalDeleteUser,
    setModalViewUser, clearModalViewUser, setModalAddUser, clearModalAddUser, setModalChangePasswordUser, clearModalChangePasswordUser,
    setModalObject, clearModalObject,
    setModalCarId, clearModalCarId, setModalEditCar, clearModalEditCar, setModalDeleteCar, clearModalDeleteCar, setModalViewCar, clearModalViewCar,
    setModalAddCar, clearModalAddCar
} = ModalSlice.actions;

