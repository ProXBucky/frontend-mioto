import { configureStore } from "@reduxjs/toolkit"
import { CookieSlice } from "./Slice/CookieSlice"
import { SearchSlice } from "./Slice/SearchSlice"
import { AppSlice } from "./Slice/AppSlice"

const store = configureStore({
    reducer: {
        cookie: CookieSlice.reducer,
        search: SearchSlice.reducer,
        app: AppSlice.reducer
    }
})

export default store

