import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
        saveToken(state:any, {payload}: PayloadAction)  {
            if(payload !== null){
                state.token = payload
            }
        },
        clearToken(state:any){
            state.token = null
        },
        setAuthState(state:any, {payload}: PayloadAction){
            state.isAuthenticated = payload
        }
    }
})

export const {saveToken, clearToken, setAuthState} = authSlice.actions

export default authSlice.reducer