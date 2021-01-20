import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Action } from "history";

interface AuthState {
    token: string | null
    isAuthenticated: boolean
}

let initialState: AuthState = {
    token: null,
    isAuthenticated: false
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        saveToken(state:any, action: any)  {
            if(action.payload !== null){
                state.token = action.payload
            }
        },
        clearToken(state:any){
            state.token = null
        },
        setAuthState(state:any, action: any){
            state.isAuthenticated = action.payload
        }
    }
})

export const {saveToken, clearToken, setAuthState} = authSlice.actions

export default authSlice.reducer