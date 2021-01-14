import {createSlice, PayloadAction} from "@reduxjs/toolkit";
// Model.
import {Entry} from "./../../models/entry.interface";

export const entrySlice = createSlice({
    name:"entry",
    initialState:[] as Entry[],
    reducers:{
        setEntry(state:any, {payload}:PayloadAction<Entry[]|null>){
            return state = payload != null ? payload : []
        },
        updateEntry(state:any, {payload}:PayloadAction<Entry>){
            const {id} = payload
            const index = state.findIndex((entry:any)=>(id === entry.id))
            if (index !== -1){
                state.splice(index, 1, payload)
            }
        }
    }
})

export const {setEntry, updateEntry} = entrySlice.actions
export default entrySlice.reducer