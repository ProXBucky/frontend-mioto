import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appLoad: false,
    loading: false,
    componentLoad: false
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
    },
});

export const { setAppLoad, setShowLoading, setHideLoading, setConponentLoad } = AppSlice.actions;

