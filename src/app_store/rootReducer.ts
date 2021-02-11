import {combineReducers} from "@reduxjs/toolkit";
// Reducers.
import authReducer from "./../features/auth/auth.slice";
import userReducer from "./../features/auth/user.slice";
import diaryReducer from "./../features/diary/diary.slice";
import entryReducer from "./../features/entry/entry.slice";
import editorReducer from "./../features/entry/editor.slice";

export const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    diaries: diaryReducer,
    entries: entryReducer,
    editor: editorReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
 