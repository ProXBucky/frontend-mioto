import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appLoad: false,
    loading: false,
    componentLoad: false,
    menuLeft: false
};

export const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppLoad(state) {
            state.appLoad = !state.appLoad
        },
        setShowLoading(state) {
            state.loading = true
        },
        setHideLoading(state) {
            state.loading = false
        },
        setConponentLoad(state) {
            state.componentLoad = !state.componentLoad
        },
        setMenuLeft(state) {
            state.menuLeft = !state.menuLeft
        },
    },
});

export const { setAppLoad, setShowLoading, setHideLoading, setConponentLoad, setMenuLeft } = AppSlice.actions;

