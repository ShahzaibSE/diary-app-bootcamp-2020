import React, {FC, useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import {useSelector} from "react-redux";
// Model
import {Entry} from "./../../models/entry.interface";
// Features.
import {setEntry} from "./../../features/entry/entry.slice";
import {setCurrentlyEditing, setCanEdit} from "./../../features/entry/editor.slice";
// Store dispatcher and RootState.
import {useAppDispatch} from "./../../app_store/store";
import {RootState} from "./../../app_store/rootReducer";
// API.
import {http} from "./../../api/index.api";
// Daysjs.
import * as dayjs from "dayjs";


const DiaryEntriesList:FC = () => {
    const {entries} = useSelector((state: RootState) => state)
    const dispatch = useAppDispatch()
    const {id} = useParams() // Route Params.
    //
    useEffect(()=>{
        if (id!=null) {
            http.get<null,{entries: Entry[]}>(`/diaries/entries/${id}`)
                .then(({entries: _entries})=>{
                    if (_entries) {
                        const sortByLastUpdated = _entries.sort((a:any, b:any) => {
                          return new dayjs.Dayjs(b.updatedAt).unix() - new dayjs.Dayjs(a.updatedAt).unix()
                        });
                        dispatch(setEntry(sortByLastUpdated))
                    }
                })
        }
    },[id, dispatch])
    //
    return (
        <div className="entries">
            
        </div>
    )
}

export default DiaryEntriesList
