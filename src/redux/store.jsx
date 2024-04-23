import { configureStore } from "@reduxjs/toolkit"
import { CookieSlice } from "./Slice/CookieSlice"

const store = configureStore({
    reducer: {
        cookie: CookieSlice.reducer,
    }
})

export default store

