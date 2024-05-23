import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appLoad: false
};

export const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppLoad(state, action) {
            state.appLoad = !state.appLoad
        },
    },
});

export const { setAppLoad } = AppSlice.actions;

