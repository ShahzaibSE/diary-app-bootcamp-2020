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


const Editor:FC = () => {
    return (
        <div>
            
        </div>
    )
}

export default Editor
