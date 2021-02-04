import React, {FC, useState, useEffect} from 'react';
import {RootState} from "./../../app_store/rootReducer";
import {useSelector} from "react-redux";
// Models.
import {Diary} from "./../../models/diary.interface";
import {Entry} from "./../../models/entry.interface";
// API.
import {http} from "./../../api/index.api";
// Features.
import {setCurrentlyEditing, setCanEdit} from "./../../features/entry/editor.slice";
import {diarySlice, updateDiary} from "./../../features/diary/diary.slice";
import {updateEntry} from "./../../features/entry/entry.slice";
import {showAlert} from "./../../mock_server/utils";
import {useAppDispatch} from "./../../app_store/store";


const Editor:FC = () => {
    const { currentlyEditing: entry, canEdit, activeDiaryId } = useSelector((state: RootState) => state.editor)
    const [editedEntry, updateEditedEntry] = useState(entry)
    const dispatch = useAppDispatch()
    // 
    const saveEntry = () => {
        if (activeDiaryId == null) {
            showAlert("Please select a diary", "warning")
        }else if(entry == null) {
            http.post<Entry, {diary: Diary, entry: Entry}>(`/diaries/entry/${activeDiaryId}`, editedEntry)
                .then((data: any) => {
                    if (data != null) {
                        const {diary, entry: _entry} = data
                        dispatch(setCurrentlyEditing(_entry))
                        dispatch(updateDiary(diary))
                    }
                })
        }else {
            http.put<Entry, {diary: Diary, entry: Entry}>(`/diaries/entry/${entry.id}`,editedEntry)
                .then((_entry: any)=>{
                    if(_entry != null) {
                        dispatch(setCurrentlyEditing(_entry))
                        dispatch(updateEntry(_entry))
                    }
                })
        }
        dispatch(setCanEdit(false))
    }
    //
    useEffect(()=>{
        updateEditedEntry(entry)
    },[entry])

    return (
        <div>
            
        </div>
    )
}

export default Editor
