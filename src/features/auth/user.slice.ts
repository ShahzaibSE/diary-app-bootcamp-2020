import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { create } from "domain";
// Model.
import {User} from "./../../models/user.interface";

export const userSlice = createSlice({
    name: "user",
    initialState: null as User | null,
    reducers: {
        setUser (state:any, {payload}: PayloadAction<User|null>){
            state = (payload != null) ? payload : null
        }
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer