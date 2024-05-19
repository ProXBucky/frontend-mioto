import { configureStore } from "@reduxjs/toolkit"
import { CookieSlice } from "./Slice/CookieSlice"
import { SearchSlice } from "./Slice/SearchSlice"

const store = configureStore({
    reducer: {
        cookie: CookieSlice.reducer,
        search: SearchSlice.reducer
    }
})

export default store

