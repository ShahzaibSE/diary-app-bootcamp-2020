import React, {FC, useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import List from '@material-ui/core/List';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";
import {Note} from "@material-ui/icons";
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

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

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
            <header>
                <Link to="/">Go Back</Link>
            </header>
            <div>
                <List component="nav" aria-label="diary entries list">
                    <Divider/>
                        <ListItem>
                            <ListItemIcon><Note/></ListItemIcon>
                            <ListItemText primary="Entry #1" />
                        </ListItem>
                    <Divider/>
                </List>
            </div>
        </div>
    )
}

export default DiaryEntriesList
