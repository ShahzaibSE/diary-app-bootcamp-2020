import React, {FC, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import {AnimationWrapper} from "react-hover-animation";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Add, List} from "@material-ui/icons";
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
import {diaryTilePaperStyles, diaryTileTotalEntries, diaryTileTitleStyles,
        diaryTileAddEntryBtnStyles, diaryTileViewEntriesBtnStyles} from "./DiaryTile.style";

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
    const diaryTile_total_entries_classes = diaryTileTotalEntries()
    const diaryTile_title_classes = diaryTileTitleStyles()
    const diaryTile_add_entry_btn_classes = diaryTileAddEntryBtnStyles()
    const diaryTile_view_entries_btn_classes = diaryTileViewEntriesBtnStyles()
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
                {/* <Grid container justify="center" alignItems="center">
                    <Grid item sm={12} md={6} lg={6}>  */}
                        <Paper className={diarytile_paper_classes.root} variant="outlined">
                            <Typography className={diaryTile_title_classes.root} 
                                        variant="h5" title="Click to Edit" onClick={()=>{setIsEditing(true)}} 
                                        style={{cursor:"pointer", fontWeight:"bold"}}>
                                {isEditing ? 
                                    <TextField value={diary.title} onChange={(e)=>{
                                            setDiary({...diary, title:diary.title})}} onKeyUp={(e)=>{
                                                if(e.key == "Enter") {
                                                    saveCreate()
                                                } 
                                            }} variant="outlined"/> : 
                                            <span>{diary.title}</span> }
                            </Typography>
                            <Typography className={diaryTile_total_entries_classes.root} 
                                        variant="subtitle2" noWrap={false}>
                                {totalEntries ?? 0} Saved Entries
                            </Typography>
                          
                            {/* <Button className={diaryTile_add_entry_btn_classes.root} 
                                    size="small" variant="contained" endIcon={<Add/>}>Entry</Button>

                            <Button className={diaryTile_view_entries_btn_classes.root}
                                    size="small" endIcon={<List/>}>Entries</Button> */}
                        </Paper>
                    {/* </Grid> */}

                    {/* <Grid item sm={12} md={4} lg={4}> */}
                        
                    {/* </Grid> */}
                    {/* <Grid item sm={12} md={4} lg={4}> */}
    
                    {/* </Grid>
                </Grid> */}
            </AnimationWrapper>
        </div>
    )
}

export default DiaryTile
