import React, {FC, useState, useEffect} from 'react';
// Model.
import {Diary} from "./../../models/diary.interface";
// Features.
import {updateDiary} from "./../../features/diary/diary.slice";
// Store
import {useAppDispatch} from "./../../app_store/store";
// API
import {http} from "./../../api/index.api";
import * as dayjs from "dayjs";


const DiaryTile:FC  = () => {
    return (
        <div className="diary-tile">
            
        </div>
    )
}

export default DiaryTile
