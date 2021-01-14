import {configureStore} from "@reduxjs/toolkit";
// Reducers.
import authReducer from "./../features/auth/auth.slice";
import userReducer from "./../features/auth/user.slice";
import diaryReducer from "./../features/diary/diary.slice";

export default configureStore({
    reducer: {
        authReducer,
        userReducer,
        diaryReducer
    }
})