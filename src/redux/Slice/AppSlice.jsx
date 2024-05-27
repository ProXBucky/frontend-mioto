import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appLoad: false,
    loading: false
};

export const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppLoad(state, action) {
            state.appLoad = !state.appLoad
        },
        setShowLoading(state, action) {
            state.loading = true
        },
        setHideLoading(state, action) {
            state.loading = false
        }
    },
});

export const { setAppLoad, setShowLoading, setHideLoading } = AppSlice.actions;

