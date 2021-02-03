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
import {updateDiary} from "./../../features/diary/diary.slice";
import {updateEntry} from "./../../features/entry/entry.slice";
import {showAlert} from "./../../mock_server/utils";
import {useAppDispatch} from "./../../app_store/store";


const Editor:FC = () => {
    const { currentlyEditing: entry, canEdit, activeDiaryId } = useSelector((state: RootState) => state.editor)
    const [editedEntry, updateEditedEntry] = useState(entry)
    const dispatch = useAppDispatch()
    return (
        <div>
            
        </div>
    )
}

export default Editor
