import React, {FC, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
// Model.
import {Diary} from "./../../models/diary.interface";
// Features.
import {updateDiary} from "./../../features/diary/diary.slice";
import {setCanEdit, setCurrentlyEditing, setActiveDiaryId} from "./../../features/entry/editor.slice";
// Store
import {useAppDispatch} from "./../../app_store/store";
// API
import {http} from "./../../api/index.api";
// Utilities
import * as dayjs from "dayjs";
import {showAlert} from "./../../mock_server/utils";

interface Props {
    diary: Diary
}


const DiaryTile:FC<Props>  = (props) => {
    const [diary, setDiary] = useState(props.diary)
    const [editing, setIsEditing] = useState(false)
    const dispatch = useAppDispatch()
    const totalEntries = props.diary?.entryIds?.length
    //
    const saveCreate = http.put<Diary, Diary>(`/diaries/${diary.id}`, diary)
        .then(diary => {
            if (diary) {
                dispatch(updateDiary(diary))
                showAlert('Saved!', 'success');
            }
        }).finally(()=>{
            setIsEditing(false)
        })
    //
    return (
        <div className="diary-tile">
            
        </div>
    )
}

export default DiaryTile
