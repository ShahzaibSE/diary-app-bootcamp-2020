import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { create } from "domain";
// Model.
import {User} from "./../../models/user.interface";

export const userSlice = createSlice({
    name: "user",
    initialState: null as User | null,
    reducers: {
        setUser (state:any, {payload}: PayloadAction<User|null>){
            console.log("Set User - Payload")
            console.log(payload)
            state = (payload != null) ? payload : null
        }
    }
})

export const {setUser} = userSlice.actions

export const getUserSelector = (state: any) => state.user 

export default userSlice.reducer