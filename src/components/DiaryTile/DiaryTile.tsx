import React, {FC, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import {AnimationWrapper} from "react-hover-animation";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
// Model.
import {Diary} from "../../models/diary.interface";
// Features.
import {updateDiary} from "../../features/diary/diary.slice";
import {setCanEdit, setCurrentlyEditing, setActiveDiaryId} from "../../features/entry/editor.slice";
// Store
import {useAppDispatch} from "../../app_store/store";
// API
import {http} from "../../api/index.api";
// Utilities
import * as dayjs from "dayjs";
import {showAlert} from "../../mock_server/utils";
// Styles
import {diaryTilePaperStyles} from "./DiaryTile.style";

interface Props {
    diary: Diary
}


const DiaryTile:FC<Props>  = (props) => {
    const [diary, setDiary] = useState(props.diary)
    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useAppDispatch()
    const totalEntries = props.diary?.entryIds?.length
    // Classes.
    const diarytile_paper_classes = diaryTilePaperStyles()
    //
    const saveCreate = () => {
        http.put<Diary, Diary>(`/diaries/${diary.id}`, diary)
            .then(diary => {
                if (diary) {
                    dispatch(updateDiary(diary))
                    showAlert('Saved!', 'success');
                }
            }).finally(()=>{
                setIsEditing(false)
            })
    }
    //
    return (
        <div>
            <AnimationWrapper config={{
                transform:{initial:'scale(1)',onHover:'scale(1.1)'},
                opacity: {initial:'1',onHover:'1'}
            }}>   
                <Paper className={diarytile_paper_classes.root}>
                    <Typography variant="h3" title="Click to Edit" onClick={()=>{setIsEditing(true)}} style={{cursor:"pointer"}}>
                        {isEditing ? <TextField value={diary.title} onChange={(e)=>{
                            setDiary({...diary, title:diary.title})}} onKeyUp={(e)=>{
                                if(e.key == "Enter") {
                                    saveCreate()
                                } 
                            }} variant="outlined"/> : 
                                    <span>{diary.title}</span> }
                    </Typography>
                </Paper>
            </AnimationWrapper>
            <Divider/>
        </div>
    )
}

export default DiaryTile
