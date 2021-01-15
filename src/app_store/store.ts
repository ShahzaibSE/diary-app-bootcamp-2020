import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
// Reducers.
import rootReducer from "./rootReducer";

export const store = configureStore({
    reducer: rootReducer
})

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store

