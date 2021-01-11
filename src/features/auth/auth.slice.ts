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
    reducers:{}
})