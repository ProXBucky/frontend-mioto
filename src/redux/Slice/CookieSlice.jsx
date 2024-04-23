import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    token: Cookies.get("accessToken") ? Cookies.get("accessToken") : null,
    userId: Cookies.get("userId") ? Cookies.get("userId") : null,
    fullname: Cookies.get("fullname") ? Cookies.get("fullname") : null,
    avatarImage: Cookies.get("avatarImage") ? Cookies.get("avatarImage") : null,
};

export const CookieSlice = createSlice({
    name: 'cookie',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },
        clearToken(state) {
            state.token = null
        },
        setUserId(state, action) {
            state.userId = action.payload
        },
        clearUserId(state) {
            state.userId = null
        },
        setFullname(state, action) {
            state.fullname = action.payload
        },
        clearFullname(state) {
            state.fullname = null
        },
        setAvatarImage(state, action) {
            state.avatarImage = action.payload
        },
        clearAvatarImage(state) {
            state.avatarImage = null
        }
    },
});

export const { setToken, clearToken, setUserInfo, clearUserInfo, setUserId, clearUserId, setFullname, clearFullname, setAvatarImage, clearAvatarImage } = CookieSlice.actions;

