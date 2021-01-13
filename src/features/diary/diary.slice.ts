import {createSlice, PayloadAction} from "@reduxjs/toolkit";
// Model.
import {Diary} from "./../../models/diary.interface";

export const diarySlice = createSlice({
    name:"diary",
    initialState:[] as Diary[],
    reducers:{
        addDiary(state:any, {payload}:PayloadAction<Diary[]>){
            const diariestosave = payload.filter((diary:any) => {
                return state.findIndex((item: any)=>(item.id == diary.id)) === -1
            })
            state.push(...diariestosave)
        }
    }
})

