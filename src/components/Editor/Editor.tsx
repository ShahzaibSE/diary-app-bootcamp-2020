import React, {FC, useState, useEffect} from 'react';
import {RootState} from "./../../app_store/rootReducer";
import {useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import TextArea from "@material-ui/core/TextareaAutosize";
import clsx from "clsx";
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
import {editorTextFieldStyles, editorTextAreaStyles, editorSaveBtn, editorCardStyles} from "./Editor.style";


const Editor:FC = () => {
    const { currentlyEditing: entry, canEdit, activeDiaryId } = useSelector((state: RootState) => state.editor)
    const [editedEntry, updateEditedEntry] = useState(entry)
    const dispatch = useAppDispatch()
    // Style Class instances.
    const editor_card_classes = editorCardStyles()
    const editor_textfield_classes = editorTextFieldStyles()
    const editor_textarea_classes = editorTextAreaStyles()
    const editor_savebtn_classes = editorSaveBtn()
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
        // <div style={{maxWidth:"60%", height:"20%"}}>
           <div className={editor_card_classes.root}>
                <Grid container alignItems="center" justify="center" component={Card}>   
                    <Grid item sm={12} md={11} lg={11}>
                        <TextField fullWidth className={editor_textfield_classes.root} id="title" name="title" variant="outlined" 
                        placeholder="Entry Title" />
                    </Grid>
                    <Grid item sm={12} md={11} lg={11}>
                    <TextField className={editor_textarea_classes.root} multiline fullWidth variant="outlined" rows={27}
                    placeholder="Write here..." />
                    </Grid>
                    <Grid item sm={12} md={11} lg={11}>
                        <Button variant="contained"
                            color="primary"
                            size="large"
                            className={editor_savebtn_classes.button}
                            startIcon={<SaveIcon />}>
                            Save
                        </Button>     
                    </Grid>
                </Grid>    
            </div>
        // </div>
    )
}

export default Editor
