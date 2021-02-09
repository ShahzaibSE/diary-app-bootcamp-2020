import React, {FC, useState, useEffect} from 'react';
import {RootState} from "./../../app_store/rootReducer";
import {useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import TextArea from "@material-ui/core/TextareaAutosize";
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
// Styles.
import {editorTextFieldStyles, editorTextAreaStyles, editorCardStyles} from "./Editor.style";


const Editor:FC = () => {
    const { currentlyEditing: entry, canEdit, activeDiaryId } = useSelector((state: RootState) => state.editor)
    const [editedEntry, updateEditedEntry] = useState(entry)
    const dispatch = useAppDispatch()
    // Class instances.
    const editor_textfield_classes = editorTextFieldStyles()
    const editor_card_classes = editorCardStyles()
    const editor_textarea_classes = editorTextAreaStyles()
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
        <div style={{maxWidth:"60%"}}>
            <Grid container direction="column" alignItems="center" justify="center" component={Card}>   
                <Grid item sm={12} md={8} lg={8}>
                    <TextField className={editor_textfield_classes.root} id="title" name="title" variant="outlined" />
                </Grid>
                <Grid item sm={12} md={8} lg={8}>
                    <TextArea className={editor_textarea_classes.root} />
                </Grid>
            </Grid>    
        </div>
    )
}

export default Editor
