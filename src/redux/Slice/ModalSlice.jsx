import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalUserId: 0,
    modalViewUser: false,
    modalEditUser: false,
    modalAddUser: false,
    modalDeleteUser: false,
    modalChangePasswordUser: false,
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
    },
});

export const { setModalUserId, clearModalUserId, setModalEditUser, clearModalEditUser,setModalDeleteUser, clearModalDeleteUser, 
    setModalViewUser, clearModalViewUser, setModalAddUser, clearModalAddUser, setModalChangePasswordUser, clearModalChangePasswordUser
} = ModalSlice.actions;

