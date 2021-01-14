import {configureStore} from "@reduxjs/toolkit";
// Reducers.
import rootReducer from "./rootReducer";

export default configureStore({
    reducer: rootReducer
})