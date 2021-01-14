import {createSlice, PayloadAction } from "@reduxjs/toolkit";
// Model.
import {Entry} from "./../../models/entry.interface";

interface EditState {
    canEdit: boolean
    currentlyEditing: Entry | null
    activeDiaryId: string | null
}

const initialState: EditState = {
    canEdit: false,
    currentlyEditing: null,
    activeDiaryId: null
}

const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers:{
        setCanEdit(state:any, {payload}:PayloadAction<boolean>){
            state.canEdit = payload != null ? payload : !state.canEdit
        },
        setCurrentlyEditing(state:any, {payload}:PayloadAction<Entry | null>){
            state.currentlyEditing = payload
        },
        setActiveDiaryId(state, { payload }: PayloadAction<string>) {
            state.activeDiaryId = payload;
        }
    }
})

export const { setActiveDiaryId, setCanEdit, setCurrentlyEditing } = editorSlice.actions
export default editorSlice.reducer